FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm i --silent

COPY . .

EXPOSE ${PORT}

CMD npm start:dev