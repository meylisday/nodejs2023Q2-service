import { Module, forwardRef } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { Artist } from './artist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistRepository } from './artist.repository';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from 'src/track/track.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Artist, ArtistRepository]),
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
  ],
  providers: [ArtistService, ArtistRepository],
  controllers: [ArtistController],
  exports: [ArtistService, ArtistRepository],
})
export class ArtistModule {}
