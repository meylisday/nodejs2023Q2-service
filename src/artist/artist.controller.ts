import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  HttpException,
  HttpStatus,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { AppService } from 'src/app.service';
import { StatusCodes } from 'http-status-codes';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly appService: AppService,
  ) {}

  @Get()
  findAllArtists() {
    return this.artistService.getArtists();
  }

  @Get(':id')
  async findArtistById(@Param('id') id: string) {
    if (!this.appService.isValidUuid(id)) {
      throw new HttpException('Invalid id', StatusCodes.BAD_REQUEST);
    }
    const artist = await this.artistService.getArtistById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  @Post()
  createArtist(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.createArtist(createArtistDto);
  }

  @Put(':id')
  async updateArtist(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    if (!this.appService.isValidUuid(id)) {
      throw new HttpException('Invalid artist ID', HttpStatus.BAD_REQUEST);
    }
    const artist = await this.artistService.getArtistById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return this.artistService.updateArtist(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param('id') id: string): Promise<void> {
    if (!this.appService.isValidUuid(id)) {
      throw new HttpException('Invalid id', StatusCodes.BAD_REQUEST);
    }

    const artist = await this.artistService.getArtistById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return this.artistService.deleteArtist(id);
  }
}
