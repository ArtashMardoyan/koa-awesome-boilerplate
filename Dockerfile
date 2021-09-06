# Images from which app will built
FROM node:12-alpine

# Installing ffmpeg along with deps
RUN apk add --no-cache ffmpeg

# Installing python
RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python

# Create project directory
WORKDIR /usr/src/koa-awesome-boilerplate

# Install alpine-sdk package
RUN apk --no-cache add --update alpine-sdk
RUN wget -qO- "https://github.com/dustinblackman/phantomized/releases/download/2.1.1a/dockerized-phantomjs.tar.gz" | tar xz -C /

# Install dependencies
COPY package.json ./
RUN yarn install --production
RUN npm i -g sequelize-cli@6
RUN npm i -g pg

# Bind project source
COPY . .

# Command to run app
CMD [ "yarn", "start" ]
