import { DataSource, Equal, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Track } from './track.entity';
import { Album } from '../album/album.entity';
import { Artist } from '../artist/artist.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackRepository extends Repository<Track> {
  constructor(private dataSource: DataSource) {
    super(Track, dataSource.createEntityManager());
  }

  async createTrack(
    createTrackDto: CreateTrackDto,
    album: Album,
    artist: Artist,
  ): Promise<Track> {
    const track = this.create({ ...createTrackDto, album, artist });
    return await this.save(track);
  }

  async updateTrack(
    id: string,
    updateTrackDto: UpdateTrackDto,
    album: Album,
    artist: Artist,
  ): Promise<Track> {
    await this.update(id, { ...updateTrackDto, album, artist });
    return await this.findOneBy({ id: Equal(id) });
  }

  async deleteArtistFromTracks(artistId: string): Promise<void> {
    await this.update({ artist: { id: artistId } }, { artist: null });
  }

  async deleteAlbumFromTracks(albumId: string): Promise<void> {
    await this.update({ album: { id: albumId } }, { album: null });
  }
}
