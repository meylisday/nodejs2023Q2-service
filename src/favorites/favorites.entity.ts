import { Album } from '../album/album.entity';
import { Artist } from '../artist/artist.entity';
import { Track } from '../track/track.entity';
import { Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

export const FAVORITE_ID = 'f22a1d80-1072-4733-8093-64cdd09e328f';

@Entity()
export class Favorites {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToMany(() => Artist, { eager: false })
  @JoinTable()
  artists: Artist[];

  @ManyToMany(() => Album, { eager: false })
  @JoinTable()
  albums: Album[];

  @ManyToMany(() => Track, { eager: false })
  @JoinTable()
  tracks: Track[];
}
