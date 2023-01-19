import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
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

  async findUserWithEmail(email: string): Promise<Users | boolean> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (!user) {
      return false;
    }
    return user;
  }

  async verifyUser(email: string, password: string): Promise<void> {
    const user = await this.findUserWithEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const isPasswordValid = bcrypt.compareSync(
      password,
      (user as Users).hash_password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    console.log('user cred was valid >>', email);
  }

  async dangerouslyCreateUserCredential(data: {
    email: string;
    password: string;
  }): Promise<string> {
    return Buffer.from(`${data.email}:${data.password}`).toString('base64');
  }

  async dangerouslyVerifyCredential(credential: string): Promise<void> {
    const decodeCred = Buffer.from(credential, 'base64').toString();
    const [email, password] = decodeCred.split(':');
    await this.verifyUser(email, password);
  }
}
