import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { Register } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async createUser(data: Register): Promise<Users> {
    const userWithSameEmailOrUsername = await this.userRepository.findOne({
      where: [{ username: data.username }, { email: data.email }],
    });
    if (!!userWithSameEmailOrUsername) {
      throw new UnprocessableEntityException('Email or Username exist');
    }

    const hashedPassword = bcrypt.hashSync(data.password, 10);
    const newUser = this.userRepository.create({
      email: data.email,
      username: data.username,
      hash_password: hashedPassword,
    });

    return this.userRepository.save(newUser);
  }
}
