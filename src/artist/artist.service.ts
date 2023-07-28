import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ArtistEntity } from './artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { v4 as uuid } from 'uuid';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class ArtistService {
  private artists: ArtistEntity[] = [];

  @Inject(AlbumService)
  private readonly albumService: AlbumService;

  createArtist(createArtistDto: CreateArtistDto): ArtistEntity {
    const id = uuid();

    const newArtist = new ArtistEntity(
      id,
      createArtistDto.name,
      createArtistDto.grammy,
    );

    this.artists.push(newArtist);
    return newArtist;
  }

  findAllArtists(): ArtistEntity[] {
    return this.artists;
  }

  findArtistById(id: string): ArtistEntity | undefined {
    return this.artists.find((artist) => artist.id === id);
  }

  updateArtist(id: string, updateArtistDto: UpdateArtistDto): ArtistEntity {
    const artist = this.findArtistById(id);

    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;

    return artist;
  }

  deleteArtist(id: string): void {
    const objWithIdIndex = this.artists.findIndex((obj) => obj.id === id);
    if (objWithIdIndex < 0) {
      throw new NotFoundException('Artist not found');
    }

    this.albumService.deleteArtistFromAlbums(id);

    this.artists.splice(objWithIdIndex, 1);
  }
}
