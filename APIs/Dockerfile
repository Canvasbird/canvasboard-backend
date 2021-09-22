FROM node:latest
RUN apt-get update && apt-get install htop
WORKDIR /app
COPY . .
RUN npm install --no-progress
