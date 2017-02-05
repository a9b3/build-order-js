'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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
    var taskApi;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            taskApi = opts.taskApi;
            _context.next = 3;
            return taskApi.copyDirectory({
              src: _path2.default.resolve(__dirname, './templates/test'),
              dest: './test'
            });

          case 3:
            _context.next = 5;
            return tasks.bootstrap(opts);

          case 5:
            _context.next = 7;
            return tasks.babel(opts);

          case 7:
            _context.next = 9;
            return tasks.eslint(opts);

          case 9:
            _context.next = 11;
            return tasks.test(opts);

          case 11:
            _context.next = 13;
            return tasks.ci(opts);

          case 13:
            _context.next = 15;
            return tasks.docker((0, _assign2.default)({}, opts, {
              options: (0, _assign2.default)({}, opts.options, {
                dockerTarget: 'backend'
              })
            }));

          case 15:
            _context.next = 17;
            return taskApi.addPackages({
              packages: ['axios'],
              dev: true
            });

          case 17:
            _context.next = 19;
            return taskApi.addPackages({
              packages: ['express', 'body-parser', 'cors', 'babel-register', 'babel-polyfill']
            });

          case 19:
            _context.next = 21;
            return taskApi.addFile({
              src: _path2.default.resolve(__dirname, './templates/index.js'),
              dest: 'index.js'
            });

          case 21:
            _context.next = 23;
            return taskApi.addFile({
              src: _path2.default.resolve(__dirname, './templates/config.js'),
              dest: 'config.js',
              overwrite: true
            });

          case 23:
            _context.next = 25;
            return taskApi.copyDirectory({
              src: _path2.default.resolve(__dirname, './templates/src'),
              dest: './src'
            });

          case 25:
            if (!opts.options.git) {
              _context.next = 28;
              break;
            }

            _context.next = 28;
            return taskApi.gitInit();

          case 28:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function express(_x) {
    return _ref.apply(this, arguments);
  }

  return express;
}();