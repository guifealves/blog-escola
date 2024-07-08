import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { IPost } from '../schemas/models/post.interface';

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

  // Leitura de Posts
  @Get(':id')
  async getPostById(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }

  // Criação de Postagens
  @Post()
  async createPost(@Body() post: IPost) {
    return this.postService.createPost(post);
  }

  // Edição de Postagens
  @Put(':id')
  async updatePost(@Param('id') id: string, @Body() post: IPost) {
    return this.postService.updatePost(id, post);
  }

  // Exclusão de Postagens
  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }

  // Busca de Posts
}
