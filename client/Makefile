# Starts the server
serve:
	node index.js

# Run lint task for front end
lint:
	./node_modules/.bin/jscs ./src/** --verbose

# Check types on front end
types:
	flow check

# Run FE unit tests
test-unit:
	./node_modules/.bin/mocha --recursive ./src/\**/*.test.*

