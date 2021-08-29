# Stage 1 based 
FROM node:latest as build

RUN apt-get update && apt-get install htop

WORKDIR /app

COPY package.json /app
RUN npm install

COPY . .
RUN npm install --no-progress

#Stage 2 using distroless base image
FROM gcr.io/distroless/nodejs:latest
WORKDIR /app

# Copy from 
COPY --from=build /app /app

#Changing user to non root
USER 1000


CMD ["npm","start"]
