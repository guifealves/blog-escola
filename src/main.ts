import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { patchNestJsSwagger } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  const configSwagger = new DocumentBuilder()
    .setTitle('Blog Escola API')
    .setDescription(
      'Este é um exemplo de servidor baseado no Tech Challenge da turma 1FSDT - Full Stack Development da FIAP para o módulo de backend, onde o objetivo do desafio foi criar um sistema de postagens de notícias dos Professores cadastrados para seus alunos.A API permite a criação, leitura, atualização e exclusão de posts, além de gerenciamento de professores cadastrados. Esta API foi projetada para facilitar a interação com o blog escolar, proporcionando um meio simples e eficiente para acessar e manipular conteúdos.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  patchNestJsSwagger();

  const documentSwagger = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, documentSwagger);

  await app.listen(Number(process.env.PORT) || 3000);
}
bootstrap();
