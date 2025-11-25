FROM node:20-alpine as base
WORKDIR /app
COPY package*.json ./

FROM base as development
RUN npm ci
COPY . .
RUN npm run build
ARG PORT=3000
ENV PORT=$PORT
EXPOSE $PORT
CMD [ "npm", "run", "dev" ]

FROM base as production
RUN npm ci --omit=dev
COPY . .
RUN npm run build
ARG PORT=3000
ENV PORT=$PORT
EXPOSE $PORT
CMD [ "npm", "run", "start" ]