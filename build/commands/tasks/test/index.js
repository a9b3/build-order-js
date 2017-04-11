'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _allowedTypes = require('../allowed-types.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * buildorderType
 * default   - mocha/expect
 * frontend  - mocha/expect/sinon, karma, webpack
 * react     - mocha/expect/sinon, karma, webpack, enzyme
 */
exports.default = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref) {
    var _ref$flags = _ref.flags;
    _ref$flags = _ref$flags === undefined ? {} : _ref$flags;
    var _ref$flags$buildorder = _ref$flags.buildorderType,
        buildorderType = _ref$flags$buildorder === undefined ? 'default' : _ref$flags$buildorder,
        taskApi = _ref.taskApi;
    var packages, scripts;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _invariant2.default)(!!~_allowedTypes.allowedTypes.indexOf(buildorderType), '--test-type must be one of these values \'' + _allowedTypes.allowedTypes + '\'');

            /*
             * npm packages
             */
            packages = {
              default: ['babel-register', 'babel-polyfill', 'mocha', 'expect']
            };

            packages.frontend = ['mocha', 'expect',
            /* need to use this for import style */
            'sinon@2.0.0-pre.3', 'karma', 'karma-chrome-launcher', 'karma-phantomjs-launcher', 'karma-mocha', 'karma-mocha-reporter', 'karma-sourcemap-loader', 'karma-webpack'];
            packages.react = packages.frontend.concat(['enzyme']);

            _context.next = 6;
            return taskApi.addPackages({
              packages: packages[buildorderType] || packages.default,
              dev: true
            });

          case 6:

            /*
             * package.json
             */
            scripts = {
              default: {
                'test': 'NODE_ENV=test ./node_modules/mocha/bin/mocha --compilers js:babel-register --require babel-polyfill $(find . -name \'*.spec.js\' ! -ipath \'*node_modules*\')',
                'test:watch': 'NODE_ENV=test ./node_modules/mocha/bin/mocha --compilers js:babel-register --require babel-polyfill --watch $(find . -name \'*.spec.js\' ! -ipath \'*node_modules*\')'
              }
            };

            scripts.frontend = {
              'test': 'NODE_ENV=test ./node_modules/karma/bin/karma start --single-run',
              'test:watch': 'NODE_ENV=test ./node_modules/karma/bin/karma start'
            };
            scripts.react = scripts.frontend;

            _context.next = 11;
            return taskApi.addToPackageJson({
              json: {
                scripts: scripts[buildorderType] || scripts.default
              }
            });

          case 11:
            if (!(['frontend', 'react'].indexOf(buildorderType) > -1)) {
              _context.next = 19;
              break;
            }

            if (!(buildorderType === 'react')) {
              _context.next = 15;
              break;
            }

            _context.next = 15;
            return taskApi.copyDirectory({
              src: _path2.default.resolve(__dirname, './templates/frontend/test'),
              dest: './test'
            });

          case 15:
            _context.next = 17;
            return taskApi.templateFile({
              src: _path2.default.resolve(__dirname, './templates/frontend/karma.conf.js'),
              args: {
                buildorderType: buildorderType
              },
              dest: 'karma.conf.js'
            });

          case 17:
            _context.next = 21;
            break;

          case 19:
            _context.next = 21;
            return taskApi.copyDirectory({
              src: _path2.default.resolve(__dirname, './templates/mocha/test'),
              dest: './test'
            });

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function test(_x) {
    return _ref2.apply(this, arguments);
  }

  return test;
}();