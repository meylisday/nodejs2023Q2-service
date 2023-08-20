import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { RefreshTokenAuthDto } from './dto/refresh-token.dto';
import { StatusCodes } from 'http-status-codes';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: CreateUserDto) {
    return this.authService.login(loginDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  async signup(@Body() signupDto: CreateUserDto): Promise<User> {
    const user = await this.authService.checkUniqueUser(signupDto);
    if (user) {
      throw new HttpException('User already exists', StatusCodes.BAD_REQUEST);
    }
    const { login, password } = signupDto;
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.authService.signup(login, hashedPassword);
    return result;
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() refreshDto: RefreshTokenAuthDto) {
    const { refreshToken } = refreshDto;
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is missing');
    }
    return await this.authService.refresh(refreshDto);
  }
}
