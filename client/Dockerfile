FROM node:4

ENV REFRESHED_AT 2015-09-20

RUN apt-get update
RUN apt-get install -y \
  unzip

# Upgrade NPM
RUN npm install -g npm@3

# Global utilities
RUN npm i -g ava
RUN npm i -g istanbul
RUN npm i -g jscs
RUN npm i -g webpack

############################
# Install Flow

RUN apt-get install -y \
  libelf-dev

WORKDIR /tmp/
RUN wget https://facebook.github.io/flow/downloads/flow-linux64-latest.zip
RUN unzip flow-linux64-latest.zip
RUN mv /tmp/flow/flow /usr/local/bin/flow

############################
# Prepare app directory
ENV APP_DIR /usr/src/app
RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR
