import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { IPost } from '../schemas/models/post.interface';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { z } from 'zod';
import { ZodValidationPipe } from 'src/shared/pipe/zod-validation.pipe';

const createPostSchema = z.object({
  title: z.string(),
  content: z.string(),
  author: z.string(),
});

const updatePostSchema = z.object({
  title: z.string(),
  content: z.string(),
});

type CreatePost = z.infer<typeof createPostSchema>;

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // Lista de Posts
  @Get()
  async getAllPosts(
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    return this.postService.getAllPosts(limit, page);
  }

  // Listagem de Todas as Postagens (Visão Administrativa)
  @UseGuards(AuthGuard)
  @Get('admin')
  @ApiBearerAuth()
  async getAllPostsAdmin(
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    return this.postService.getAllPosts(limit, page);
  }

  // Busca de Posts
  @Get('search')
  async searchPostsByKeyword(@Query('keyword') keyword: string) {
    return this.postService.searchPostsByKeyword(keyword);
  }

  // Leitura de Posts
  @Get(':id')
  async getPostById(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }

  // Criação de Postagens
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createPostSchema))
  @Post()
  @ApiBearerAuth()
  async createPost(@Body() { title, content, author }: CreatePost) {
    return this.postService.createPost({ title, content, author });
  }

  // Edição de Postagens
  @UseGuards(AuthGuard)
  @Put(':id')
  @ApiBearerAuth()
  async updatePost(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updatePostSchema)) post: IPost,
  ) {
    return this.postService.updatePost(id, post);
  }

  // Exclusão de Postagens
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  async deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }
}
