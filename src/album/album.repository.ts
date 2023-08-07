import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Album } from './album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from '../artist/artist.entity';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumRepository extends Repository<Album> {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Artist) private artistRepository: Repository<Artist>,
  ) {
    super(Album, dataSource.createEntityManager());
  }

  async createAlbum(
    createAlbumDto: CreateAlbumDto,
    artist: Artist,
  ): Promise<Album> {
    const album = this.create({
      ...createAlbumDto,
      artist,
    });
    return await this.save(album);
  }

  async updateAlbum(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    const { artistId } = updateAlbumDto;

    const artist = await this.artistRepository.findOneBy({ id: artistId });

    await this.update(id, { ...updateAlbumDto, artist });

    return await this.findOneBy({ id });
  }

  async deleteArtistFromAlbums(artistId: string): Promise<void> {
    await this.update({ artist: { id: artistId } }, { artist: null });
  }
}
