FROM ubuntu:utopic

# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt-get update
# RUN apt-get -y dist-upgrade
RUN apt-get install -y build-essential \
	wget \
	git \
	software-properties-common \
	python-software-properties \
	default-jre

# default-jre = java for selenium

# Install Xvfb for FE integration testing
RUN apt-get install -y x11vnc \
	xvfb \
	x11-xkb-utils \
	xserver-xorg-core \
	xfonts-100dpi xfonts-75dpi xfonts-scalable xfonts-cyrillic

RUN apt-get install -y firefox

######################
# Install IOJS
######################
WORKDIR $HOME
ENV IOJS_VERSION 2.0.1
RUN wget https://iojs.org/dist/v$IOJS_VERSION/iojs-v$IOJS_VERSION-linux-x64.tar.gz
RUN tar zxf iojs-v$IOJS_VERSION-linux-x64.tar.gz
ENV PATH $HOME/iojs-v$IOJS_VERSION-linux-x64/bin:$PATH

######################
# Create app directory
######################
ENV APP_HOME /usr/src/app
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

######################
# Install NPM packages
######################

# Docker will install everything below each time
# the package.json changes
COPY package.json $APP_HOME/
RUN test -e $APP_HOME/package.json
RUN npm install

######################
# Copy Application
######################
COPY . $APP_HOME

CMD [ "npm", "start" ]
