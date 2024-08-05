import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedTeacherSwagger {
  @ApiProperty()
  message: string;

  @ApiProperty()
  statusCode: number;
}
