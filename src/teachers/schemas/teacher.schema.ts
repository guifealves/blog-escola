import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ITeacher } from './models/teacher.interface';
import mongoose, { HydratedDocument } from 'mongoose';

export type TeacherDocument = HydratedDocument<Teacher>;

@Schema()
export class Teacher implements ITeacher {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id?: string;
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  createdAt?: Date;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
