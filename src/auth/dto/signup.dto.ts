import { IsNotEmpty } from 'class-validator';
export class SignupDto {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}
