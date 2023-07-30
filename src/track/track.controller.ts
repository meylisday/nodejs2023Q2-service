import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { TrackService } from './track.service';
import { TrackEntity } from './track.entity';
import { AppService } from '../app.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(
    private readonly appService: AppService,
    private readonly trackService: TrackService,
  ) {}

  @Get()
  findAllTracks(): TrackEntity[] {
    return this.trackService.findAllTracks();
  }

  @Get(':id')
  findTrackById(@Param('id') id: string): TrackEntity {
    if (!this.appService.isValidUuid(id)) {
      throw new HttpException('Invalid id', StatusCodes.BAD_REQUEST);
    }
    const track = this.trackService.findTrackById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  @Post()
  createTrack(@Body() createTrackDto: CreateTrackDto): TrackEntity {
    return this.trackService.createTrack(createTrackDto);
  }

  @Put(':id')
  updateTrack(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): TrackEntity {
    if (!this.appService.isValidUuid(id)) {
      throw new HttpException('Invalid track ID', HttpStatus.BAD_REQUEST);
    }
    const track = this.findTrackById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return this.trackService.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id') id: string): void {
    if (!this.appService.isValidUuid(id)) {
      throw new HttpException('Invalid id', StatusCodes.BAD_REQUEST);
    }
    return this.trackService.deleteTrack(id);
  }
}
