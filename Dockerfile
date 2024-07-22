# Build stage
FROM node:lts-alpine AS builder
 
USER node
RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node .  .

RUN npm install

RUN npm  run  build

CMD ["npm", "run", "start:prod"]
