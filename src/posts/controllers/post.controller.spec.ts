import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from '../services/post.service';
import { IPost } from '../schemas/models/post.interface';
import { PostMongooseRepository } from '../repositories/mongoose/post.mongoose.repository';
import { PostRepository } from '../repositories/post.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '../schemas/post.schema';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';

describe('PostController', () => {
  let controller: PostController;
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        JwtModule.register({
          global: true,
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '60m' },
        }),
        MongooseModule.forRoot(process.env.MONGODB_URI),
        MongooseModule.forFeature([
          {
            name: Post.name,
            schema: PostSchema,
          },
        ]),
      ],
      controllers: [PostController],
      providers: [
        {
          provide: PostRepository,
          useClass: PostMongooseRepository,
        },
        PostService,
        AuthGuard,
      ],
    }).compile();

    controller = module.get<PostController>(PostController);
    service = module.get<PostService>(PostService);
  });

  describe('getAllPosts', () => {
    it('should return an array of posts without the content', async () => {
      const result = [
        { id: '1', title: 'Post 1', author: 'John Doe', createdAt: new Date() },
        {
          id: '2',
          title: 'Post 2',
          author: 'Jane Smith',
          createdAt: new Date(),
        },
      ];
      jest.spyOn(service, 'getAllPosts').mockResolvedValue(result);

      const expected: Partial<IPost>[] = result.map(
        ({ id, title, author, createdAt }) => ({
          id,
          title,
          author,
          createdAt,
        }),
      );

      expect(await controller.getAllPosts(10, 1)).toEqual(expected);
    });
  });

  describe('getAllPostsAdmin', () => {
    it('should return an array of posts for admin without the content', async () => {
      const result = [
        { id: '1', title: 'Post 1', author: 'John Doe', createdAt: new Date() },
        {
          id: '2',
          title: 'Post 2',
          author: 'Jane Smith',
          createdAt: new Date(),
        },
      ];
      jest.spyOn(service, 'getAllPosts').mockResolvedValue(result);

      expect(await controller.getAllPostsAdmin(10, 1)).toBe(result);
    });
  });

  describe('searchPostsByKeyword', () => {
    it('should return an array of posts matching the keyword', async () => {
      const keyword = 'nestjs';
      const result: IPost[] = [
        {
          id: '1',
          title: 'NestJS Introduction',
          content: 'Introducing NestJS',
          author: 'John Doe',
          createdAt: new Date(),
        },
        {
          id: '2',
          title: 'Advanced NestJS',
          content: 'Advancing on NestJS',
          author: 'Jane Smith',
          createdAt: new Date(),
        },
      ];
      jest.spyOn(service, 'searchPostsByKeyword').mockResolvedValue(result);

      expect(await controller.searchPostsByKeyword(keyword)).toBe(result);
    });
  });

  describe('getPostById', () => {
    it('should return a post by its id', async () => {
      const postId = '1';
      const result: IPost = {
        id: postId,
        title: 'Post 1',
        content: 'Lorem ipsum dolor sit amet',
        author: 'John Doe',
        createdAt: new Date(),
      };
      jest.spyOn(service, 'getPostById').mockResolvedValue(result);

      expect(await controller.getPostById(postId)).toBe(result);
    });
  });
});
