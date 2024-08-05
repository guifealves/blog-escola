import { OmitType } from '@nestjs/swagger';
import { Post } from '../schemas/post.schema';

export class CreatePostSwagger extends OmitType(Post, ['updatedAt']) {}
