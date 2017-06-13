'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref) {
    var buildorderType = _ref.flags.buildorderType,
        taskApi = _ref.taskApi;
    var babelrcFile;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return taskApi.addPackages({
              packages: ['js-build-scripts'],
              dev: true
            });

          case 2:
            babelrcFile = ['frontend', 'react'].indexOf(buildorderType) > -1 ? 'babelrc.json' : 'babelrc.node.json';

            /*
             * package.json
             */

            _context.next = 5;
            return taskApi.addToPackageJson({
              json: {
                scripts: {
                  'babel': 'rm -rf es && ./node_modules/js-build-scripts/bin.js babel'
                },
                babel: {
                  "extends": './node_modules/js-build-scripts/configs/' + babelrcFile
                }
              }
            });

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function babel(_x) {
    return _ref2.apply(this, arguments);
  }

  return babel;
}();