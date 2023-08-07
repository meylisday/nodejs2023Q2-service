import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TrackModule } from '../track/track.module';
import { AppService } from '../app.service';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';

@Module({
  imports: [TrackModule, AlbumModule, ArtistModule],
  providers: [FavoritesService, AppService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
