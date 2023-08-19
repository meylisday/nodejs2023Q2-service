import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: CreateUserDto) {
    return this.authService.login(loginDto);
  }

  @Post('signup')
  async signup(@Body() signupDto: CreateUserDto): Promise<User> {
    const { login, password } = signupDto;
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.authService.signup(login, hashedPassword);
    return result;
  }
}
