FROM node:4

ENV REFRESHED_AT 2015-09-20

# Upgrade NPM
RUN npm install -g npm@3

# Global utilities
RUN npm i -g ava
RUN npm i -g istanbul
RUN npm i -g jscs
RUN npm i -g webpack

############################
ENV APP_DIR /usr/src/app
RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR
