import { ApiProperty } from '@nestjs/swagger';

export class BadRequestTeacherSwagger {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string[];
}
