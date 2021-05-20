FROM node:12.16-alpine

RUN apt-get update

WORKDIR /app

COPY . .

RUN npm install --no-progress

CMD ["npm","start"]
