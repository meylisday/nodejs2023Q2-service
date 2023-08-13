import { Artist } from '../artist/artist.entity';
import { Track } from '../track/track.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string;

  @ManyToOne(() => Artist, (artist) => artist.albums, { eager: false })
  artist: Artist | null;

  @OneToMany(() => Track, (track) => track.album, { eager: true })
  tracks: Track[];
}
