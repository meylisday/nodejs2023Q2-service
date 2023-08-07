import { Inject, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { TrackService } from '../track/track.service';
import { AlbumRepository } from './album.repository';
import { Album } from './album.entity';
import { ArtistRepository } from 'src/artist/artist.repository';
import { Equal } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumRepository: AlbumRepository,
    private readonly artistRepository: ArtistRepository,
  ) {}

  @Inject(TrackService)
  private readonly trackService: TrackService;

  // @Inject(ArtistService)
  // private readonly artistService: ArtistService;

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
    // this.trackService.deleteAlbumFromTrack(id);
    await this.albumRepository.delete(id);
  }

  updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.albumRepository.updateAlbum(id, updateAlbumDto);
  }
}
