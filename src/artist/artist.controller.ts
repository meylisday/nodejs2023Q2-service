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
import { ArtistEntity } from './artist.entity';
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
  findAllArtists(): ArtistEntity[] {
    return this.artistService.findAllArtists();
  }

  @Get(':id')
  findArtistById(@Param('id') id: string): ArtistEntity {
    if (!this.appService.isValidUuid(id)) {
      throw new HttpException('Invalid id', StatusCodes.BAD_REQUEST);
    }
    const user = this.artistService.findArtistById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post()
  createArtist(@Body() createArtistDto: CreateArtistDto): ArtistEntity {
    return this.artistService.createArtist(createArtistDto);
  }

  @Put(':id')
  updateArtist(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): ArtistEntity {
    if (!this.appService.isValidUuid(id)) {
      throw new HttpException('Invalid artist ID', HttpStatus.BAD_REQUEST);
    }
    const artist = this.findArtistById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return this.artistService.updateArtist(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id') id: string): void {
    if (!this.appService.isValidUuid(id)) {
      throw new HttpException('Invalid id', StatusCodes.BAD_REQUEST);
    }
    return this.artistService.deleteArtist(id);
  }
}
