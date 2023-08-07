import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AlbumEntity } from './album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { v4 as uuid } from 'uuid';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { TrackService } from '../track/track.service';

@Injectable()
export class AlbumService {
  private albums: AlbumEntity[] = [];

  @Inject(TrackService)
  private readonly trackService: TrackService;

  createAlbum(createAlbumDto: CreateAlbumDto): AlbumEntity {
    const id = uuid();

    const newAlbum = new AlbumEntity(
      id,
      createAlbumDto.name,
      createAlbumDto.year,
      createAlbumDto.artistId,
    );

    this.albums.push(newAlbum);
    return newAlbum;
  }

  findAllAlbums(): AlbumEntity[] {
    return this.albums;
  }

  findAlbumById(id: string): AlbumEntity | undefined {
    return this.albums.find((album) => album.id === id);
  }

  updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto): AlbumEntity {
    const album = this.findAlbumById(id);

    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;

    return album;
  }

  deleteArtistFromAlbums(artistId: string) {
    this.albums = this.albums.map((album) => {
      if (album.artistId === artistId) {
        return {
          ...album,
          artistId: null,
        };
      }

      return album;
    });
  }

  deleteAlbum(id: string): void {
    const objWithIdIndex = this.albums.findIndex((obj) => obj.id === id);
    if (objWithIdIndex < 0) {
      throw new NotFoundException('Artist not found');
    }

    this.trackService.deleteAlbumFromTrack(id);
    this.albums.splice(objWithIdIndex, 1);
  }
}
