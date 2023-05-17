FROM node:12.19.0-alpine3.11

USER root
RUN apk update && apk add --no-cache tzdata ca-certificates && \
    rm -rf /var/cache/apk/*
ENV TZ Australia/Melbourne

# Define environment variables
ENV APP_DIR /usr/src/app
ENV PORT 8080

# Creating Application dir
RUN mkdir -p $APP_DIR

# Defining workdir
WORKDIR $APP_DIR

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build
CMD [ "npm", "run", "start"]

EXPOSE $PORT