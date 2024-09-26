import { ObjectId } from 'mongoose';

export interface ITeacher {
  id?: ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
}
