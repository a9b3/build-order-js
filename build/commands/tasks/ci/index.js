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
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$ciTarget = _ref2.ciTarget,
        ciTarget = _ref2$ciTarget === undefined ? 'travis' : _ref2$ciTarget;

    var allowedTargets;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            allowedTargets = ['travis', 'circle'];

            (0, _invariant2.default)(!!~allowedTargets.indexOf(ciTarget), '\'ciTarget\' must be one of these values \'' + allowedTargets + '\'');

            if (!(ciTarget === 'travis')) {
              _context.next = 5;
              break;
            }

            _context.next = 5;
            return _taskApi2.default.addFile({
              src: _path2.default.resolve(__dirname, './templates/travis.yml'),
              dest: '.travis.yml'
            });

          case 5:
            if (!(ciTarget === 'circle')) {
              _context.next = 8;
              break;
            }

            _context.next = 8;
            return _taskApi2.default.addFile({
              src: _path2.default.resolve(__dirname, './templates/circle.yml'),
              dest: 'circle.yml'
            });

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function ci() {
    return _ref.apply(this, arguments);
  }

  return ci;
}();