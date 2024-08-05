import { ApiProperty } from '@nestjs/swagger';

export class BadRequestPostSwagger {
  @ApiProperty()
  message: string[];

  @ApiProperty()
  error: string;

  @ApiProperty()
  statusCode: number;
}
