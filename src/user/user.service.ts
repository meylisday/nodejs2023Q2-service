import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UserRepository) {}

  createUser(createUserDto: CreateUserDto) {
    return this.usersRepository.createUser(createUserDto);
  }

  getUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  getUserById(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async deleteUser(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.updateUser(id, updateUserDto);
  }

  async getUser(query: object): Promise<User> {
    return this.usersRepository.findOneBy(query);
  }
}
