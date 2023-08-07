import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { AppService } from 'src/app.service';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';
import { Artist } from './artist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistRepository } from './artist.repository';

@Module({
  imports: [AlbumModule, TrackModule, TypeOrmModule.forFeature([Artist])],
  providers: [ArtistService, ArtistRepository, AppService],
  controllers: [ArtistController],
  exports: [ArtistService],
})
export class ArtistModule {}
