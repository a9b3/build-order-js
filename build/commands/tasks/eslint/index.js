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

var _allowedTypes = require('../allowed-types.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * buildorderType
 * none  - eslint-config-esayemm
 * react - eslint-config-esayemm/lib/react
 */
exports.default = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref) {
    var _ref$flags = _ref.flags;
    _ref$flags = _ref$flags === undefined ? {} : _ref$flags;
    var _ref$flags$buildorder = _ref$flags.buildorderType,
        buildorderType = _ref$flags$buildorder === undefined ? 'default' : _ref$flags$buildorder,
        taskApi = _ref.taskApi;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _invariant2.default)(!!~_allowedTypes.allowedTypes.indexOf(buildorderType), '--eslint-type must be one of these values \'' + _allowedTypes.allowedTypes + '\'');

            /*
             * npm packages
             */
            _context.next = 3;
            return taskApi.addPackages({
              packages: [
              // required if using certain babel enabled features
              // eslint-config-esayemm sets the parser config
              // https://github.com/babel/babel-eslint
              'babel-eslint', 'eslint', 'eslint-config-esayemm', buildorderType === 'react' && 'eslint-plugin-react'].filter(function (a) {
                return a;
              }),
              dev: true
            });

          case 3:
            _context.next = 5;
            return taskApi.addToPackageJson({
              json: {
                scripts: {
                  'eslint': './node_modules/eslint/bin/eslint.js .'
                }
              }
            });

          case 5:
            _context.next = 7;
            return taskApi.addFile({
              fileContent: ['build/', 'lib/', 'node_modules/'].join('\n'),
              dest: '.eslintignore'
            });

          case 7:
            _context.next = 9;
            return taskApi.addToJsonFile({
              dest: '.eslintrc',
              json: {
                "extends": [buildorderType === 'react' ? "esayemm/lib/react" : "esayemm"].filter(function (a) {
                  return a;
                })
              }
            });

          case 9:
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