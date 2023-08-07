import { Artist } from 'src/artist/artist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
}
