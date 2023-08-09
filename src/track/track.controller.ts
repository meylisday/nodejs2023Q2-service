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
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  findAllTracks() {
    return this.trackService.getTracks();
  }

  @Get(':id')
  async findTrackById(@Param('id') id: string) {
    if (!this.isValidUuid(id)) {
      throw new HttpException('Invalid id', StatusCodes.BAD_REQUEST);
    }
    const track = await this.trackService.getTrackById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  @Post()
  createTrack(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.createTrack(createTrackDto);
  }

  @Put(':id')
  async updateTrack(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    if (!this.isValidUuid(id)) {
      throw new HttpException('Invalid track ID', HttpStatus.BAD_REQUEST);
    }
    const track = await this.trackService.getTrackById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return this.trackService.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param('id') id: string) {
    if (!this.isValidUuid(id)) {
      throw new HttpException('Invalid id', StatusCodes.BAD_REQUEST);
    }
    const track = await this.trackService.getTrackById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return this.trackService.deleteTrack(id);
  }

  private isValidUuid(id: string): boolean {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(id);
  }
}
