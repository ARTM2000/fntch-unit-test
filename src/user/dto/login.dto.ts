import { IsEmail, IsNotEmpty } from 'class-validator';

export class Login {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
