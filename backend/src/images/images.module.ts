import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema } from './image.model';
import { ImageController } from './images.controller';
import { ImageService } from './images.service';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }]),
    MulterModule.register({
      limits: {
        fileSize: 1024 * 1024 * 10,
      },
    }),
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule { }