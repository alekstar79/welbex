FROM node:16.15.0-alpine

RUN mkdir -p /opt/welbex-users-service
WORKDIR /opt/welbex-users-service
RUN adduser -S welbex
COPY package*.json ./
RUN npm install
COPY . .

RUN chown -R welbex /opt/welbex-users-service
USER welbex

EXPOSE $PG_USERS_DOCKER_PORT

CMD ["node", "index.mjs"]
