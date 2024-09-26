import { ApiProperty } from '@nestjs/swagger';

export class SignInSwagger {
  @ApiProperty()
  access_token: string;
  
  @ApiProperty()
  user_id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email : string;
}
