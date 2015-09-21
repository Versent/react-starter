# Starts the server
serve:
	npm start

# Run lint task for front end
lint:
	./node_modules/.bin/jscs --verbose ./src/*

test:
	./node_modules/.bin/ava ./src/**/*.test.js

coverage:
	./node_modules/.bin/istanbul cover ./node_modules/.bin/ava ./src/**/*.test.js

# Check types on front end
types:
	flow check

.PHONY: coverage test
