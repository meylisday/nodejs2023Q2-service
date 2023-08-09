import { Module, forwardRef } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './track.entity';
import { TrackRepository } from './track.repository';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from 'src/artist/artist.module';

@Module({
  imports: [
    forwardRef(() => AlbumModule),
    forwardRef(() => ArtistModule),
    TypeOrmModule.forFeature([Track]),
  ],
  providers: [TrackService, TrackRepository],
  controllers: [TrackController],
  exports: [TrackService, TrackRepository],
})
export class TrackModule {}
