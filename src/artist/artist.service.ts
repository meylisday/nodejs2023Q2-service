import { Injectable } from '@nestjs/common';
import { Artist } from './artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
// import { AlbumService } from '../album/album.service';
// import { TrackService } from '../track/track.service';
import { ArtistRepository } from './artist.repository';

@Injectable()
export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  // @Inject(AlbumService)
  // private readonly albumService: AlbumService;

  // @Inject(TrackService)
  // private readonly trackService: TrackService;

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
    // this.albumService.deleteArtistFromAlbums(id);
    // this.trackService.deleteArtistFromTrack(id);
    await this.artistRepository.delete(id);
  }

  updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    return this.artistRepository.updateArtist(id, updateArtistDto);
  }
}
