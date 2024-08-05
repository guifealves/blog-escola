import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ITeacher } from './models/teacher.interface';
import mongoose, { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type TeacherDocument = HydratedDocument<Teacher>;

@Schema()
export class Teacher implements ITeacher {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  @ApiProperty()
  id?: string;

  @Prop({ required: true })
  @ApiProperty()
  name: string;

  @Prop({ unique: true, required: true })
  @ApiProperty()
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  @ApiProperty()
  createdAt?: Date;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
