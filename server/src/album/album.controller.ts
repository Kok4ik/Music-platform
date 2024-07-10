import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { CreateAlbumDto } from "./create-album.dto";
import { AlbumService } from "./album.service";
import { ObjectId } from "mongoose";
import { FileFieldsInterceptor } from "@nestjs/platform-express";


@Controller('/albums')

export class AlbumController {
    constructor(private AlbumService: AlbumService) {}
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
    ]))
    create(@UploadedFiles() files, @Body() dto: CreateAlbumDto) {
        const {picture} = files
        return this.AlbumService.create(dto, picture[0])
    }
    @Get('/search')
    search(@Query('query') query: string) {
        return this.AlbumService.search(query)
    }

    @Get()
    getAll(@Query('count') limit: string,
            @Query('offset') offset: string) {
        return this.AlbumService.getAll(Number(limit), Number(offset))
    }
    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.AlbumService.getOne(id)
    }
    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.AlbumService.delete(id)
    }
    @Get('/listen/:id')
    listen(@Param('id') id: ObjectId) {
        return this.AlbumService.listen(id)
    }
    @Get(':id/:trackId')
    addTrack(@Param() params) {
        return this.AlbumService.addTrack(params.id, params.trackId)
    }
    @Delete(':id/:trackId')
    deleteTrack(@Param() params) {
        return this.AlbumService.deleteTrack(params.id, params.trackId)
    }
}