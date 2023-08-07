import { IsNumber, IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  name: string;

  artistId: string | null;

  albumId: string | null;

  @IsNumber()
  duration: number;
}
