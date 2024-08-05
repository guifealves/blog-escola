import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export class SignInDto extends createZodDto(SignInSchema) {}
