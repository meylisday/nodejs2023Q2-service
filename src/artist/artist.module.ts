import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { AppService } from 'src/app.service';

@Module({
  providers: [ArtistService, AppService],
  controllers: [ArtistController],
})
export class ArtistModule {}
