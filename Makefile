NODE_PATH := ./src
BUILD_DIR := ./build

all: help

help:
	@echo ""
	@echo "  deps         - Installs dependencies"
	@echo "  lint         - Runs linter"
	@echo "  test         - Runs tests"
	@echo "  test.watch   - TDD"
	@echo "  build        - Transpile source code"
	@echo "  deploy.patch - Deploys to npm registry"
	@echo "  deploy.minor - Deploys to npm registry"
	@echo "  deploy.major - Deploys to npm registry"
	@echo ""

deps:
	@yarn

test:
	@APP_ENV=test ./node_modules/mocha/bin/mocha \
		--compilers js:babel-register \
		--require babel-polyfill \
		$$(find . -name '*.spec.js' ! -ipath '*node_modules*' ! -ipath '*$(BUILD_DIR)*')

test.watch:
	@APP_ENV=test ./node_modules/mocha/bin/mocha \
		--compilers js:babel-register \
		--require babel-polyfill \
		--watch \
		$$(find . -name '*.spec.js' ! -ipath '*node_modules*' ! -ipath '*$(BUILD_DIR)*')

lint:
	@./node_modules/eslint/bin/eslint.js .

build:
	@rm -rf $(BUILD_DIR)
	@./node_modules/jbs-node/bin.js build --input src --output $(BUILD_DIR)

deploy.%: test lint build
	@npm version $*
	@npm publish
	@git add . && git push && git push --tags
