import { Module } from "@nestjs/common";
import { TrackModule } from "./track/track.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AlbumModule } from "./album/album.module";
import { FileModule } from "./file/file.module";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        MongooseModule.forRoot('mongodb+srv://romeowbelov:adgjl975.23@cluster0.rd1ralv.mongodb.net/'),
        TrackModule,
        AlbumModule,
        FileModule
    ]
})
export class AppModule {

}