import { Injectable, NotFoundException } from '@nestjs/common';
import { TrackEntity } from './track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { v4 as uuid } from 'uuid';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  private tracks: TrackEntity[] = [];

  createTrack(createTrackDto: CreateTrackDto): TrackEntity {
    const id = uuid();

    const newTrack = new TrackEntity(
      id,
      createTrackDto.name,
      createTrackDto.artistId,
      createTrackDto.albumId,
      createTrackDto.duration,
    );

    this.tracks.push(newTrack);
    return newTrack;
  }

  findAllTracks(): TrackEntity[] {
    return this.tracks;
  }

  findTrackById(id: string): TrackEntity | undefined {
    return this.tracks.find((track) => track.id === id);
  }

  updateTrack(id: string, updateTrackDto: UpdateTrackDto): TrackEntity {
    const track = this.findTrackById(id);

    track.name = updateTrackDto.name;
    track.artistId = updateTrackDto.artistId;
    track.albumId = updateTrackDto.albumId;
    track.duration = updateTrackDto.duration;

    return track;
  }

  deleteAlbumFromTrack(albumId: string) {
    this.tracks = this.tracks.map((track) => {
      if (track.albumId === albumId) {
        return {
          ...track,
          albumId: null,
        };
      }

      return track;
    });
  }

  deleteArtistFromTrack(artistId: string) {
    this.tracks = this.tracks.map((track) => {
      if (track.artistId === artistId) {
        return {
          ...track,
          artistId: null,
        };
      }

      return track;
    });
  }

  deleteTrack(id: string): void {
    const objWithIdIndex = this.tracks.findIndex((obj) => obj.id === id);
    if (objWithIdIndex < 0) {
      throw new NotFoundException('Artist not found');
    }
    this.tracks.splice(objWithIdIndex, 1);
  }
}
