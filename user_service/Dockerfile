FROM node:20-alpine as builder

WORKDIR /user_service

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:slim

USER node

WORKDIR /user_service

COPY package*.json ./

RUN npm ci --production

COPY --from=builder /user_service/dist ./dist

CMD [ "node", "dist/server.js" ]
