import { Injectable, NotFoundException } from '@nestjs/common';
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

  async createPost(data: CreatePost, user: Users): Promise<Post> {
    const newPost = this.postRepository.create({
      title: data.title,
      content: data.content,
      user: user,
    });

    return await this.postRepository.save(newPost);
  }

  async getUserPosts(user: Users): Promise<Post[]> {
    const userPosts = await this.postRepository.find({ where: { user: user } });
    return userPosts;
  }

  async updateSinglePost(
    data: { id: number; title: string; content: string },
    user: Users,
  ): Promise<Post> {
    let foundPost = await this.postRepository.findOne({
      where: { id: data.id, user: user },
    });
    if (!foundPost) {
      throw new NotFoundException('Post not found');
    }
    foundPost = { ...foundPost, title: data.title, content: data.content };
    return this.postRepository.save(foundPost);
  }
}
