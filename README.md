# Blog Escola

![Logo](https://upload.wikimedia.org/wikipedia/commons/d/d4/Fiap-logo-novo.jpg)

API para blog escolar.
Projeto de conclusão de fase da Pós Tech Full Stack Development da FIAP.

## Desafios do projeto

A faculdade FIAP propôs o desafio de criar um sistema de postagens de notícias para seus alunos.
Foram levantados os requisitos técnicos e funcionais para seu desenvolvimento.

**Requisitos funcionais**

Os seguintes endpoints REST serão implementados para a aplicação de blogging:

- GET /posts - Lista de Posts:
- Este endpoint permitirá aos alunos visualizarem uma lista de todos os posts disponíveis na página principal.
- GET /posts/ - Leitura de Posts:
- Ao acessar este endpoint com um ID específico de post, os alunos poderão ler o conteúdo completo desse post.
- POST /posts - Criação de Postagens:
- Permite que professores criem postagens. Este endpoint aceitará dados como título, conteúdo e autor no corpo da requisição.
- PUT /posts/ - Edição de Postagens:
- Usado para editar uma postagem existente. Professores deverão fornecer o ID do post que desejam editar e os novos dados no corpo da requisição.
- GET /posts/admin - Listagem de Todas as Postagens (Visão Administrativa):
- Este endpoint permitirá que professores vejam todas as postagens criadas, facilitando a gestão do conteúdo.
- DELETE /posts/ - Exclusão de Postagens:
- Permite que professores excluam uma postagem específica, usando o ID do post como parâmetro.
- GET /posts/search - Busca de Posts:
- Este endpoint permitirá a busca de posts por palavras-chave. Os usuários poderão passar uma query string com o termo de busca e o sistema retornará uma lista de posts que contêm esse termo no título ou conteúdo.

**Requisito técnico**

- Back-end em Node.js:
- Implementação do servidor usando Node.js.
- Utilização de frameworks como Express para roteamento e middleware.
- Persistência de Dados:
- Utilização de um sistema de banco de dados (por exemplo, MongoDB, PostgreSQL).
- Implementação de modelos de dados adequados para as postagens.
- Conteinerização com Docker:
- Desenvolvimento e implantação usando contêineres Docker para garantir consistência entre ambientes de desenvolvimento e produção.
- Automação com GitHub Actions:
- Configuração de workflows de CI/CD para automação de testes e deploy.
- Documentação:
- Documentação técnica detalhada do projeto, incluindo setup inicial, arquitetura da aplicação e guia de uso das APIs.
- Cobertura de Testes:
- O projeto deve garantir que pelo menos 30% do código seja coberto por testes unitários. Essa medida é essencial para assegurar a qualidade e a estabilidade do código, especialmente em funções críticas como criação, edição e exclusão de postagens.

## Instalação

Instale my-project com npm

```bash
  # Clone este repositório
  $ git clone git@github.com:guifealves/blog-escola.git

  # Acesse a pasta do projeto no terminal/cmd
  $ cd blog-escola

  # Instale as dependências
  $ npm install

  # Ou rode o app via Docker
  $ docker-compose up --build

  # Defina as variáveis de ambiente

  # Execute a aplicação em modo de desenvolvimento
  $ npm run start:dev

  # O servidor inciará na porta:3000 por padrão - acesse http://localhost:3000

```

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`PORT`

`MONGODB_URI`

`JWT_SECRET`

## Documentação dos endpoints

Para acessar a documentação, após executar o processo. Utilizar a url http://localhost:3108/api para acessar o swagger. [Documentação Swagger](http://localhost:3108/api)

## Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

**Server:** **[NestJS](https://nestjs.com/)**

**Banco de Dados:** **[MongoDB](https://www.mongodb.com/)**

- **[Docker](https://www.docker.com/)**
- **[BCrypt](https://www.npmjs.com/package/bcrypt)**
- **[DotEnv](https://www.npmjs.com/package/dotenv)**
- **[JWT](https://jwt.io/)**
- **[Eslint](https://eslint.org/)**
- **[Prettier](https://prettier.io/)**
- **[Jest](https://jestjs.io/)**
- **[Zod](https://zod.dev/)**
- **[Class Validator](https://www.npmjs.com/package/@nestjs/class-validator/v/0.13.1)**
- **[Swagger](https://swagger.io/)**

**CI/CD:** Github Actions

Todas as suas versões se encontram no documento package.json na raiz do projeto.
Instalação de dependências
Como utilizamos o NodeJs com o NestJs por padrão ele utiliza o gerenciador de dependências NPM.
Para instalar as dependências é só utilizar o comando npm i no terminal de sua escolha.

## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  npm run test
```

Para verificar a cobertura dos testes, rode o comando

```bash
  npm run test:cov
```

## Aprendizados e Desafios

- Dockerizar o processo foi um pouco complicado devido a falta de expertise do time;
- Entendimento de CI/CD com o GitHub actions;
- Aula de testes integrados muito vago, não mostrava como realizar os testes.
- Aulas de integração com banco de dados bem longas. Fazendo com que fosse moroso a continuação das aulas.
- Foi pensado em utilizar o MongoDB como responsável pela persistência de dados devido a sua facilidade em escabilidade horizontal, performance em grandes volumes de dados, indexação, Alta disponibilidade.

## Autores

- [@guilherme-fernandes](https://github.com/guifealves)
- [@alexsandro-oliveira](https://github.com/alexsandro-oliveira)
- [@carlos-henrique](https://www.github.com/carloshsamaral)
- [@eduardo-ruli](https://www.github.com/eduardopr14)
- [@vitor-hugo](https://github.com/D3Vitt1n)
