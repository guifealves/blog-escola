FROM node:18-alpine

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm i -g pnpm

RUN pnpm build

EXPOSE 3108

CMD ["node", "dist/main.js"]