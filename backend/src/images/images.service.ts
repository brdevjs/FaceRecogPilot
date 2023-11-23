import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image } from './image.model';

@Injectable()
export class ImageService {
  constructor(@InjectModel('Image') private readonly imageModel: Model<Image>) { }

  async uploadImage(file: Express.Multer.File): Promise<Image> {
    const imageData = {
      name: file.originalname,
      type: file.mimetype,
      size: file.size,
    };

    const newImage = new this.imageModel(imageData);
    return await newImage.save();
  }

  async getAllImages(): Promise<Image[]> {
    return await this.imageModel.find().exec();
  }
}