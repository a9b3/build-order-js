'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var commandRunner = function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref3) {
    var _this = this;

    var flags = _ref3.flags,
        args = _ref3.args,
        defaultDir = _ref3.defaultDir,
        name = _ref3.name;
    var cwd, handlers, projectRootPath;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            cwd = _process2.default.cwd();
            handlers = extractHandlers({
              cwd: cwd,
              names: args,
              defaultDir: defaultDir
            });

            // set default flags

            flags.babelOutdir = flags.babelOutdir || 'build';

            _context2.next = 5;
            return helper.getProjectRootPath();

          case 5:
            projectRootPath = _context2.sent;
            _context2.next = 8;
            return helper.mapAsync(handlers, function () {
              var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(fn, i) {
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        helper.taskApiLogHeader(name, args[i]);
                        console.log('');

                        // callsite for task functions
                        _context.next = 4;
                        return fn({
                          flags: flags,
                          env: {
                            cwd: cwd,
                            projectRootPath: projectRootPath
                          },
                          taskApi: _taskApi2.default
                        });

                      case 4:

                        helper.taskApiLogHeader('END ' + name, args[i]);
                        console.log('');

                      case 6:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, _this);
              }));

              return function (_x2, _x3) {
                return _ref5.apply(this, arguments);
              };
            }());

          case 8:

            console.log(_chalk2.default.green('All done!'));

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function commandRunner(_x) {
    return _ref4.apply(this, arguments);
  };
}();

// names is an array of
// - filepaths relative to cwd
// or
// - default dir folder

/**
 * @param {Object} opts
 * @param {Array.<String>} names - json to merge
 * @param {String} cwd - return of process.cwd()
 * @param {String} defaultDir
 */


exports.tasks = tasks;
exports.buildorders = buildorders;

var _process = require('process');

var _process2 = _interopRequireDefault(_process);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _helper = require('services/helper');

var helper = _interopRequireWildcard(_helper);

var _taskApi = require('services/task-api');

var _taskApi2 = _interopRequireDefault(_taskApi);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function tasks(_ref) {
  var flags = _ref.flags,
      args = _ref.args;

  return commandRunner({
    flags: flags,
    args: args,
    defaultDir: _config2.default.defaultTaskDir,
    name: 'TASKS'
  });
}

function buildorders(_ref2) {
  var flags = _ref2.flags,
      args = _ref2.args;

  return commandRunner({
    flags: flags,
    args: args,
    defaultDir: _config2.default.defaultBuildOrdersDir,
    name: 'BUILD ORDER'
  });
}

function extractHandlers(_ref6) {
  var names = _ref6.names,
      cwd = _ref6.cwd,
      defaultDir = _ref6.defaultDir;

  return names.map(function (name) {
    var cwdFilePath = _path2.default.resolve(cwd, name);
    var defaultFilePath = _path2.default.resolve(defaultDir, name);

    var handlerPath = _path2.default.extname(name) !== '' && helper.fileExists(cwdFilePath) ? cwdFilePath : helper.fileExists(defaultFilePath) ? defaultFilePath : null;
    (0, _invariant2.default)(handlerPath, name + ' is not a file or a default');

    var handler = require(handlerPath).default || require(handlerPath);
    (0, _invariant2.default)(handler || typeof handler === 'function', name + ' must export a function');
    return handler;
  });
}