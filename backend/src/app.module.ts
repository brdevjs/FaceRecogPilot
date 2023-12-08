/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageModule } from './images/images.module';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'public'),   // <-- path to the static files
    // }),
    // MongooseModule.forRoot('mongodb://localhost:27017/your-database-name', {}),
    MongooseModule.forRoot(
      'mongodb+srv://admin:eQWiB7U3dIfc0qTJ@cluster0.ykrzgin.mongodb.net/?retryWrites=true&w=majority',
      {}
    ),

    ImageModule,
  ],
})
export class AppModule {}
