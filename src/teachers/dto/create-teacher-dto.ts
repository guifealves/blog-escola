import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateTeacherSchema = z.object({
  name: z.string().min(1).describe('The name of the teacher'),
  email: z.string().email(),
  password: z.string().min(6),
});

export class CreateTeacherDto extends createZodDto(CreateTeacherSchema) {}
