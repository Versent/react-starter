#!/bin/sh
echo "Staring Application"

mix deps.get

until nc -z $DB_HOST $DB_PORT; do
  echo "Waiting for DB container at $DB_HOST $DB_PORT"
  nslookup $DB_HOST
  sleep 2
done

mix ecto.create
mix ecto.migrate

mix phoenix.server
