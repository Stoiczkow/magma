FROM node:20-alpine as builder

WORKDIR /notification_service

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:slim

USER node

WORKDIR /notification_service

COPY package*.json ./

RUN npm ci --production

COPY --from=builder /notification_service/dist ./dist

CMD [ "node", "dist/index.js" ]
