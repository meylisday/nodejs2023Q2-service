import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { AppService } from '../app.service';

@Module({
  providers: [TrackService, AppService],
  controllers: [TrackController],
  exports: [TrackService],
})
export class TrackModule {}
