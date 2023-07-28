import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AppService } from 'src/app.service';

@Module({
  providers: [UserService, AppService],
  controllers: [UserController],
})
export class UserModule {}
