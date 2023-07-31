import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { AppService } from 'src/app.service';
import { AlbumService } from './album.service';
import { AlbumEntity } from './album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private readonly appService: AppService,
  ) {}

  @Get()
  findAllAlbums(): AlbumEntity[] {
    return this.albumService.findAllAlbums();
  }

  @Get(':id')
  findAlbumById(@Param('id') id: string): AlbumEntity {
    if (!this.appService.isValidUuid(id)) {
      throw new HttpException('Invalid id', StatusCodes.BAD_REQUEST);
    }
    const album = this.albumService.findAlbumById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  @Post()
  createAlbum(@Body() createAlbumDto: CreateAlbumDto): AlbumEntity {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  updateAlbum(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): AlbumEntity {
    if (!this.appService.isValidUuid(id)) {
      throw new HttpException('Invalid album ID', HttpStatus.BAD_REQUEST);
    }
    const album = this.findAlbumById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return this.albumService.updateAlbum(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id') id: string): void {
    if (!this.appService.isValidUuid(id)) {
      throw new HttpException('Invalid id', StatusCodes.BAD_REQUEST);
    }
    return this.albumService.deleteAlbum(id);
  }
}
