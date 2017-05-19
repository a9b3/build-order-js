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

            opts.flags.buildorderType = 'react';

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
            return tasks.webpack(opts);

          case 10:
            _context.next = 12;
            return tasks.test(opts);

          case 12:
            _context.next = 14;
            return tasks.ci(opts);

          case 14:
            _context.next = 16;
            return tasks.docker((0, _assign2.default)({}, opts, {
              flags: (0, _assign2.default)({}, opts.flags, {
                dockerTarget: 'frontend'
              })
            }));

          case 16:
            _context.next = 18;
            return taskApi.addToPackageJson({
              json: {
                scripts: {
                  'watch-scss': "./node_modules/chokidar-cli/index.js 'src/**/*.scss' -c 'touch src/app/index.js'",
                  // docker will run 'npm run build'
                  build: 'npm run webpack',
                  start: 'npm run webpack:dev && npm run watch-scss',
                  deploy: 'npm run build && echo add continuous deployment here'
                }
              }
            });

          case 18:
            _context.next = 20;
            return taskApi.addPackages({
              packages: ['react-addons-test-utils', 'react-hot-loader@3.0.0-beta.6']
            });

          case 20:
            _context.next = 22;
            return taskApi.addPackages({
              packages: ['react', 'prop-types', 'react-css-modules', 'react-dom', 'react-helmet', 'react-router', 'react-router-dom', 'history', 'html', 'invariant', 'esayemm-styles', 'chokidar-cli']
            });

          case 22:
            _context.next = 24;
            return taskApi.copyDirectory({
              src: _path2.default.resolve(__dirname, './templates/src'),
              dest: './src'
            });

          case 24:
            if (!opts.flags.git) {
              _context.next = 27;
              break;
            }

            _context.next = 27;
            return taskApi.gitInit();

          case 27:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function react(_x) {
    return _ref.apply(this, arguments);
  }

  return react;
}();