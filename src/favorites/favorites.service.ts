import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Favorites } from './favorites.entity';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { FavoritesRepository } from './favorites.repository';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesRepository: FavoritesRepository,
    @Inject(TrackService)
    private readonly trackService: TrackService,
    @Inject(AlbumService)
    private readonly albumService: AlbumService,
    @Inject(ArtistService)
    private readonly artistService: ArtistService,
  ) {}

  async findAllFavorites() {
    return this.filterFields(await this.favoritesRepository.getFavorites());
  }

  async addTrackToFavorites(id: string) {
    const track = await this.trackService.getTrackById(id);
    const favorites = await this.favoritesRepository.getFavorites();

    if (!favorites.tracks) {
      favorites.tracks = [];
    }

    favorites.tracks.push(track);

    return this.filterFields(await this.favoritesRepository.save(favorites));
  }

  async deleteTrackFromFavorites(id: string) {
    const favorites = await this.favoritesRepository.getFavorites();
    const objWithIdIndex = favorites.tracks.findIndex((obj) => obj.id === id);

    if (objWithIdIndex < 0) {
      throw new NotFoundException('Track not in the favorites');
    }

    favorites.tracks.splice(objWithIdIndex, 1);

    await this.favoritesRepository.save(favorites);
  }

  async addAlbumToFavorites(id: string) {
    const album = await this.albumService.getAlbumById(id);
    const favorites = await this.favoritesRepository.getFavorites();

    if (!favorites.albums) {
      favorites.albums = [];
    }

    favorites.albums.push(album);

    return this.filterFields(await this.favoritesRepository.save(favorites));
  }

  async deleteAlbumFromFavorites(id: string) {
    const favorites = await this.favoritesRepository.getFavorites();
    const objWithIdIndex = favorites.albums.findIndex((obj) => obj.id === id);

    if (objWithIdIndex < 0) {
      throw new NotFoundException('Album not in the favorites');
    }

    favorites.albums.splice(objWithIdIndex, 1);

    await this.favoritesRepository.save(favorites);
  }

  async addArtistToFavorites(id: string) {
    const artist = await this.artistService.getArtistById(id);
    const favorites = await this.favoritesRepository.getFavorites();

    if (!favorites.artists) {
      favorites.artists = [];
    }

    favorites.artists.push(artist);

    return this.filterFields(await this.favoritesRepository.save(favorites));
  }

  async deleteArtistFromFavorites(id: string) {
    const favorites = await this.favoritesRepository.getFavorites();
    const objWithIdIndex = favorites.artists.findIndex((obj) => obj.id === id);

    if (objWithIdIndex < 0) {
      throw new NotFoundException('Artist not in the favorites');
    }

    favorites.artists.splice(objWithIdIndex, 1);

    await this.favoritesRepository.save(favorites);
  }

  private filterFields(favorites: Favorites) {
    return {
      albums: favorites.albums.map((album) => ({
        id: album.id,
        name: album.name,
        year: album.year,
        artistId: album.artistId,
      })),
      artists: favorites.artists.map((artist) => ({
        id: artist.id,
        name: artist.name,
        grammy: artist.grammy,
      })),
      tracks: favorites.tracks.map((track) => ({
        id: track.id,
        name: track.name,
        duration: track.duration,
        artistId: track.artistId,
        albumId: track.albumId,
      })),
    };
  }
}
