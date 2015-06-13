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
	./node_modules/.bin/mocha --recursive --opts ./spec/mocha.opts ./src/\**/*.test.*

# Run FE integration tests
test-int-run:
	./node_modules/.bin/nightwatch

# Run FE integration tests
# fe-test-int-all:
# 	./node_modules/.bin/sake fe:test:int:all

# # Run FE Integration tests on CI
# fe-test-int-all-ci:
# 	./support/ci/run-fe-tests-int.sh


