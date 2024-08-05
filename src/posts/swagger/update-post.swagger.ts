import { OmitType } from '@nestjs/swagger';
import { Post } from '../schemas/post.schema';

export class UpdatePostSwagger extends OmitType(Post, ['createdAt']) {}
