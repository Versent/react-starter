FROM node:4

ENV REFRESHED_AT 2015-09-20

RUN npm i -g webpack
RUN npm i -g jscs

############################
ENV APP_DIR /usr/src/app
RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR
