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

var _helper = require('../../helper.js');

var helper = _interopRequireWildcard(_helper);

var _allowedTypes = require('../allowed-types.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * buildorderType
 * default  - webpack, only babel-loader
 * frontend - webpack, all asset loaders
 * react    - webpack (same as frontend)
 */
exports.default = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref) {
    var _ref$env = _ref.env,
        cwd = _ref$env.cwd,
        projectRootPath = _ref$env.projectRootPath,
        _ref$options = _ref.options;
    _ref$options = _ref$options === undefined ? {} : _ref$options;
    var _ref$options$buildord = _ref$options.buildorderType,
        buildorderType = _ref$options$buildord === undefined ? 'default' : _ref$options$buildord,
        taskApi = _ref.taskApi;
    var webpackConfigFileName, webpackConfigFileNameOutput, packages, scripts;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _invariant2.default)(!!~_allowedTypes.allowedTypes.indexOf(buildorderType), '--buildorder-type must be one of these values \'' + _allowedTypes.allowedTypes + '\'');

            webpackConfigFileName = 'webpack.config.js.tpl';
            webpackConfigFileNameOutput = 'webpack.config.js';

            /*
             * npm packages
             */

            packages = {
              base: ['webpack@2.2.0', 'webpack-dev-server@2.2.0', 'babel-core', 'babel-loader', 'json-loader']
            };

            packages.frontend = [
            /* loaders */
            'css-loader', 'file-loader', 'html-loader', 'url-loader', 'style-loader', 'sass-loader', 'postcss-loader', 'image-webpack-loader',
            /* plugins */
            'html-webpack-plugin', 'favicons-webpack-plugin', 'extract-text-webpack-plugin@2.0.0-rc.3',
            /* css */
            'autoprefixer', 'node-sass'];
            packages.react = packages.frontend;

            _context.next = 8;
            return taskApi.addPackages({
              packages: helper.concatMappedArrays(['base', buildorderType], packages),
              dev: true
            });

          case 8:

            /*
             * package.json
             */
            scripts = {
              base: {
                'webpack': 'rm -rf build && NODE_ENV=production ./node_modules/webpack/bin/webpack.js --config ' + webpackConfigFileNameOutput
              },
              frontend: {
                'webpack': 'rm -rf build && NODE_ENV=production ./node_modules/webpack/bin/webpack.js --config ' + webpackConfigFileNameOutput,
                'webpack:dev': 'NODE_ENV=development ./node_modules/webpack-dev-server/bin/webpack-dev-server.js --history-api-fallback --hot --inline --content-base ./src --client-log-level error --port ${PORT:-8080}'
              }
            };

            scripts.react = scripts.frontend;

            _context.next = 12;
            return taskApi.addToPackageJson({
              json: {
                scripts: scripts[buildorderType] || scripts.base
              }
            });

          case 12:
            _context.next = 14;
            return taskApi.templateFile({
              src: _path2.default.resolve(__dirname, './templates/' + webpackConfigFileName),
              args: {
                buildorderType: buildorderType
              },
              dest: '' + webpackConfigFileNameOutput
            });

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function webpack(_x) {
    return _ref2.apply(this, arguments);
  }

  return webpack;
}();