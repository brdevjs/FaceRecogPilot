import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Image, ImageDocument } from './image.model';
import { Model } from 'mongoose';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image.name) private imageModel: Model<ImageDocument>,
  ) { }
  create(image: Image): Promise<Image> {
    return this.imageModel.create(image);
  }

  findAll() {
    return this.imageModel.find();
  }

  findOne(id: string) {
    return this.imageModel.findById(id);
  }

  update(id: number, image: Image) {
    return this.imageModel.findByIdAndUpdate(id, image);
  }

  remove(id: number) {
    return this.imageModel.findByIdAndDelete(id);
  }

  upload(image: Image): Promise<Image> {
    return this.imageModel.create(image);
  }
}
