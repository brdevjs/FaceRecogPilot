/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    {
      abortOnError: false,
      bodyParser: true
    },
  );

  // https://docs.nestjs.com/faq/global-prefix
  app.setGlobalPrefix('api');

  app.enableCors();

  // https://docs.nestjs.com/openapi/introduction
  const config = new DocumentBuilder()
    .setTitle('Pilot App')
    .setDescription('The Pilot Api description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useStaticAssets(path.join(__dirname, "../uploads"));

  await app.listen(3000);
}
bootstrap();