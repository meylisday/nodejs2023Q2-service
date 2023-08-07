import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AppService } from '../app.service';
import { TrackModule } from 'src/track/track.module';
import { AlbumRepository } from './album.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { Artist } from '../artist/artist.entity';
import { ArtistRepository } from 'src/artist/artist.repository';

@Module({
  imports: [TrackModule, TypeOrmModule.forFeature([Album, Artist])],
  providers: [AlbumService, AlbumRepository, ArtistRepository, AppService],
  controllers: [AlbumController],
  exports: [AlbumService],
})
export class AlbumModule {}
