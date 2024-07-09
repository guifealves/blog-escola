import { Injectable, NotFoundException } from '@nestjs/common';
import { TeacherRepository } from '../repositories/teacher.repository';

@Injectable()
export class TeacherService {
  constructor(private readonly teacherRepository: TeacherRepository) {}

  async createTeacher(teacher) {
    teacher.createdAt = new Date();
    return this.teacherRepository.createTeacher(teacher);
  }

  async getTeacherByEmail(email: string) {
    const teacher = this.teacherRepository.getTeacherByEmail(email);
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }
    return teacher;
  }
}
