FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN apk add --no-cache python3 make g++ && \
    npm ci && \
    apk del python3 make g++

COPY app.js .

EXPOSE 3000

CMD ["npm", "start"]
