import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ConfigService } from "@nestjs/config"
const cors = require('cors')
const start = async () => {
    try {
        const app = await NestFactory.create(AppModule) 
        const configService = app.get(ConfigService)
        const PORT = configService.get<number>('PORT')
        app.use(cors({
            origin: 'http://localhost:3000' 
          }));
        await app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()