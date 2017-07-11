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

var _tasks = require('../../tasks');

var tasks = _interopRequireWildcard(_tasks);

var _taskApi = require('services/task-api');

var _taskApi2 = _interopRequireDefault(_taskApi);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref) {
    var flags = _ref.flags;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return tasks.bootstrap({ name: flags.name });

          case 2:
            _context.next = 4;
            return tasks.eslint({ extend: 'eslint-config-esayemm/lib/react' });

          case 4:
            _context.next = 6;
            return _taskApi2.default.addPackages({
              packages: ['jbs-fe', 'react-addons-test-utils', 'react', 'prop-types', 'react-css-modules', 'react-dom', 'react-helmet', 'react-router', 'react-router-dom', 'history', 'html', 'invariant', 'esayemm-styles'],
              dev: true
            });

          case 6:
            _context.next = 8;
            return _taskApi2.default.addToPackageJson({
              json: {
                main: './build/index.js',
                module: './build/index.es.js',
                scripts: {
                  build: 'BABEL_REACT=true NODE_ENV=prod NODE_PATH=./src ./node_modules/jbs-fe/bin.js build:package --input src --output build --es-input-file src/index.js --es-output-file build/index.es.js',
                  start: 'BABEL_REACT=true NODE_PATH=./example:./example/app:./src ./node_modules/jbs-fe/bin.js dev --app-index ./example/app/index.js --html-index ./example/index.html --context ./example',
                  test: 'BABEL_REACT=true NODE_ENV=test ./node_modules/jbs-fe/bin.js test --single-run',
                  'test:watch': 'BABEL_REACT=true NODE_ENV=test ./node_modules/jbs-fe/bin.js test'
                },
                babel: {
                  presets: ['./node_modules/jbs-fe/configs/babel-preset-jbs-fe.js']
                }
              }
            });

          case 8:
            _context.next = 10;
            return _taskApi2.default.shell({ command: 'mkdir src' });

          case 10:
            _context.next = 12;
            return _taskApi2.default.shell({ command: 'touch src/index.js' });

          case 12:
            _context.next = 14;
            return _taskApi2.default.copyDirectory({
              src: _path2.default.resolve(__dirname, './templates/src'),
              dest: './example'
            });

          case 14:
            if (!flags.git) {
              _context.next = 17;
              break;
            }

            _context.next = 17;
            return _taskApi2.default.gitInit();

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function reactPackage(_x) {
    return _ref2.apply(this, arguments);
  }

  return reactPackage;
}();