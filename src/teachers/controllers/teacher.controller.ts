import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { TeacherService } from '../services/teacher.service';
import { hash } from 'bcrypt';
import { AuthService } from '../../shared/guards/services/auth.service';
import {
  ApiExcludeEndpoint,
  ApiTags,
  ApiExtraModels,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  CreateTeacherDto,
  CreateTeacherSchema,
} from '../dto/create-teacher-dto';
import { UseZodGuard } from 'nestjs-zod';
import { SignInDto, SignInSchema } from '../dto/signIn-dto';
import { BadRequestTeacherSwagger } from '../swagger/bad-request-teacher.swagger';
import { SignInSwagger } from '../swagger/signIn-teacher.swagger';
import { UnauthorizedTeacherSwagger } from '../swagger/unauthorized-teacher.swagger';

@ApiTags('teachers')
@Controller('teachers')
export class TeacherController {
  constructor(
    private readonly teacherService: TeacherService,
    private authService: AuthService,
  ) {}

  @Post()
  @UseZodGuard('body', CreateTeacherSchema)
  @ApiExtraModels(CreateTeacherDto)
  @ApiOperation({ summary: 'Create a new Teacher' })
  @ApiResponse({
    status: 201,
    description: 'Teacher has been successfully created.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
    type: BadRequestTeacherSwagger,
  })
  async createTeacher(@Body() teacher: CreateTeacherDto) {
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
  @UseZodGuard('body', SignInSchema)
  @ApiExtraModels(SignInDto)
  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({
    status: 201,
    description: 'Token has successfully created.',
    type: SignInSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
    type: BadRequestTeacherSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
    type: UnauthorizedTeacherSwagger,
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async signIn(
    @Body()
    body: SignInDto,
  ) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return this.authService.login(user);
  }
}
