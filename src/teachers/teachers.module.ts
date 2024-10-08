import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from './schemas/teacher.schema';
import { TeacherRepository } from './repositories/teacher.repository';
import { TeacherMongooseRepository } from './repositories/mongoose/teacher.mongoose.repository';
import { TeacherService } from './services/teacher.service';
import { TeacherController } from './controllers/teacher.controller';
import { AuthService } from 'src/shared/guards/services/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Teacher.name,
        schema: TeacherSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: TeacherRepository,
      useClass: TeacherMongooseRepository,
    },
    TeacherService,
    AuthService,
  ],
  controllers: [TeacherController],
})
export class TeachersModule {}
