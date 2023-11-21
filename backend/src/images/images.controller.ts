import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { Image } from './image.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFiles } from '@nestjs/common';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFiles() file: Express.Multer.File) {
    console.log(file);
    // return this.imagesService.create(file);
  }

  @Post()
  create(@Body() createImageDto: Image) {
    return this.imagesService.create(createImageDto);
  }

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: Image) {
    return this.imagesService.update(+id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(+id);
  }
}
