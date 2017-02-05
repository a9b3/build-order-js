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

var _tasks = require('../../tasks');

var tasks = _interopRequireWildcard(_tasks);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * refer to commands/index.js for the opts passed into this function
 *
 * args used
 * --git
 */
exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(opts) {
    var taskApi, name;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            taskApi = opts.taskApi;

            opts.options.buildorderType = 'node';

            _context.next = 4;
            return tasks.bootstrap(opts);

          case 4:
            _context.next = 6;
            return tasks.babel(opts);

          case 6:
            _context.next = 8;
            return tasks.eslint(opts);

          case 8:
            _context.next = 10;
            return tasks.test(opts);

          case 10:
            _context.next = 12;
            return tasks.ci(opts);

          case 12:
            _context.next = 14;
            return taskApi.addPackages({
              packages: ['babel-register', 'babel-polyfill'],
              dev: true
            });

          case 14:
            name = opts.options.name || 'changeMe';
            _context.next = 17;
            return taskApi.addToPackageJson({
              json: {
                scripts: {
                  preversion: 'npm run eslint && npm run test',
                  version: 'npm run babel && git add .',
                  postversion: 'git push && git push --tags && npm publish'
                },
                preferGlobal: true,
                'bin': (0, _defineProperty3.default)({}, name, './bin/index.js')
              }
            });

          case 17:
            _context.next = 19;
            return taskApi.copyDirectory({
              src: _path2.default.resolve(__dirname, './templates/src'),
              dest: './src'
            });

          case 19:
            _context.next = 21;
            return taskApi.copyDirectory({
              src: _path2.default.resolve(__dirname, './templates/bin'),
              dest: './bin'
            });

          case 21:
            _context.next = 23;
            return taskApi.addFile({
              dest: './index.js',
              fileContent: ['// use this for dev, prod will use ./bin/index.js', 'require(\'babel-register\')', 'require(\'babel-polyfill\')', 'require(\'./src\')'].join('\n')
            });

          case 23:
            if (!opts.options.git) {
              _context.next = 26;
              break;
            }

            _context.next = 26;
            return taskApi.gitInit();

          case 26:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function cli(_x) {
    return _ref.apply(this, arguments);
  }

  return cli;
}();