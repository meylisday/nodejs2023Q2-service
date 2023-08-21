import { Album } from '../album/album.entity';
import { Artist } from '../artist/artist.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  artistId: string;

  @ManyToOne(() => Artist, (artist) => artist.tracks, { eager: false })
  artist: Artist | null;

  @Column({ nullable: true })
  albumId: string;

  @ManyToOne(() => Album, (album) => album.tracks, { eager: false })
  album: Album | null;

  @Column()
  duration: number;
}
