import { Module, forwardRef } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumRepository } from './album.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { TrackModule } from '../track/track.module';
import { ArtistModule } from '../artist/artist.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Album]),
    forwardRef(() => TrackModule),
    forwardRef(() => ArtistModule),
  ],
  providers: [AlbumService, AlbumRepository],
  controllers: [AlbumController],
  exports: [AlbumService, AlbumRepository],
})
export class AlbumModule {}
