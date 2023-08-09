import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from './album.repository';
import { Album } from './album.entity';
import { Equal } from 'typeorm';
import { ArtistRepository } from 'src/artist/artist.repository';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumRepository: AlbumRepository,
    @Inject(forwardRef(() => ArtistRepository))
    private artistRepository: ArtistRepository,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}

  async createAlbum(createAlbumDto: CreateAlbumDto) {
    const artist = await this.artistRepository.findOneBy({
      id: Equal(createAlbumDto.artistId),
    });
    return this.albumRepository.createAlbum(createAlbumDto, artist);
  }

  getAlbums(): Promise<Album[]> {
    return this.albumRepository.find();
  }

  getAlbumById(id: string): Promise<Album | null> {
    return this.albumRepository.findOneBy({ id });
  }

  deleteArtistFromAlbums(artistId: string) {
    return this.albumRepository.deleteArtistFromAlbums(artistId);
  }

  async deleteAlbum(id: string): Promise<void> {
    await this.trackService.deleteAlbumFromTracks(id);
    await this.albumRepository.delete(id);
  }

  async updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    const artist = await this.artistRepository.findOneBy({
      id: Equal(updateAlbumDto.artistId),
    });
    return this.albumRepository.updateAlbum(id, updateAlbumDto, artist);
  }
}
