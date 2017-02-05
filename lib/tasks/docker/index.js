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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * dockerType
 * frontend - nginx docker file serving /build
 * backend  - alphine/node serving 'node index.js' on 8080
 */
exports.default = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref) {
    var _ref$env = _ref.env,
        cwd = _ref$env.cwd,
        projectRootPath = _ref$env.projectRootPath,
        _ref$options = _ref.options;
    _ref$options = _ref$options === undefined ? {} : _ref$options;
    var _ref$options$dockerTa = _ref$options.dockerTarget,
        dockerTarget = _ref$options$dockerTa === undefined ? 'backend' : _ref$options$dockerTa,
        taskApi = _ref.taskApi;
    var allowedTargets;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            allowedTargets = ['backend', 'frontend'];

            (0, _invariant2.default)(!!~allowedTargets.indexOf(dockerTarget), '--docker-type must be one of these values \'' + allowedTargets + '\'');

            if (!(dockerTarget === 'frontend')) {
              _context.next = 5;
              break;
            }

            _context.next = 5;
            return taskApi.copyDirectory({
              src: _path2.default.resolve(__dirname, './templates/nginx'),
              dest: 'nginx'
            });

          case 5:
            _context.next = 7;
            return taskApi.templateFile({
              src: _path2.default.resolve(__dirname, './templates/Dockerfile'),
              args: {
                dockerTarget: dockerTarget
              },
              dest: 'Dockerfile'
            });

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function docker(_x) {
    return _ref2.apply(this, arguments);
  }

  return docker;
}();