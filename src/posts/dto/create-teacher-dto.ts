import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTeacherDto {
  @ApiProperty({
    example: 'Teacher Name',
    description: 'The name of the teacher',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly name: string;

  @ApiProperty({
    example: 'email@email.com',
    description: 'The email of the teacher',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty({ message: 'Please enter a email' })
  readonly email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the teacher',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
