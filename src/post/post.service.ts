import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { Users } from '../user/user.entity';
import { CreatePost } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async createPost(
    data: CreatePost,
    user: Users,
  ): Promise<Post> {
    const newPost = this.postRepository.create({
        title: data.title,
        content: data.content,
        user: user,
    });

    return await this.postRepository.save(newPost);
  }
}
