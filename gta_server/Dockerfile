FROM node:18.15-alpine

WORKDIR /app

COPY package.json /app/package.json

RUN npm i

CMD ["npm", "run", "dev"]