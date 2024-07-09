import { ITeacher } from '../schemas/models/teacher.interface';

export abstract class TeacherRepository {
  abstract createTeacher(teacher: ITeacher): Promise<void>;
  abstract getTeacherByEmail(email: string): Promise<ITeacher>;
}
