import { DataSource, Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export type UserResponse = Promise<Omit<User, 'password'>>;

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  public async createUser(createUserDto: CreateUserDto): UserResponse {
    const { login, password } = createUserDto;

    const user = this.create({
      login,
      password: password,
    });

    try {
      await this.save(user);
      return {
        id: user.id,
        version: user.version,
        login: user.login,
        createdAt: new Date(user.createdAt).getTime(),
        updatedAt: new Date(user.updatedAt).getTime(),
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): UserResponse {
    const { newPassword } = updateUserDto;

    const user = await this.findOneBy({ id });
    const version = user.version + 1;

    await this.update(id, {
      password: newPassword,
      version: version,
    });

    const updatedUser = await this.findOneBy({ id });

    return {
      id: updatedUser.id,
      version: updatedUser.version,
      login: updatedUser.login,
      createdAt: new Date(updatedUser.createdAt).getTime(),
      updatedAt: new Date(updatedUser.updatedAt).getTime(),
    };
  }
}
