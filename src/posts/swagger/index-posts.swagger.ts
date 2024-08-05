import { OmitType } from '@nestjs/swagger';
import { Post } from '../schemas/post.schema';

export class IndexPostSwagger extends OmitType(Post, [
  'content',
  'updatedAt',
]) {}
