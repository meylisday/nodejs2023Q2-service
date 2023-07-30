import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { AppService } from 'src/app.service';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';

@Module({
  imports: [AlbumModule, TrackModule],
  providers: [ArtistService, AppService],
  controllers: [ArtistController],
  exports: [ArtistService],
})
export class ArtistModule {}
