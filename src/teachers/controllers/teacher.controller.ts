import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TeacherService } from '../services/teacher.service';
import { ITeacher } from '../schemas/models/teacher.interface';
import { hash } from 'bcrypt';

@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  async createTeacher(@Body() teacher: ITeacher) {
    const hashedPassword = await hash(teacher.password, 8);
    teacher.password = hashedPassword;
    return this.teacherService.createTeacher(teacher);
  }

  @Get(':email')
  async getTeacherByEmail(@Param('email') email: string) {
    return this.teacherService.getTeacherByEmail(email);
  }
}
