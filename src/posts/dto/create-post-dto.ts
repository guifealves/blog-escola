import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example: 'Post Title',
    description: 'The title of the post',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  readonly title: string;

  @ApiProperty({
    example: 'Post Content',
    description: 'The content of the post',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  readonly content: string;

  @ApiProperty({
    example: 'Author Name',
    description: 'The author of the post',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  readonly author: string;
}
