import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Artist } from './artist.entity';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { CreateArtistDto } from './dto/create-artist.dto';

@Injectable()
export class ArtistRepository extends Repository<Artist> {
  constructor(private dataSource: DataSource) {
    super(Artist, dataSource.createEntityManager());
  }

  public async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = this.create(createArtistDto);
    return await this.save(artist);
  }

  async updateArtist(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    await this.update(id, updateArtistDto);

    return await this.findOneBy({ id });
  }
}
