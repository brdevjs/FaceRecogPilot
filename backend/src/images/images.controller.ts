import { Controller, Post, UseInterceptors, UploadedFile, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Image } from './image.model';
import { ImageService } from './images.service';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<Image> {
    return this.imageService.uploadImage(file);
  }

  @Get()
  async getAllImages(): Promise<Image[]> {
    return this.imageService.getAllImages();
  }
}