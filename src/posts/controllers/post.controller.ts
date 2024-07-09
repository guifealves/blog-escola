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
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { IPost } from '../schemas/models/post.interface';
import { AuthGuard } from 'src/shared/guards/auth.guard';

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
  @Get('admin')
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
  @Post()
  async createPost(@Body() post: IPost) {
    return this.postService.createPost(post);
  }

  // Edição de Postagens
  @UseGuards(AuthGuard)
  @Put(':id')
  async updatePost(@Param('id') id: string, @Body() post: IPost) {
    return this.postService.updatePost(id, post);
  }

  // Exclusão de Postagens
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }
}
