import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BasicUserGuard } from 'src/common/guard/basic.guard';
import { AuthorizedRequest, GlobalResponse } from 'src/common/types';
import { CreatePost } from './dto/create-post.dto';
import { UpdatePost, UpdatePostParams } from './dto/update-post.dto';
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
    const newPost = await this.postService.createPost(body, user);

    return {
      message: 'New post created!',
      data: newPost,
    };
  }

  @Get()
  @UseGuards(BasicUserGuard)
  async getUserPosts(
    @Req() req: AuthorizedRequest,
  ): Promise<GlobalResponse<PostDocument[]>> {
    const user = req.user;
    const posts = await this.postService.getUserPosts(user);

    return {
      data: posts,
    };
  }

  @Put(':post_id')
  @UseGuards(BasicUserGuard)
  async updateSinglePost(
    @Req() req: AuthorizedRequest,
    @Body() body: UpdatePost,
    @Param() param: UpdatePostParams,
  ): Promise<GlobalResponse<PostDocument>> {
    const user = req.user;
    const updatedPost = await this.postService.updateSinglePost(
      {
        id: +param.post_id,
        ...body,
      },
      user,
    );

    return {
      message: 'Post updated!',
      data: updatedPost,
    };
  }

  @Delete(':post_id')
  @UseGuards(BasicUserGuard)
  async deleteSinglePost(
    @Req() req: AuthorizedRequest,
    @Param() param: UpdatePostParams,
  ): Promise<GlobalResponse<{}>> {
    const user = req.user;
    await this.postService.deletePost(+param.post_id, user);

    return {
      message: 'Post deleted!',
      data: {},
    };
  }
}
