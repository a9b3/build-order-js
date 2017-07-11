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
            return _taskApi2.default.addPackages({
              packages: ['jbs-node', 'babel-register', 'babel-polyfill'],
              dev: true
            });

          case 8:
            _context.next = 10;
            return _taskApi2.default.addToPackageJson({
              json: {
                main: './build/index.js',
                scripts: {
                  build: './node_modules/jbs-node/bin.js build --input src --output build',
                  preversion: 'npm run lint && npm run test',
                  version: 'npm run build && npm publish',
                  postversion: 'git add . && git push && git push --tags'
                },
                babel: {
                  presets: ['./node_modules/jbs-node/configs/babel-preset-jbs-node.js']
                }
              }
            });

          case 10:
            _context.next = 12;
            return _taskApi2.default.shell({ command: 'mkdir src' });

          case 12:
            _context.next = 14;
            return _taskApi2.default.shell({ command: 'touch src/index.js' });

          case 14:
            _context.next = 16;
            return _taskApi2.default.addFile({
              dest: './index.js',
              fileContent: ['// use this for dev', 'require(\'babel-register\')', 'require(\'babel-polyfill\')', 'require(\'./src\')'].join('\n')
            });

          case 16:
            if (!flags.git) {
              _context.next = 19;
              break;
            }

            _context.next = 19;
            return _taskApi2.default.gitInit();

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function nodeApp(_x) {
    return _ref2.apply(this, arguments);
  }

  return nodeApp;
}();