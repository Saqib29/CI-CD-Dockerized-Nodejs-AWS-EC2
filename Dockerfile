FROM node:20-alpine as base
WORKDIR /app
COPY package*.json ./

FROM base as development
RUN npm ci
COPY . .
ARG PORT=3000
ENV PORT=$PORT
EXPOSE $PORT
CMD [ "npm", "run", "dev:docker-run" ]

FROM base as production
RUN npm ci --omit=dev
COPY . .
ARG PORT=3000
ENV PORT=$PORT
EXPOSE $PORT
CMD [ "npm", "run", "start:docker-run" ]