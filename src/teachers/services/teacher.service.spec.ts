import { Test } from '@nestjs/testing';
import { TeacherService } from './teacher.service';
import { TeacherRepository } from '../repositories/teacher.repository';
import { create } from 'domain';
import { ITeacher } from '../schemas/models/teacher.interface';

describe('TeacherService', () => {
  let teacherService: TeacherService;
  let teacherRepository: TeacherRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TeacherService,
        {
          provide: TeacherRepository,
          useValue: {
            createTeacher: jest.fn(),
            getTeacherByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    teacherService = moduleRef.get<TeacherService>(TeacherService);
    teacherRepository = moduleRef.get<TeacherRepository>(TeacherRepository);
  });

  describe('createTeacher', () => {
    it('should create a new teacher', async () => {
      const newTeacher: ITeacher = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
      };

      const result = await teacherService.createTeacher(newTeacher);

      expect(result).toBeUndefined();
      expect(teacherRepository.createTeacher).toHaveBeenCalledWith(newTeacher);
    });
  });

  describe('getTeacherByEmail', () => {
    it('should return the teacher with the given email', async () => {
      const email = 'jane@example.com';
      const expectedTeacher: ITeacher = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
      };

      jest
        .spyOn(teacherRepository, 'getTeacherByEmail')
        .mockResolvedValue(expectedTeacher);

      const result = await teacherService.getTeacherByEmail(email);

      expect(result).toEqual(expectedTeacher);
      expect(teacherRepository.getTeacherByEmail).toHaveBeenCalledWith(email);
    });
  });
});
