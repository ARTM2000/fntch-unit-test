import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
})
export class UserModule {}
