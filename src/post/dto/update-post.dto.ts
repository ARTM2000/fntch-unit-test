import { IsNotEmpty, IsNumberString } from 'class-validator';
import { CreatePost } from './create-post.dto';

export class UpdatePost extends CreatePost {}
export class UpdatePostParams {
  @IsNotEmpty()
  @IsNumberString()
  post_id: string;
}
