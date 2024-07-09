import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TeacherService } from 'src/teachers/services/teacher.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private teacherService: TeacherService,
  ) {}

  async validateUser(email: string, password: string) {
    const teacher = await this.teacherService.getTeacherByEmail(email);

    if (teacher && (await bcrypt.compare(password, teacher.password))) {
      const { password, ...result } = teacher;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
