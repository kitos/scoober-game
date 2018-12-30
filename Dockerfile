FROM node:11-alpine

WORKDIR /app
ADD . /app

RUN npm ci
RUN npm run build
RUN rm -rf node_modules

WORKDIR /app/src/server

RUN npm ci
RUN npm run build
RUN rm -rf node_modules
RUN npm ci --production

CMD ["npm", "start"]
