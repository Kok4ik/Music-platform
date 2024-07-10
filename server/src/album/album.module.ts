import { Module } from "@nestjs/common";
import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Album, AlbumSchema } from "./album.schema";
import { FileService } from "src/file/file.service";
import { Track, TrackSchema } from "src/track/schemas/track.schema";


@Module({
    imports: [
        MongooseModule.forFeature([{name: Track.name, schema: TrackSchema}]),
        MongooseModule.forFeature([{name: Album.name, schema: AlbumSchema}])
    ],
    controllers: [AlbumController],
    providers: [AlbumService, FileService]
})
export class AlbumModule {

}