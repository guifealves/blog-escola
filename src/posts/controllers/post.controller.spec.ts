import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from '../services/post.service';
import { IPost } from '../schemas/models/post.interface';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

class MockJwtService {
  sign(payload: any) {
    return 'mockJwtToken';
  }
  verify(token: string) {
    return { userId: 'mockUserId' };
  }
}

class MockJwtAuthGuard {
  canActivate(context) {
    return true;
  }
}

describe('PostController', () => {
  let controller: PostController;
  let postService: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: PostService,
          useValue: {
            getAllPosts: jest.fn(),
            getAllPostsAdmin: jest.fn(),
            searchPostsByKeyword: jest.fn(),
            getPostById: jest.fn(),
            createPost: jest.fn(),
            updatePost: jest.fn(),
            deletePost: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useClass: MockJwtService,
        },
        {
          provide: APP_GUARD,
          useClass: MockJwtAuthGuard,
        },
      ],
    }).compile();

    controller = module.get<PostController>(PostController);
    postService = module.get<PostService>(PostService);
  });

  describe('getAllPosts', () => {
    it('should return an array of posts', async () => {
      const limit = 10;
      const page = 1;
      const result: {
        id: string;
        title: string;
        author: string;
        createdAt: Date;
      }[] = [
        { id: '1', title: 'Post 1', author: 'John Doe', createdAt: new Date() },
        {
          id: '2',
          title: 'Post 2',
          author: 'Jane Smith',
          createdAt: new Date(),
        },
      ];
      jest.spyOn(postService, 'getAllPosts').mockResolvedValue(result);

      const posts = await controller.getAllPosts(limit, page);

      expect(posts).toEqual(result);
      expect(postService.getAllPosts).toHaveBeenCalledWith(limit, page);
    });
  });

  describe('getAllPostsAdmin', () => {
    it('should return an array of posts for admin', async () => {
      const limit = 10;
      const page = 1;
      const result: IPost[] = [
        {
          id: '1',
          title: 'Post 1',
          content: 'Lorem ipsum',
          author: 'John Doe',
          createdAt: new Date(),
        },
        {
          id: '2',
          title: 'Post 2',
          content: 'Lorem ipsum',
          author: 'Jane Smith',
          createdAt: new Date(),
        },
      ];
      jest.spyOn(postService, 'getAllPostsAdmin').mockResolvedValue(result);

      const posts = await controller.getAllPostsAdmin(limit, page);

      expect(posts).toEqual(result);
      expect(postService.getAllPostsAdmin).toHaveBeenCalledWith(limit, page);
    });
  });

  describe('searchPostsByKeyword', () => {
    it('should return an array of posts matching the keyword', async () => {
      const result: IPost[] = [
        {
          id: '1',
          title: 'Post 1',
          content: 'Lorem ipsum',
          author: 'John Doe',
          createdAt: new Date(),
        },
        {
          id: '2',
          title: 'Post 2',
          content: 'Lorem ipsum',
          author: 'Jane Smith',
          createdAt: new Date(),
        },
      ];
      jest.spyOn(postService, 'searchPostsByKeyword').mockResolvedValue(result);

      const posts = await controller.searchPostsByKeyword('keyword');

      expect(posts).toEqual(result);
      expect(postService.searchPostsByKeyword).toHaveBeenCalledWith('keyword');
    });
  });

  describe('getPostById', () => {
    it('should return a post by id', async () => {
      const id = '1';
      const result: IPost = {
        id: '1',
        title: 'Post 1',
        content: 'Lorem ipsum',
        author: 'John Doe',
        createdAt: new Date(),
      };
      jest.spyOn(postService, 'getPostById').mockResolvedValue(result);

      const post = await controller.getPostById(id);

      expect(post).toEqual(result);
      expect(postService.getPostById).toHaveBeenCalledWith(id);
    });
  });

  describe('createPost', () => {
    it('should create a new post', async () => {
      const post: IPost = {
        title: 'New Post',
        content: 'Lorem ipsum',
        author: 'John Doe',
      };

      const result = await controller.createPost(post);

      expect(result).toBeUndefined();
      expect(postService.createPost).toHaveBeenCalledWith(post);
    });
  });

  describe('updatePost', () => {
    it('should update an existing post', async () => {
      const id = '1';
      const post = {
        title: 'Updated Post',
        content: 'Lorem ipsum',
        author: '',
      };

      const result = await controller.updatePost(id, post);

      expect(result).toBeUndefined();
      expect(postService.updatePost).toHaveBeenCalledWith(id, post);
    });
  });

  describe('deletePost', () => {
    it('should delete an existing post', async () => {
      const id = '1';
      const result = await controller.deletePost(id);

      expect(result).toBeUndefined();
      expect(postService.deletePost).toHaveBeenCalledWith(id);
    });
  });
});
