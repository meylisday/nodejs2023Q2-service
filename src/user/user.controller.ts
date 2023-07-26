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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAllUsers(): UserEntity[] {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  findUserById(@Param('id') id: string): UserEntity {
    if (!this.userService.isValidUuid(id)) {
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
    if (!createUserDto.login || !createUserDto.password) {
      throw new HttpException(
        'Login and password are required',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Partial<UserEntity> {
    if (!this.userService.isValidUuid(id)) {
      throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
    }
    if (!updateUserDto.newPassword || !updateUserDto.oldPassword) {
      throw new HttpException('Password is required', HttpStatus.BAD_REQUEST);
    }
    const user = this.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (
      updateUserDto.oldPassword &&
      updateUserDto.oldPassword !== user.password
    ) {
      throw new ForbiddenException('Old password does not match');
    }

    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id') id: string): void {
    if (!this.userService.isValidUuid(id)) {
      throw new HttpException('Invalid id', StatusCodes.BAD_REQUEST);
    }
    return this.userService.deleteUser(id);
  }
}
