build-data:
	docker create -v /node_modules -v /mix_deps --name react_starter_data busybox

build-client:
	docker-compose build react_starter_client

build-app:
	docker-compose build react_starter_app

build-nginx:
	docker-compose build react_starter_nginx

build-containers:
	docker-compose build

app-sh:
	docker-compose run react_starter_app /bin/bash

client-sh:
	docker-compose run react_starter_client /bin/bash

client-lint:
	docker-compose run react_starter_client make lint

client-test:
	docker-compose run react_starter_client make test

client-test-coverage:
	docker-compose run react_starter_client make test-coverage
