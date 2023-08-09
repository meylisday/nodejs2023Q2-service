import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Track } from './track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackRepository } from './track.repository';
import { AlbumRepository } from 'src/album/album.repository';
import { ArtistRepository } from 'src/artist/artist.repository';
import { Equal } from 'typeorm';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class TrackService {
  constructor(
    private readonly trackRepository: TrackRepository,
    private readonly moduleRef: ModuleRef,
    @Inject(forwardRef(() => AlbumRepository))
    private albumRepository: AlbumRepository,
    @Inject(forwardRef(() => ArtistRepository))
    private artistRepository: ArtistRepository,
  ) {}

  async createTrack(createTrackDto: CreateTrackDto) {
    const album = await this.albumRepository.findOneBy({
      id: Equal(createTrackDto.albumId),
    });
    const artist = await this.artistRepository.findOneBy({
      id: Equal(createTrackDto.artistId),
    });
    return this.trackRepository.createTrack(createTrackDto, album, artist);
  }

  getTracks(): Promise<Track[]> {
    return this.trackRepository.find();
  }

  getTrackById(id: string): Promise<Track | null> {
    return this.trackRepository.findOneBy({ id });
  }

  async deleteTrack(id: string): Promise<void> {
    await this.trackRepository.delete(id);
  }

  async updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    const album = await this.albumRepository.findOneBy({
      id: Equal(updateTrackDto.albumId),
    });

    const artist = await this.artistRepository.findOneBy({
      id: Equal(updateTrackDto.artistId),
    });
    return this.trackRepository.updateTrack(id, updateTrackDto, album, artist);
  }

  deleteArtistFromTracks(artistId: string) {
    return this.trackRepository.deleteArtistFromTracks(artistId);
  }

  deleteAlbumFromTracks(albumId: string) {
    return this.trackRepository.deleteAlbumFromTracks(albumId);
  }
}
