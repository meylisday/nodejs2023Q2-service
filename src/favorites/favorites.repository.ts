import { DataSource, Equal, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { FAVORITE_ID, Favorites } from './favorites.entity';

@Injectable()
export class FavoritesRepository extends Repository<Favorites> {
  constructor(private dataSource: DataSource) {
    super(Favorites, dataSource.createEntityManager());
  }

  public async getFavorites() {
    const favorites = await this.findOne({
      where: {
        id: Equal(FAVORITE_ID),
      },
      relations: ['tracks', 'albums', 'artists'],
    });

    return favorites;
  }
}
