import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { BasicUserGuard } from 'src/common/guard/basic.guard';
import { AuthorizedRequest, GlobalResponse } from 'src/common/types';
import { CreatePost } from './dto/create-post.dto';
import { Post as PostDocument } from './post.entity';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(BasicUserGuard)
  async createPost(
    @Req() req: AuthorizedRequest,
    @Body() body: CreatePost,
  ): Promise<GlobalResponse<PostDocument>> {
    const user = req.user;
    console.log('user >>', user);
    
    const newPost = await this.postService.createPost(body, user);

    return {
      data: newPost,
    };
  }
}
