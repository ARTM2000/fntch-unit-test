import { Body, Controller, Post } from '@nestjs/common';
import { IGlobalRespnose } from '../common/types';
import { Register } from './dto/register.dto';
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
}
