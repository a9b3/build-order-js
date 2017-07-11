'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _taskApi = require('services/task-api');

var _taskApi2 = _interopRequireDefault(_taskApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * extend: 'eslint-config-esayemm/lib/react',
 *
 * else pass in 'eslint-config-esayemm'
 */
exports.default = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref) {
    var extend = _ref.extend;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _invariant2.default)(typeof extend === 'string', 'Must provide \'extend\' field to eslint (what eslint preset to extend).');

            /*
             * npm packages
             */
            _context.next = 3;
            return _taskApi2.default.addPackages({
              packages: [
              // required if using certain babel enabled features
              // eslint-config-esayemm sets the parser config
              // https://github.com/babel/babel-eslint
              'babel-eslint', 'eslint', 'eslint-config-esayemm', 'eslint-plugin-react'],
              dev: true
            });

          case 3:
            _context.next = 5;
            return _taskApi2.default.addToPackageJson({
              json: {
                scripts: {
                  'lint': './node_modules/eslint/bin/eslint.js .'
                }
              }
            });

          case 5:
            _context.next = 7;
            return _taskApi2.default.addFile({
              fileContent: ['build/', 'lib/', 'node_modules/'].join('\n'),
              dest: '.eslintignore'
            });

          case 7:
            _context.next = 9;
            return _taskApi2.default.addToJsonFile({
              dest: '.eslintrc',
              json: {
                "extends": [extend]
              }
            });

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function eslint(_x) {
    return _ref2.apply(this, arguments);
  }

  return eslint;
}();