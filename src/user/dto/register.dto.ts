import { IsEmail, IsNotEmpty } from 'class-validator'

export class Register {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}