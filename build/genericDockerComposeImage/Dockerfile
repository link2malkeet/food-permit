# ====================================================================================
# Generic image for docker-compose as it doesn't use anything from real Dockerfiles
# ====================================================================================

FROM node:12-alpine

#directory which holds the application code
WORKDIR /usr/app
# Install app dependencies
COPY package*.json ./

RUN yarn


