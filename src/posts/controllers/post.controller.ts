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
import { AuthGuard } from '../../shared/guards/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePostDto } from '../dto/create-post-dto';
import { UpdatePostDto } from '../dto/update-post-dto';
import { IndexPostSwagger } from '../swagger/index-posts.swagger';
import { CreatePostSwagger } from '../swagger/create-posts.swagger';
import { ShowPostSwagger } from '../swagger/show-posts.swagger';
import { UpdatePostSwagger } from '../swagger/update-post.swagger';
import { BadRequestPostSwagger } from '../swagger/bad-request-post.swagger';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // Lista de Posts
  @Get()
  @ApiOperation({ summary: 'List all posts' })
  @ApiResponse({
    status: 200,
    description: 'Posts found.',
    type: IndexPostSwagger,
    isArray: true,
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async getAllPosts(
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    return this.postService.getAllPosts(limit, page);
  }

  // Listagem de Todas as Postagens (Visão Administrativa)
  @UseGuards(AuthGuard)
  @Get('admin')
  @ApiOperation({ summary: 'Get post by ID' })
  @ApiResponse({
    status: 200,
    description: 'Posts found.',
    type: ShowPostSwagger,
    isArray: true,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiBearerAuth()
  async getAllPostsAdmin(
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    return this.postService.getAllPostsAdmin(limit, page);
  }

  // Busca de Posts
  @Get('search')
  @ApiOperation({ summary: 'Search posts by keyword' })
  @ApiResponse({
    status: 200,
    description: 'Post found.',
    type: ShowPostSwagger,
    isArray: true,
  })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async searchPostsByKeyword(@Query('keyword') keyword: string) {
    return this.postService.searchPostsByKeyword(keyword);
  }

  // Leitura de Posts
  @Get(':id')
  @ApiOperation({ summary: 'Get post by ID' })
  @ApiResponse({
    status: 200,
    description: 'Post found.',
    type: ShowPostSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
    type: BadRequestPostSwagger,
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async getPostById(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }

  // Criação de Postagens
  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({
    status: 201,
    description: 'Post has been successfully created.',
    type: CreatePostSwagger,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
    type: BadRequestPostSwagger,
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiBearerAuth()
  async createPost(@Body() post: CreatePostDto) {
    return await this.postService.createPost(post);
  }

  // Edição de Postagens
  @UseGuards(AuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update post by ID' })
  @ApiResponse({
    status: 200,
    description: 'Post has been successfully updated.',
    type: UpdatePostSwagger,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiBearerAuth()
  async updatePost(
    @Param('id') id: string,
    @Body() { title, content, author }: UpdatePostDto,
  ) {
    return this.postService.updatePost(id, { title, content, author });
  }

  // Exclusão de Postagens
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete post by ID' })
  @ApiResponse({
    status: 200,
    description: 'Post has been successfully deleted.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiBearerAuth()
  async deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }
}
