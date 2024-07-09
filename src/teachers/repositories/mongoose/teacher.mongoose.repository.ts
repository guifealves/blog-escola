import { ITeacher } from 'src/teachers/schemas/models/teacher.interface';
import { TeacherRepository } from '../teacher.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Teacher } from 'src/teachers/schemas/teacher.schema';
import { Model } from 'mongoose';

export class TeacherMongooseRepository implements TeacherRepository {
  constructor(
    @InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
  ) {}

  async createTeacher(teacher: ITeacher): Promise<void> {
    const createTeacher = new this.teacherModel(teacher);
    await createTeacher.save();
  }

  getTeacherByEmail(email: string): Promise<ITeacher> {
    return this.teacherModel.findOne({ email }).exec();
  }
}
