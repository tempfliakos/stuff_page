FROM node:lts-alpine

WORKDIR /app

COPY package.json /app/package.json

RUN npm i

CMD ["npm", "run", "dev"]