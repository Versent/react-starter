FROM debian:jessie
ENV REFRESHED_AT 2015-09-20

RUN apt-get update
RUN apt-get install -y \
  locales \
  wget \
  curl \
  dnsutils \
  netcat \
  gcc

# Set the locale
RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8
RUN dpkg-reconfigure locales

RUN wget https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb && \
  dpkg -i erlang-solutions_1.0_all.deb

RUN apt-get update
RUN apt-get install -y \
  postgresql-client \
  erlang-dev \
  elixir

# Install local Elixir hex and rebar
RUN /usr/local/bin/mix local.hex --force && \
    /usr/local/bin/mix local.rebar --force

ENV APP_DIR /usr/src/app
RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR
# COPY mix.* $APP_DIR/
# RUN mix deps.get

# COPY . $APP_DIR/
# RUN MIX_ENV=prod mix phoenix.digest
