import { Album } from 'src/album/album.entity';
import { Track } from 'src/track/track.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artist, { eager: true })
  albums: Album[];

  @OneToMany(() => Track, (track) => track.artist, { eager: true })
  tracks: Track[];
}
