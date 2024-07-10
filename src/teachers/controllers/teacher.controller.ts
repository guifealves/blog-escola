import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { TeacherService } from '../services/teacher.service';
import { ITeacher } from '../schemas/models/teacher.interface';
import { hash } from 'bcrypt';
import { AuthService } from 'src/shared/guards/services/auth.service';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';

@ApiTags('teachers')
@Controller('teachers')
export class TeacherController {
  constructor(
    private readonly teacherService: TeacherService,
    private authService: AuthService,
  ) {}

  @Post()
  @ApiExcludeEndpoint()
  async createTeacher(@Body() teacher: ITeacher) {
    const hashedPassword = await hash(teacher.password, 8);
    teacher.password = hashedPassword;
    return this.teacherService.createTeacher(teacher);
  }

  @Get(':email')
  @ApiExcludeEndpoint()
  async getTeacherByEmail(@Param('email') email: string) {
    return this.teacherService.getTeacherByEmail(email);
  }

  @Post('signin')
  async signIn(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return this.authService.login(user);
  }
}
