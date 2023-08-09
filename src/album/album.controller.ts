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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  findAllAlbums() {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  async findAlbumById(@Param('id') id: string) {
    if (!this.isValidUuid(id)) {
      throw new HttpException('Invalid id', StatusCodes.BAD_REQUEST);
    }
    const album = await this.albumService.getAlbumById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  @Post()
  createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  async updateAlbum(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    if (!this.isValidUuid(id)) {
      throw new HttpException('Invalid album ID', HttpStatus.BAD_REQUEST);
    }
    const album = await this.albumService.getAlbumById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return this.albumService.updateAlbum(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param('id') id: string): Promise<void> {
    if (!this.isValidUuid(id)) {
      throw new HttpException('Invalid id', StatusCodes.BAD_REQUEST);
    }
    const album = await this.albumService.getAlbumById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return await this.albumService.deleteAlbum(id);
  }

  private isValidUuid(id: string): boolean {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(id);
  }
}
