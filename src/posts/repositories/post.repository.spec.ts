import { IPost } from '../schemas/models/post.interface';
import { PostRepository } from './post.repository';

describe('PostRepository', () => {
  let postRepository: PostRepository;

  beforeEach(() => {
    postRepository = new PostRepositoryImpl();
  });

  it('should return an array of posts when calling getAllPosts', async () => {
    const limit = 10;
    const page = 1;

    const result = await postRepository.getAllPosts(limit, page);

    expect(result).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(String),
          title: expect.any(String),
          author: expect.any(String),
          createdAt: expect.any(Date),
        },
      ]),
    );
  });

  it('should return an array of posts when calling getAllPostsAdmin', async () => {
    const limit = 10;
    const page = 1;

    const result = await postRepository.getAllPostsAdmin(limit, page);

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          content: expect.any(String),
          author: expect.any(String),
          createdAt: expect.any(Date),
        }),
      ]),
    );
  });

  it('should return a post when calling getPostById', async () => {
    const postId = '123';

    const result = await postRepository.getPostById(postId);

    expect(result).toEqual(
      expect.objectContaining({
        id: postId,
        title: expect.any(String),
        content: expect.any(String),
        author: expect.any(String),
        createdAt: expect.any(Date),
      }),
    );
  });
});

class PostRepositoryImpl extends PostRepository {
  async getAllPosts(
    limit: number,
    page: number,
  ): Promise<{ id: string; title: string; author: string; createdAt: Date }[]> {
    return [
      {
        id: '123',
        title: 'Test Post',
        author: 'John Doe',
        createdAt: new Date(),
      },
    ];
  }

  async getAllPostsAdmin(limit: number, page: number): Promise<IPost[]> {
    return [
      {
        id: '123',
        title: 'Test Post',
        content: 'Test content',
        author: 'John Doe',
        createdAt: new Date(),
      },
    ];
  }

  async getPostById(id: string): Promise<IPost> {
    const post = {
      id: '123',
      title: 'Test Post',
      content: 'Test content',
      author: 'John Doe',
      createdAt: new Date(),
    };
    return post;
  }

  async createPost(post: IPost): Promise<void> {}

  async updatePost(id: string, post: IPost): Promise<void> {}

  async deletePost(id: string): Promise<void> {}

  async searchPostsByKeyword(keyword: string): Promise<IPost[]> {
    const post = [
      {
        id: '123',
        title: 'Test Post',
        content: 'Test content',
        author: 'John Doe',
        createdAt: new Date(),
      },
    ];
    return post;
  }
}
