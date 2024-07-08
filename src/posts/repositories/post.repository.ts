import { IPost } from '../schemas/models/post.interface';

export abstract class PostRepository {
  abstract getAllPosts(limit: number, page: number): Promise<IPost[]>;
  abstract getPostById(id: string): Promise<IPost>;
  abstract createPost(post: IPost): Promise<void>;
  abstract updatePost(id: string, post: IPost): Promise<void>;
  abstract deletePost(id: string): Promise<void>;
  abstract searchPostsByKeyword(keyword: string): Promise<IPost[]>;
}
