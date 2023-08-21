import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Favorites } from './favorites/favorites.entity';
import { Track } from './track/track.entity';
import { Album } from './album/album.entity';
import { Artist } from './artist/artist.entity';
import { User } from './user/user.entity';

export const getTypeOrmModuleOptions = (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    entities: [Artist, Album, User, Favorites, Track],
    autoLoadEntities: true,
    synchronize: false,
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    migrations: ['dist/migrations/*.js'],
    migrationsTableName: 'migrations',
    migrationsRun: true,
  };
};

export default new DataSource(getTypeOrmModuleOptions() as DataSourceOptions);
