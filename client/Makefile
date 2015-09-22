# Starts the server
serve:
	npm start

# Run lint task for front end
lint:
	jscs --verbose ./src/*

test:
	ava ./src/**/*.test.js

test-coverage:
	istanbul cover ava ./src/**/*.test.js

# Check types on front end
types:
	flow check

.PHONY: coverage test
