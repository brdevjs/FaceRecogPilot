import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Query,
  Param
} from '@nestjs/common';
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
  async getAllImages(
    @Query() query,
  ): Promise<Image[]> {
    // xu ly nhan params truyen tu request len
    return this.imageService.getAllImages({ query });
  }
}
