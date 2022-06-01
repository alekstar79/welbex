FROM node:16.15.0-alpine

RUN mkdir -p /opt/welbex-mailing-service
WORKDIR /opt/welbex-mailing-service
RUN adduser -S welbex
COPY package*.json ./
RUN npm install
COPY . .

RUN chown -R welbex /opt/welbex-mailing-service
USER welbex

CMD ["node", "index.mjs"]
