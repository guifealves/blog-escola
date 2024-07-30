import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PostService } from './post.service';
import { PostRepository } from '../repositories/post.repository';
import { IPost } from '../schemas/models/post.interface';

describe('PostService', () => {
  let postService: PostService;
  let postRepository: PostRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: PostRepository,
          useValue: {
            getAllPosts: jest.fn(),
            getAllPostsAdmin: jest.fn(),
            getPostById: jest.fn(),
            createPost: jest.fn(),
            updatePost: jest.fn(),
            deletePost: jest.fn(),
            searchPostsByKeyword: jest.fn(),
          },
        },
      ],
    }).compile();

    postService = moduleRef.get<PostService>(PostService);
    postRepository = moduleRef.get<PostRepository>(PostRepository);
  });

  describe('getAllPosts', () => {
    it('should return an array of posts', async () => {
      const limit = 10;
      const page = 1;
      const expectedPosts: {
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

      jest
        .spyOn(postRepository, 'getAllPosts')
        .mockResolvedValue(expectedPosts);

      const result = await postService.getAllPosts(limit, page);

      expect(result).toEqual(expectedPosts);
      expect(postRepository.getAllPosts).toHaveBeenCalledWith(limit, page);
    });
  });

  describe('getAllPostsAdmin', () => {
    it('should return an array of posts for admin', async () => {
      const limit = 10;
      const page = 1;
      const expectedPosts: IPost[] = [
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

      jest
        .spyOn(postRepository, 'getAllPostsAdmin')
        .mockResolvedValue(expectedPosts);

      const result = await postService.getAllPostsAdmin(limit, page);

      expect(result).toEqual(expectedPosts);
      expect(postRepository.getAllPostsAdmin).toHaveBeenCalledWith(limit, page);
    });
  });

  describe('getPostById', () => {
    it('should return a post by ID', async () => {
      const id = '507f1f77bcf86cd799439011';
      const expectedPost: IPost = {
        id: id,
        title: 'Post 1',
        content: 'Lorem ipsum',
        author: 'John Doe',
        createdAt: new Date(),
      };

      jest.spyOn(postRepository, 'getPostById').mockResolvedValue(expectedPost);

      const result = await postService.getPostById(id);

      expect(result).toEqual(expectedPost);
      expect(postRepository.getPostById).toHaveBeenCalledWith(id);
    });
  });

  describe('createPost', () => {
    it('should create a new post', async () => {
      const post: IPost = {
        title: 'New Post',
        content: 'Lorem ipsum',
        author: 'John Doe',
      };

      const result = await postService.createPost(post);

      expect(result).toBeUndefined();
      expect(postRepository.createPost).toHaveBeenCalledWith(post);
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

      const result = await postService.updatePost(id, post);

      expect(result).toBeUndefined();
      expect(postRepository.updatePost).toHaveBeenCalledWith(id, post);
    });
  });

  describe('deletePost', () => {
    it('should delete an existing post', async () => {
      const id = '1';

      const result = await postService.deletePost(id);

      expect(result).toBeUndefined();
      expect(postRepository.deletePost).toHaveBeenCalledWith(id);
    });
  });

  describe('searchPostsByKeyword', () => {
    it('should return an array of posts matching the keyword', async () => {
      const keyword = 'keyword';
      const expectedPosts: IPost[] = [
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

      jest
        .spyOn(postRepository, 'searchPostsByKeyword')
        .mockResolvedValue(expectedPosts);

      const result = await postService.searchPostsByKeyword(keyword);

      expect(result).toEqual(expectedPosts);
      expect(postRepository.searchPostsByKeyword).toHaveBeenCalledWith(keyword);
    });
  });
});
