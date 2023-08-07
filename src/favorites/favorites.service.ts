import { Inject, Injectable } from '@nestjs/common';
import { FavoritesEntity } from './favorites.entity';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';

@Injectable()
export class FavoritesService {
  private favorites: FavoritesEntity = { artists: [], albums: [], tracks: [] };

  @Inject(TrackService)
  private readonly trackService: TrackService;

  @Inject(AlbumService)
  private readonly albumService: AlbumService;

  @Inject(ArtistService)
  private readonly artistService: ArtistService;

  async findAllFavorites() {
    const tracks = this.trackService
      .findAllTracks()
      .filter((track) => this.favorites.tracks.includes(track.id));

    const albums = (await this.albumService.getAlbums()).filter((album) =>
      this.favorites.albums.includes(album.id),
    );

    const artists = (await this.artistService.getArtists()).filter((artist) =>
      this.favorites.artists.includes(artist.id),
    );

    return {
      tracks: tracks,
      albums: albums,
      artists: artists,
    };
  }
  addTrackToFavorites(id: string): void {
    this.favorites.tracks.push(id);
  }

  deleteTrackFromFavorites(id: string): void {
    const objWithIdIndex = this.favorites.tracks.findIndex((obj) => obj === id);
    this.favorites.tracks.splice(objWithIdIndex, 1);
  }

  addAlbumToFavorites(id: string): void {
    this.favorites.albums.push(id);
  }

  deleteAlbumFromFavorites(id: string): void {
    const objWithIdIndex = this.favorites.albums.findIndex((obj) => obj === id);
    this.favorites.albums.splice(objWithIdIndex, 1);
  }

  addArtistToFavorites(id: string): void {
    this.favorites.artists.push(id);
  }

  deleteArtistFromFavorites(id: string): void {
    const objWithIdIndex = this.favorites.artists.findIndex(
      (obj) => obj === id,
    );
    this.favorites.artists.splice(objWithIdIndex, 1);
  }

  trackIsInFavorites(id: string): boolean {
    return this.favorites.tracks.includes(id);
  }

  albumIsInFavorites(id: string): boolean {
    return this.favorites.albums.includes(id);
  }

  artistIsInFavorites(id: string): boolean {
    return this.favorites.artists.includes(id);
  }
}
