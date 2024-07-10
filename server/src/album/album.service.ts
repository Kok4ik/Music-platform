import { Get, Injectable, Post } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Album } from "./album.schema";
import { Model, ObjectId } from "mongoose";
import { CreateAlbumDto } from "./create-album.dto";
import { FileService, FileType } from "src/file/file.service";
import { Track } from "src/track/schemas/track.schema";


@Injectable()
export class AlbumService {

    constructor(@InjectModel(Album.name) private albumModel: Model<Album>,
                @InjectModel(Track.name) private trackModel: Model<Track>, 
                private fileService: FileService) {}
    async create(dto: CreateAlbumDto, picture): Promise<Album> {
        const parsedTracks = JSON.parse(dto.tracks)
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        const album = await this.albumModel.create({...dto, listens: 0, picture: picturePath, tracks: parsedTracks})
        return album
    }
    async getAll(limit: number, page: number) {
        const albums = await this.albumModel.aggregate([
            {
                $facet: {
                    totalCount: [{$count: 'count'}],
                    data: [{$skip: page}, {$limit: limit}]
                }
            }, 
            {
                $unwind: '$totalCount'
            }
        ])
        return {
            totalCount: albums[0].totalCount.count,
            data: albums[0].data
        }
    }

    async getOne(id: ObjectId) {
        const album = await this.albumModel.findById(id).populate('tracks')
        return album
    }

    async delete(id: ObjectId) {
        const album = await this.albumModel.findByIdAndDelete(id)
        return album._id
    }

    async listen(id: ObjectId) {
        const album = await this.albumModel.findById(id)
        album.listens += 1
        album.save()
    }

    async search(query: string): Promise<Album[]> {
        const albums = await this.albumModel.find({
            name: {$regex: new RegExp(query, 'i')}
        })
        return albums
    }
    
    async addTrack(albumId: ObjectId, trackId: ObjectId) {
        const album = await this.albumModel.findById(albumId)
        const track = await this.trackModel.findById(trackId)
        if (album.tracks.includes(track.id)) return
        album.tracks.push(track)
        await album.save()
        return track
    }

    async deleteTrack(albumId: ObjectId, trackId: ObjectId) {
        const album = await this.albumModel.findById(albumId)
        const track = await this.trackModel.findById(trackId)
        album.tracks.splice(album.tracks.indexOf(track.id), 1)
        await album.save()
        return track
    }
}