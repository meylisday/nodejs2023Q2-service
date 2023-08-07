import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { TrackService } from '../track/track.service';
import { AppService } from 'src/app.service';
import { StatusCodes } from 'http-status-codes';
import { TrackEntity } from 'src/track/track.entity';
import { AlbumEntity } from 'src/album/album.entity';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly appService: AppService,
  ) {}

  @Inject(TrackService)
  private readonly trackService: TrackService;

  @Inject(AlbumService)
  private readonly albumService: AlbumService;

  @Inject(ArtistService)
  private readonly artistService: ArtistService;

  @Get()
  findAllFavorites() {
    return this.favoritesService.findAllFavorites();
  }

  @Post('track/:id')
  addTrackToFavorites(@Param('id') id: string): TrackEntity {
    if (!this.appService.isValidUuid(id)) {
      throw new HttpException('Invalid id', StatusCodes.BAD_REQUEST);
    }
    const track = this.trackService.findTrackById(id);
    if (!track) {
      throw new HttpException(
        'Unprocessable entity',
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }

    this.favoritesService.addTrackToFavorites(id);

    return track;
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrackFromFavorites(@Param('id') id: string): void {
    if (!this.appService.isValidUuid(id)) {
      throw new HttpException('Invalid id', StatusCodes.BAD_REQUEST);
    }
    if (!this.favoritesService.trackIsInFavorites(id)) {
      throw new NotFoundException('Track not in the favorites');
    }
    return this.favoritesService.deleteTrackFromFavorites(id);
  }

  @Post('album/:id')
  addAlbumToFavorites(@Param('id') id: string): AlbumEntity {
    if (!this.appService.isValidUuid(id)) {
      throw new HttpException('Invalid id', StatusCodes.BAD_REQUEST);
    }
    const album = this.albumService.findAlbumById(id);
    if (!album) {
      throw new HttpException(
        'Unprocessable entity',
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }

    this.favoritesService.addAlbumToFavorites(id);

    return album;
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbumFromFavorites(@Param('id') id: string): void {
    if (!this.appService.isValidUuid(id)) {
      throw new HttpException('Invalid id', StatusCodes.BAD_REQUEST);
    }
    if (!this.favoritesService.albumIsInFavorites(id)) {
      throw new NotFoundException('Album not in the favorites');
    }
    return this.favoritesService.deleteAlbumFromFavorites(id);
  }

  @Post('artist/:id')
  addArtistToFavorites(@Param('id') id: string) {
    if (!this.appService.isValidUuid(id)) {
      throw new HttpException('Invalid id', StatusCodes.BAD_REQUEST);
    }
    const artist = this.artistService.getArtistById(id);
    if (!artist) {
      throw new HttpException(
        'Unprocessable entity',
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }

    this.favoritesService.addArtistToFavorites(id);

    return artist;
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtistFromFavorites(@Param('id') id: string): void {
    if (!this.appService.isValidUuid(id)) {
      throw new HttpException('Invalid id', StatusCodes.BAD_REQUEST);
    }
    if (!this.favoritesService.artistIsInFavorites(id)) {
      throw new NotFoundException('Artist not in the favorites');
    }
    return this.favoritesService.deleteArtistFromFavorites(id);
  }
}
