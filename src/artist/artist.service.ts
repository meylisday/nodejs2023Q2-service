import { Inject, Injectable } from '@nestjs/common';
import { Artist } from './artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
// import { TrackService } from '../track/track.service';
import { ArtistRepository } from './artist.repository';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  @Inject(AlbumService)
  private readonly albumService: AlbumService;

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
    await this.albumService.deleteArtistFromAlbums(id);
    // this.trackService.deleteArtistFromTrack(id);
    console.log('3 =================>');

    await this.artistRepository.delete(id);
  }

  updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    return this.artistRepository.updateArtist(id, updateArtistDto);
  }
}
