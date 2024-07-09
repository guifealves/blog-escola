import { Injectable } from '@nestjs/common';
import { TeacherRepository } from '../repositories/teacher.repository';

@Injectable()
export class TeacherService {
  constructor(private readonly teacherRepository: TeacherRepository) {}

  async createTeacher(teacher) {
    teacher.createdAt = new Date();
    return this.teacherRepository.createTeacher(teacher);
  }

  async getTeacherByEmail(email: string) {
    return this.teacherRepository.getTeacherByEmail(email);
  }
}
