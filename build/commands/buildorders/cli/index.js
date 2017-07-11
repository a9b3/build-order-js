'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _taskApi = require('services/task-api');

var _taskApi2 = _interopRequireDefault(_taskApi);

var _tasks = require('../../tasks');

var tasks = _interopRequireWildcard(_tasks);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref) {
    var _bin;

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
            return _taskApi2.default.addPackages({
              packages: ['app-module-path']
            });

          case 8:
            _context.next = 10;
            return _taskApi2.default.addPackages({
              packages: ['jbs-node', 'babel-register', 'babel-polyfill'],
              dev: true
            });

          case 10:
            _context.next = 12;
            return _taskApi2.default.addToPackageJson({
              json: {
                scripts: {
                  build: './node_modules/jbs-node/bin.js build --input src --output build',
                  preversion: 'npm run lint && npm run test',
                  version: 'npm run build && npm publish',
                  postversion: 'git add . && git push && git push --tags'
                },
                babel: {
                  presets: ['./node_modules/jbs-node/configs/babel-preset-jbs-node.js']
                },
                preferGlobal: true,
                bin: (_bin = {}, (0, _defineProperty3.default)(_bin, flags.name + '-dev', './dev.entry.js'), (0, _defineProperty3.default)(_bin, flags.name, './entry.js'), _bin)
              }
            });

          case 12:
            _context.next = 14;
            return _taskApi2.default.addFile({
              dest: './dev.entry.js',
              fileContent: ['#!/usr/bin/env node', '// use this for dev, prod will use ./entry.js', 'const path = require(\'path\')', 'require(\'app-module-path\').addPath(path.resolve(__dirname, \'./src\'))', 'require(\'babel-register\')', 'require(\'babel-polyfill\')', 'require(\'./src\')'].join('\n')
            });

          case 14:
            _context.next = 16;
            return _taskApi2.default.shell({ command: 'chmod 0755 ./dev.entry.js' });

          case 16:
            _context.next = 18;
            return _taskApi2.default.addFile({
              dest: './entry.js',
              fileContent: ['#!/usr/bin/env node', 'const path = require(\'path\')', 'require(\'app-module-path\').addPath(path.resolve(__dirname, \'./build\'))', 'require(\'./build\')'].join('\n')
            });

          case 18:
            _context.next = 20;
            return _taskApi2.default.shell({ command: 'chmod 0755 ./entry.js' });

          case 20:
            _context.next = 22;
            return _taskApi2.default.shell({ command: 'mkdir src' });

          case 22:
            _context.next = 24;
            return _taskApi2.default.shell({ command: 'touch src/index.js' });

          case 24:
            if (!flags.git) {
              _context.next = 27;
              break;
            }

            _context.next = 27;
            return _taskApi2.default.gitInit();

          case 27:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function cli(_x) {
    return _ref2.apply(this, arguments);
  }

  return cli;
}();