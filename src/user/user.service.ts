import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { Register } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { NotificationService } from '@app/notification/notification.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly notificationService: NotificationService,
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
    this.notificationService.sendEmailForNewLogin(data.email);
    return Buffer.from(`${data.email}:${data.password}`).toString('base64');
  }

  async dangerouslyVerifyCredential(credential: string): Promise<Users> {
    const decodeCred = Buffer.from(credential, 'base64').toString('utf8');
    const [email, password] = decodeCred.split(':');
    await this.verifyUser(email, password);
    return this.findUserWithEmail(email) as Promise<Users>;
  }
}
