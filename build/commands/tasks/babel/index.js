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

var _helper = require('services/helper');

var helper = _interopRequireWildcard(_helper);

var _allowedTypes = require('../allowed-types.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * buildorderType
 * none  - es-2015 and stage-0
 * react - react preset
 */
exports.default = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref) {
    var _ref$flags = _ref.flags;
    _ref$flags = _ref$flags === undefined ? {} : _ref$flags;
    var _ref$flags$buildorder = _ref$flags.buildorderType,
        buildorderType = _ref$flags$buildorder === undefined ? 'default' : _ref$flags$buildorder,
        babelOutdir = _ref$flags.babelOutdir,
        taskApi = _ref.taskApi;
    var packages, babelRcPresets, babelRcPlugins;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _invariant2.default)(!!~_allowedTypes.allowedTypes.indexOf(buildorderType), '--babel-type flag must have one of these values \'' + _allowedTypes.allowedTypes + '\'');

            /*
             * npm packages
             */
            packages = {
              base: ['babel-plugin-transform-runtime', 'babel-plugin-transform-class-properties', 'babel-plugin-transform-decorators-legacy', 'babel-preset-es2015', 'babel-preset-stage-0', 'babel-cli'],
              react: ['babel-plugin-react-transform', 'babel-preset-react',
              // enzyme needs this
              'babel-preset-airbnb']
            };
            _context.next = 4;
            return taskApi.addPackages({
              packages: helper.concatMappedArrays(['base', buildorderType], packages),
              dev: true
            });

          case 4:
            _context.next = 6;
            return taskApi.addPackages({
              packages: [
              // required by babel-plugin-transform-runtime
              // https://babeljs.io/docs/plugins/transform-runtime/
              'babel-runtime']
            });

          case 6:
            _context.next = 8;
            return taskApi.addToPackageJson({
              json: {
                scripts: {
                  'babel': 'rm -rf ' + babelOutdir + ' && ./node_modules/babel-cli/bin/babel.js src --out-dir ' + babelOutdir + ' --copy-files'
                }
              }
            });

          case 8:

            /*
             * .babelrc
             */
            babelRcPresets = {
              base: ["stage-0", "es2015"],
              react: ['react']
            };
            babelRcPlugins = {
              base: ["transform-runtime", "transform-decorators-legacy", "transform-class-properties"]
            };
            _context.next = 12;
            return taskApi.addToJsonFile({
              dest: '.babelrc',
              json: {
                "presets": helper.concatMappedArrays(['base', buildorderType], babelRcPresets),
                "plugins": helper.concatMappedArrays(['base', buildorderType], babelRcPlugins)
              }
            });

          case 12:
            if (!(buildorderType === 'react')) {
              _context.next = 15;
              break;
            }

            _context.next = 15;
            return taskApi.addToJsonFile({
              dest: '.babelrc',
              json: {
                "env": {
                  "development": {
                    "plugins": ["react-hot-loader/babel"]
                  },
                  "test": {
                    "presets": ["airbnb", "es2015", "stage-0", "react"]
                  }
                }
              }
            });

          case 15:
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