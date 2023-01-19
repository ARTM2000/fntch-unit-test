import { Body, Controller, Post } from '@nestjs/common';
import { IGlobalRespnose } from '../common/types';
import { Register } from './dto/register.dto';
import { Login } from './dto/login.dto';
import { Users } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async register(@Body() body: Register): Promise<IGlobalRespnose<Users>> {
    const newUser = await this.userService.createUser(body);
    return {
      data: newUser,
    };
  }

  @Post('login')
  async login(@Body() body: Login): Promise<IGlobalRespnose<string>> {
    await this.userService.verifyUser(body.email, body.password);
    const cred = await this.userService.dangerouslyCreateUserCredential({
      email: body.email,
      password: body.password,
    });
    return {
      data: cred,
    };
  }
}
