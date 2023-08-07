import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  HttpException,
  HttpStatus,
  NotFoundException,
  HttpCode,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { StatusCodes } from 'http-status-codes';
import { AppService } from '../app.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly appService: AppService,
  ) {}

  @Get()
  findAllUsers(): UserEntity[] {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  findUserById(@Param('id') id: string): UserEntity {
    if (!this.appService.isValidUuid(id)) {
      throw new HttpException('Invalid id', StatusCodes.BAD_REQUEST);
    }
    const user = this.userService.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Partial<UserEntity> {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Partial<UserEntity> {
    if (!this.appService.isValidUuid(id)) {
      throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
    }
    const user = this.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.oldPassword !== user.password) {
      throw new ForbiddenException('Old password does not match');
    }

    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id') id: string): void {
    if (!this.appService.isValidUuid(id)) {
      throw new HttpException('Invalid id', StatusCodes.BAD_REQUEST);
    }
    return this.userService.deleteUser(id);
  }
}
