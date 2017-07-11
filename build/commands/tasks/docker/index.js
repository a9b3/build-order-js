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
            return _taskApi2.default.templateFile({
              src: _path2.default.resolve(__dirname, './templates/Dockerfile'),
              dest: 'Dockerfile'
            });

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function docker() {
    return _ref.apply(this, arguments);
  }

  return docker;
}();