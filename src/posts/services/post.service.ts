import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import { IPost } from '../schemas/models/post.interface';
import mongoose from 'mongoose';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async getAllPosts(limit: number, page: number) {
    return this.postRepository.getAllPosts(limit, page);
  }

  async getAllPostsAdmin(limit: number, page: number) {
    return this.postRepository.getAllPostsAdmin(limit, page);
  }

  async getPostById(id: string) {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter correct post id');
    }

    const post = this.postRepository.getPostById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async createPost(post: IPost) {
    post.createdAt = new Date();
    return this.postRepository.createPost(post);
  }

  async updatePost(id: string, post: IPost) {
    post.updatedAt = new Date();
    return this.postRepository.updatePost(id, post);
  }

  async deletePost(id: string) {
    return this.postRepository.deletePost(id);
  }

  async searchPostsByKeyword(keyword: string) {
    return this.postRepository.searchPostsByKeyword(keyword);
  }
}
