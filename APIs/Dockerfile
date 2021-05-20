FROM node:12.16-alpine

RUN apt-get update && apt-get install htop

WORKDIR /app

COPY . .

RUN npm install --no-progress

CMD ["npm","start"]
