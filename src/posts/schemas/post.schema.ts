import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IPost } from './models/post.interface';
import mongoose, { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post implements IPost {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  @ApiProperty()
  id?: string;

  @Prop()
  @ApiProperty()
  title: string;

  @Prop()
  @ApiProperty()
  content: string;

  @Prop()
  @ApiProperty()
  author: string;

  @Prop()
  @ApiProperty()
  createdAt?: Date;

  @Prop()
  @ApiProperty()
  updatedAt?: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
