/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors, Res, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Image } from './image.model';
import { ImageService } from './images.service';
import { Response } from 'express';
import * as path from 'path';

interface FileParams {
  fileName: string;
}

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads', // Thư mục lưu trữ file
        filename: (req, file, cb) => {
          // const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
          // return cb(null, `${randomName}${extname(file.originalname)}`);
          cb(null, `${file.originalname}`);
        },
      }),
    })
  )
  // async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<Image> {
  //
  // }
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.imageService.uploadImage(file);
  }

  @Get()
  async getAllImages(@Query() query): Promise<Image[]> {
    console.log('getAllImages');
    // xu ly nhan params truyen tu request len
    return this.imageService.getAllImages({ query });
  }

  // @Get('/:id')
  // async getImageById(@Param('id') id: string) {
  //   // xu ly nhan params truyen tu request len
  //   const image = await this.imageService.getImage({ id });
  //   console.log(image.url);
  //   return image.url;
  // }
  @Get('/getImage')
  async getFile(@Res() res: Response, @Body() file: FileParams) {
    console.log('getFile');
    console.log(file);
    res.sendFile(path.join(__dirname, '../uploads/' + file.fileName));
  }

  @Get('/getImageByName')
  async getImageByName(@Query() query) {
    console.log('getImageByName');
    console.log({ query });
  }

  @Get('/xxxx')
  async returnImage(@Query() query) {
    let responseData = {};
    console.log('xxxx returnImage');
    console.log({ query });
    const imageId = query.id;
    console.log({ imageId });
    //12345
    const imagedata = await this.imageService.getImage({ id: imageId });
    console.log({ imagedata });
    const { name } = imagedata;
    // name = tom.jpeg
    // open readfile to get file binary (fs)
    // return file object to client

    return responseData;
  }
}
