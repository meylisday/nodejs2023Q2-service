import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.userService.getUser({ login });
    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async login(signupDto: CreateUserDto) {
    const { login, password } = signupDto;
    const user = await this.validateUser(login, password);

    const payload = { login: user.login, id: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signup(login: string, password: string): Promise<User> {
    return this.userService.createUser({ login, password });
  }
}
