NODE_PATH := ./src
BUILD_DIR := ./build

all: help

help:
	@echo ""
	@echo "  deps         - Installs dependencies"
	@echo "  lint         - Runs linter"
	@echo "  lint.fix     - Runs linter with fix"
	@echo "  test         - Runs tests"
	@echo "  test.watch   - TDD"
	@echo "  build        - Transpile source code"
	@echo "  deploy.patch - Deploys to npm registry"
	@echo "  deploy.minor - Deploys to npm registry"
	@echo "  deploy.major - Deploys to npm registry"
	@echo ""

.PHONY: deps
deps:
	@yarn

.PHONY: test
test:
	@APP_ENV=test ./node_modules/mocha/bin/mocha \
		--compilers js:babel-register \
		--require babel-polyfill \
		$$(find . -name '*.spec.js' ! -ipath '*node_modules*' ! -ipath '*$(BUILD_DIR)*' ! -ipath '*templates*')

.PHONY: test.watch
test.watch:
	@APP_ENV=test ./node_modules/mocha/bin/mocha \
		--compilers js:babel-register \
		--require babel-polyfill \
		--watch \
		$$(find . -name '*.spec.js' ! -ipath '*node_modules*' ! -ipath '*$(BUILD_DIR)*' ! -ipath '*templates*')

.PHONY: lint
lint:
	@./node_modules/eslint/bin/eslint.js .

.PHONY: lint.fix
lint.fix:
	@./node_modules/eslint/bin/eslint.js . --fix

.PHONY: build
build:
	@rm -rf $(BUILD_DIR)
	@./node_modules/jbs-node/bin.js build --input src --output $(BUILD_DIR)

.PHONY: deploy.%
deploy.%: lint build
	@npm version $*
	@npm publish
	@git add . && git push && git push --tags
