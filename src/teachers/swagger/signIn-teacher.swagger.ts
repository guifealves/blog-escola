import { ApiProperty } from '@nestjs/swagger';

export class SignInSwagger {
  @ApiProperty()
  access_token: string;
}
