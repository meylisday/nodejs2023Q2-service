import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AppService } from '../app.service';

@Module({
  providers: [AlbumService, AppService],
  controllers: [AlbumController],
  exports: [AlbumService],
})
export class AlbumModule {}
