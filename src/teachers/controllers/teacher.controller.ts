import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { TeacherService } from '../services/teacher.service';
import { hash } from 'bcrypt';
import { AuthService } from '../../shared/guards/services/auth.service';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { z } from 'zod';
import { ZodValidationPipe } from '../../shared/pipe/zod-validation.pipe';

const createTeacherSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type CreateTeacher = z.infer<typeof createTeacherSchema>;
type SignIn = z.infer<typeof signInSchema>;

@ApiTags('teachers')
@Controller('teachers')
export class TeacherController {
  constructor(
    private readonly teacherService: TeacherService,
    private authService: AuthService,
  ) {}

  @Post()
  @ApiExcludeEndpoint()
  @UsePipes(new ZodValidationPipe(createTeacherSchema))
  async createTeacher(@Body() teacher: CreateTeacher) {
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
  async signIn(
    @Body(new ZodValidationPipe(signInSchema))
    body: SignIn,
  ) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return this.authService.login(user);
  }
}
