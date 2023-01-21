import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { Users } from '../user/user.entity';
import { CreatePost } from './dto/create-post.dto';
import { NotificationService } from '@app/notification/notification.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly notificationService: NotificationService,
  ) {}

  async createPost(data: CreatePost, user: Users): Promise<Post> {
    const newPost = this.postRepository.create({
      title: data.title,
      content: data.content,
      user: user,
    });

    const savedPost = await this.postRepository.save(newPost);
    this.notificationService.sendEmailForNewPost(user.email, data.title);
    return savedPost;
  }

  async getUserPosts(user: Users): Promise<Post[]> {
    const userPosts = await this.postRepository.find({ where: { user: user } });
    return userPosts;
  }

  async getSinglePost(postId: number, user: Users): Promise<Post> {
    let foundPost = await this.postRepository.findOne({
      where: { id: postId, user: user },
    });
    if (!foundPost) {
      throw new NotFoundException('Post not found');
    }
    return foundPost;
  }

  async updateSinglePost(
    data: { id: number; title: string; content: string },
    user: Users,
  ): Promise<Post> {
    let foundPost = await this.getSinglePost(data.id, user);
    foundPost = { ...foundPost, title: data.title, content: data.content };
    return this.postRepository.save(foundPost);
  }

  async deletePost(postId: number, user: Users) {
    const foundPost = await this.getSinglePost(postId, user);
    await this.postRepository.delete(foundPost);
    this.notificationService.sendEmailForDeletePost(
      user.email,
      (foundPost as Post).title,
    );
  }
}
