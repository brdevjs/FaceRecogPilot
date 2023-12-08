/* eslint-disable prettier/prettier */
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
      createdDate: Date.now(),
      url: `http://localhost:3000/${file.originalname}`,
    };

    const newImage = new this.imageModel(imageData);
    return await newImage.save();
  }

  async getAllImages({ query }): Promise<Image[]> {

    try {
      const name = query.name;

      let images;

      if (!name) {
        images = await this.imageModel.find().exec();
      } else {
        images = await this.imageModel.find({ name: { $regex: '.*' + name + '.*' } }).limit(5).exec();
      }
      return images;
    } catch (error) {
      throw new Error(`Error searching images: ${error.message}`);
    }
  }

  async getImage({ id }): Promise<Image> {
    try {
      const image = await this.imageModel.findById(id);
      return image;
    } catch (error) {
      throw new Error(`Error fetching image: ${error.message}`)
    }
  }
}