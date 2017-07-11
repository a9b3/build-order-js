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

/*
 * 1. git init
 * 2. .gitignore
 * 3. package.json
 * 4. readme.md
 * 5. config.js
 */
exports.default = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref) {
    var _ref$name = _ref.name,
        name = _ref$name === undefined ? 'changeMe' : _ref$name;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _taskApi2.default.shell({
              command: 'git init'
            });

          case 2:
            _context.next = 4;
            return _taskApi2.default.addFile({
              dest: '.gitignore',
              fileContent: ['node_modules/', '*.log'].join('\n')
            });

          case 4:
            _context.next = 6;
            return _taskApi2.default.templateFile({
              dest: 'package.json',
              src: _path2.default.resolve(__dirname, './templates/package.json.tpl'),
              args: {
                name: name
              }
            });

          case 6:
            _context.next = 8;
            return _taskApi2.default.addFile({
              dest: 'readme.md',
              fileContent: ['# Readme'].join('\n')
            });

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function bootstrap(_x) {
    return _ref2.apply(this, arguments);
  }

  return bootstrap;
}();