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
            return tasks.mocha();

          case 4:
            _context.next = 6;
            return tasks.eslint({ extend: 'eslint-config-esayemm' });

          case 6:
            _context.next = 8;
            return tasks.ci();

          case 8:
            _context.next = 10;
            return tasks.docker();

          case 10:
            _context.next = 12;
            return _taskApi2.default.addPackages({
              packages: ['jbs-node', 'babel-register', 'babel-polyfill', 'axios'],
              dev: true
            });

          case 12:
            _context.next = 14;
            return _taskApi2.default.addPackages({
              packages: ['express', 'body-parser', 'cors', 'babel-register', 'babel-polyfill', 'bunyan', 'helmet', 'morgan']
            });

          case 14:
            _context.next = 16;
            return _taskApi2.default.addToPackageJson({
              json: {
                main: './build/index.js',
                scripts: {
                  build: './node_modules/jbs-node/bin.js build --input src --output build',
                  deploy: 'npm run build && echo add deployment script here',
                  start: 'NODE_PATH=./src nodemon index.js | ./node_modules/bunyan/bin/bunyan --output short',
                  serve: 'NODE_PATH=./build node ./build'
                },
                babel: {
                  presets: ['./node_modules/jbs-node/configs/babel-preset-jbs-node.js']
                }
              }
            });

          case 16:
            _context.next = 18;
            return _taskApi2.default.addFile({
              src: _path2.default.resolve(__dirname, './templates/index.js'),
              dest: 'index.js'
            });

          case 18:
            _context.next = 20;
            return _taskApi2.default.copyDirectory({
              src: _path2.default.resolve(__dirname, './templates/src'),
              dest: './src'
            });

          case 20:
            _context.next = 22;
            return _taskApi2.default.copyDirectory({
              src: _path2.default.resolve(__dirname, './templates/test'),
              dest: './test'
            });

          case 22:
            if (!flags.git) {
              _context.next = 25;
              break;
            }

            _context.next = 25;
            return _taskApi2.default.gitInit();

          case 25:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function express(_x) {
    return _ref2.apply(this, arguments);
  }

  return express;
}();