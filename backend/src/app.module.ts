/* eslint-disable prettier/prettier */
// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { ImagesModule } from './images/images.module';

// @Module({
//   imports: [MongooseModule.forRoot('mongodb://localhost:27017'), ImagesModule],
//   controllers: [],
//   providers: [],
// })
// export class AppModule { }

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageModule } from './images/images.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/your-database-name', {}),
    ImageModule,
  ],
})
export class AppModule { }
