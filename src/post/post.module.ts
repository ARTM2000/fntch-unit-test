import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationModule } from '@app/notification/notification.module';
import { UserModule } from '@app/user/user.module';
import { PostController } from './post.controller';
import { Post } from './post.entity';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UserModule, NotificationModule],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
