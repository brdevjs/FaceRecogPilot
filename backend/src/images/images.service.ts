import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image } from './image.model';

type GetAllImage = {
  name: string;
}

@Injectable()
export class ImageService {
  constructor(@InjectModel('Image') private readonly imageModel: Model<Image>) { }

  async uploadImage(file: Express.Multer.File): Promise<Image> {
    const imageData = {
      name: file.originalname,
      type: file.mimetype,
      size: file.size,
      createdDate: Date.now(),
    };

    const newImage = new this.imageModel(imageData);
    return await newImage.save();
  }

  async getAllImages({ query }): Promise<Image[]> {
    try {
      // TODO: Thay tham số phủ hợp cho mongoose
      // https://mongoosejs.com/docs/api/model.html#Model.find()
      // Ví dụ chạy được: const images = await this.imageModel.find({ name: /bill/i }).exec();

      // Neu khong co name (name = null || name = undefine) => find all images
      // Neu name co gia tri => tim image theo name
      const name = query.name;
      let images;
      if (!name) {
        images = await this.imageModel.find().exec();
      } else {
        images = await this.imageModel.find({ name: { $regex: '.*' + name + '.*' } }).limit(5).exec();
      }
      // Check if any images were found
      // if (images.length === 0) {
      //   // No images found
      //   console.log('No documents found.');
      // } else {
      //   // Images found
      //   // console.log('Found documents:', images);
      // }

      return images;
    } catch (error) {
      throw new Error(`Error searching images: ${error.message}`);
    }
  }

}