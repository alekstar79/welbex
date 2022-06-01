FROM node:16.15.0-alpine

RUN mkdir -p /opt/welbex-records-service
WORKDIR /opt/welbex-records-service
RUN adduser -S welbex
COPY package*.json ./
RUN npm install
COPY . .

RUN chown -R welbex /opt/welbex-records-service
USER welbex

EXPOSE $PG_RECORDS_DOCKER_PORT

CMD ["node", "index.mjs"]
