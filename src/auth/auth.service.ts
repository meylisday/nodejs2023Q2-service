import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { RefreshTokenAuthDto } from './dto/refresh-token.dto';
import { PayloadType } from './types/payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<User> {
    const user = await this.userService.getUser({ login });
    if (!user) {
      throw new ForbiddenException('No user with such login');
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new ForbiddenException('Password does not match actual one');
    }
    return user;
  }
  async checkUniqueUser(signupDto: CreateUserDto): Promise<User> {
    const { login } = signupDto;
    return await this.userService.getUser({ login });
  }

  async login(signupDto: CreateUserDto) {
    const { login, password } = signupDto;
    const user = await this.validateUser(login, password);

    const payload = { login: user.login, userId: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    };
  }

  async signup(login: string, password: string): Promise<User> {
    return this.userService.createUser({ login, password });
  }

  async refresh(refreshDto: RefreshTokenAuthDto) {
    const { refreshToken } = refreshDto;
    if (!refreshToken) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    const payload = await this.verifyRefreshToken(refreshToken);
    const user = await this.userService.getUserById(payload.id);

    if (!user) {
      throw new ForbiddenException('Credentials are not valid');
    }

    return {
      accessToken: this.jwtService.sign({
        login: payload.login,
        userId: payload.id,
      }),
      refreshToken: await this.generateRefreshToken({
        login: payload.login,
        id: payload.id,
      }),
    };
  }

  private async verifyRefreshToken(refreshToken: string): Promise<PayloadType> {
    try {
      return await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });
    } catch (error) {
      throw new ForbiddenException('Credentials are not valid');
    }
  }

  private async generateRefreshToken(payload: PayloadType): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });
  }
}
