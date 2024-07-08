import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PostsModule,
    MongooseModule.forRoot(
      'mongodb+srv://user-blog-escola:p59fcaY82moMxrgS@blog-escola.ku8gx6v.mongodb.net/?retryWrites=true&w=majority&appName=blog-escol',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
