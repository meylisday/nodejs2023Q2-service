import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import * as fs from 'node:fs';
import * as yaml from 'js-yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const swaggerDocument = yaml.load(fs.readFileSync('./doc/api.yaml', 'utf8'));
  SwaggerModule.setup('doc', app, swaggerDocument as OpenAPIObject);
  await app.listen(4000);
}
bootstrap();
