import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  // NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { StatusCodes } from 'http-status-codes';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    @Inject(TrackService)
    private readonly trackService: TrackService,
    @Inject(AlbumService)
    private readonly albumService: AlbumService,
    @Inject(ArtistService)
    private readonly artistService: ArtistService,
  ) {}

  @Get()
  findAllFavorites() {
    return this.favoritesService.findAllFavorites();
  }

  @Post('track/:id')
  async addTrackToFavorites(@Param('id') id: string) {
    if (!this.isValidUuid(id)) {
      throw new HttpException('Invalid id', StatusCodes.BAD_REQUEST);
    }
    const track = await this.trackService.getTrackById(id);
    if (!track) {
      throw new HttpException(
        'Unprocessable entity',
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }

    return await this.favoritesService.addTrackToFavorites(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrackFromFavorites(@Param('id') id: string): Promise<void> {
    if (!this.isValidUuid(id)) {
      throw new HttpException('Invalid id', StatusCodes.BAD_REQUEST);
    }
    // if (!this.favoritesService.trackIsInFavorites(id)) {
    //   throw new NotFoundException('Track not in the favorites');
    // }
    await this.favoritesService.deleteTrackFromFavorites(id);
  }

  @Post('album/:id')
  async addAlbumToFavorites(@Param('id') id: string) {
    if (!this.isValidUuid(id)) {
      throw new HttpException('Invalid id', StatusCodes.BAD_REQUEST);
    }
    const album = await this.albumService.getAlbumById(id);
    if (!album) {
      throw new HttpException(
        'Unprocessable entity',
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }

    await this.favoritesService.addAlbumToFavorites(id);

    return await this.favoritesService.findAllFavorites();
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbumFromFavorites(@Param('id') id: string): Promise<void> {
    if (!this.isValidUuid(id)) {
      throw new HttpException('Invalid id', StatusCodes.BAD_REQUEST);
    }
    // if (!this.favoritesService.albumIsInFavorites(id)) {
    //   throw new NotFoundException('Album not in the favorites');
    // }
    await this.favoritesService.deleteAlbumFromFavorites(id);
  }

  @Post('artist/:id')
  async addArtistToFavorites(@Param('id') id: string) {
    if (!this.isValidUuid(id)) {
      throw new HttpException('Invalid id', StatusCodes.BAD_REQUEST);
    }
    const artist = await this.artistService.getArtistById(id);
    if (!artist) {
      throw new HttpException(
        'Unprocessable entity',
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }

    return await this.favoritesService.addArtistToFavorites(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtistFromFavorites(@Param('id') id: string): Promise<void> {
    if (!this.isValidUuid(id)) {
      throw new HttpException('Invalid id', StatusCodes.BAD_REQUEST);
    }
    // if (!this.favoritesService.artistIsInFavorites(id)) {
    //   throw new NotFoundException('Artist not in the favorites');
    // }
    await this.favoritesService.deleteArtistFromFavorites(id);
  }

  private isValidUuid(id: string): boolean {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(id);
  }
}
