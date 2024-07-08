import { IPost } from 'src/posts/schemas/models/post.interface';
import { PostRepository } from '../post.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from 'src/posts/schemas/post.schema';
import { Model } from 'mongoose';

export class PostMongooseRepository implements PostRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  getAllPosts(limit: number, page: number): Promise<IPost[]> {
    const offset = (page - 1) * limit;
    return this.postModel.find().skip(offset).exec();
  }

  getPostById(id: string): Promise<IPost> {
    return this.postModel.findById(id).exec();
  }

  async createPost(post: IPost): Promise<void> {
    const createPost = new this.postModel(post);
    await createPost.save();
  }

  async updatePost(id: string, post: IPost): Promise<void> {
    await this.postModel
      .updateOne(
        { _id: id },
        { title: post.title, content: post.content, updatedAt: post.updatedAt },
      )
      .exec();
  }

  async deletePost(id: string): Promise<void> {
    await this.postModel.findByIdAndDelete(id).exec();
  }
}
