import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmModuleOptions } from './typeorm.config';
import { LoggingService } from './shared/logging.service';
import { UnhandledErrorsService } from './shared/unhandled-errors.service';
import { HttpExceptionFilter } from './shared/http-exception.filter';
import { LoggingMiddleware } from './shared/logging.middleware';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuardMiddleware } from './auth/JwtAuthGuardMiddleware';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        ...getTypeOrmModuleOptions(),
      }),
    }),
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoritesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LoggingService,
    JwtService,
    UnhandledErrorsService,
    HttpExceptionFilter,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
    consumer
      .apply(JwtAuthGuardMiddleware)
      .exclude(
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'auth/signup', method: RequestMethod.POST },
        { path: '/doc', method: RequestMethod.GET },
        { path: '/', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}
