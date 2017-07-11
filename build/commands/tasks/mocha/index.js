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

var _taskApi = require('services/task-api');

var _taskApi2 = _interopRequireDefault(_taskApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _taskApi2.default.addPackages({
              packages: ['babel-register', 'babel-polyfill', 'mocha', 'expect'],
              dev: true
            });

          case 2:
            _context.next = 4;
            return _taskApi2.default.addToPackageJson({
              json: {
                scripts: {
                  'test': 'NODE_ENV=test ./node_modules/mocha/bin/mocha --compilers js:babel-register --require babel-polyfill $(find . -name \'*.spec.js\' ! -ipath \'*node_modules*\')',
                  'test:watch': 'NODE_ENV=test ./node_modules/mocha/bin/mocha --compilers js:babel-register --require babel-polyfill --watch $(find . -name \'*.spec.js\' ! -ipath \'*node_modules*\')'
                }
              }
            });

          case 4:
            _context.next = 6;
            return _taskApi2.default.copyDirectory({
              src: _path2.default.resolve(__dirname, './templates/mocha/test'),
              dest: './test'
            });

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function mocha() {
    return _ref.apply(this, arguments);
  }

  return mocha;
}();