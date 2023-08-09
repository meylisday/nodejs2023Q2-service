import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Artist } from './artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistRepository } from './artist.repository';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistRepository: ArtistRepository,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}

  createArtist(createArtistDto: CreateArtistDto) {
    return this.artistRepository.createArtist(createArtistDto);
  }

  getArtists(): Promise<Artist[]> {
    return this.artistRepository.find();
  }

  getArtistById(id: string): Promise<Artist | null> {
    return this.artistRepository.findOneBy({ id });
  }

  async deleteArtist(id: string): Promise<void> {
    await this.albumService.deleteArtistFromAlbums(id);
    await this.trackService.deleteArtistFromTracks(id);
    await this.artistRepository.delete(id);
  }

  updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    return this.artistRepository.updateArtist(id, updateArtistDto);
  }
}
