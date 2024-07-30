import { Test, TestingModule } from '@nestjs/testing';
import { TeacherController } from './teacher.controller';
import { TeacherService } from '../services/teacher.service';
import { AuthService } from '../../shared/guards/services/auth.service';
import { ZodValidationPipe } from '../../shared/pipe/zod-validation.pipe';
import { z } from 'zod';

class MockAuthService {
  validateUser(email: string, password: string) {
    return true;
  }
  login(user: any) {
    return { access_token: 'token   ' };
  }
}

describe('TeacherController', () => {
  let controller: TeacherController;
  let teacherService: TeacherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeacherController],
      providers: [
        {
          provide: TeacherService,
          useValue: {
            createTeacher: jest.fn(),
            getTeacherByEmail: jest.fn(),
            signIn: jest.fn(),
          },
        },
        { provide: AuthService, useClass: MockAuthService },
      ],
    }).compile();

    controller = module.get<TeacherController>(TeacherController);
    teacherService = module.get<TeacherService>(TeacherService);
  });

  describe('getTeacherByEmail', () => {
    it('should return the teacher with the given email', async () => {
      const email = 'john.doe@example.com';
      const teacher = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };

      jest
        .spyOn(teacherService, 'getTeacherByEmail')
        .mockResolvedValue(teacher);

      const result = await controller.getTeacherByEmail(email);

      expect(result).toEqual(teacher);
    });
  });
});
