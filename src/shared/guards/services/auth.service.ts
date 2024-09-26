import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TeacherService } from '../../../teachers/services/teacher.service';
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
      const { ...result } = teacher;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    const userId = user._doc._id;
    const userName = user._doc.name;
    const userEmail = user._doc.email;
    return {
      access_token: this.jwtService.sign(payload),
      user_id : userId,
      name : userName,
      email : userEmail
    };
  }
}
