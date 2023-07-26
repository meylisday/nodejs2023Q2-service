import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private users: UserEntity[] = [];

  createUser(createUserDto: CreateUserDto): Partial<UserEntity> {
    const id = uuid();
    const version = 1;
    const createdAt = Date.now();
    const updatedAt = Date.now();

    const newUser = new UserEntity(
      id,
      createUserDto.login,
      createUserDto.password,
      version,
      createdAt,
      updatedAt,
    );

    this.users.push(newUser);
    return {
      id: newUser.id,
      version: newUser.version,
      login: newUser.login,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
  }

  findAllUsers(): UserEntity[] {
    return this.users;
  }

  findUserById(id: string): UserEntity | undefined {
    return this.users.find((user) => user.id === id);
  }

  updateUser(id: string, updateUserDto: UpdateUserDto): Partial<UserEntity> {
    const user = this.findUserById(id);

    user.password = updateUserDto.newPassword;
    user.updatedAt = Date.now();
    user.version = user.version + 1;

    return {
      id: user.id,
      version: user.version,
      login: user.login,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  deleteUser(id: string): void {
    const objWithIdIndex = this.users.findIndex((obj) => obj.id === id);
    if (objWithIdIndex < 0) {
      throw new NotFoundException('User not found');
    }
    this.users.splice(objWithIdIndex, 1);
  }

  public isValidUuid(id: string): boolean {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(id);
  }
}
