import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TeachersModule } from './teachers/teachers.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PostsModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    TeachersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
