import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({
    example: 'Post Title',
    description: 'The title of the post',
    required: false,
  })
  @IsString()
  @MinLength(5)
  @IsOptional()
  readonly title?: string;

  @ApiProperty({
    example: 'Post Content',
    description: 'The content of the post',
    required: false,
  })
  @IsString()
  @MinLength(10)
  @IsOptional()
  readonly content?: string;

  @ApiProperty({
    example: 'Author Name',
    description: 'The author of the post',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MinLength(5)
  readonly author?: string;
}
