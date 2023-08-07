import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import * as fs from 'node:fs';
import * as yaml from 'js-yaml';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const PORT = configService.get<string>('PORT');
  const swaggerDocument = yaml.load(fs.readFileSync('./doc/api.yaml', 'utf8'));
  SwaggerModule.setup('doc', app, swaggerDocument as OpenAPIObject);
  await app.listen(PORT || 4000);
}
bootstrap();
