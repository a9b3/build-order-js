'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.list = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/*****************************************************************************
 * COMMANDS
 *****************************************************************************/

/*
 * list folders for either 'tasks' or 'buildorders'
 */
var list = exports.list = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref) {
    var flags = _ref.flags,
        args = _ref.args;
    var dir, names;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(['tasks', 'buildorders'].indexOf(args[0]) === -1)) {
              _context.next = 2;
              break;
            }

            throw new Error('command must be provided one of \'tasks\' or \'buildorders\'');

          case 2:
            dir = void 0;

            if (args[0] === 'tasks') {
              dir = _config2.default.defaultTaskDir;
            } else if (args[0] === 'buildorders') {
              dir = _config2.default.defaultBuildOrdersDir;
            }

            _context.next = 6;
            return flatWalk(dir, function (name) {
              return _fs2.default.lstatSync(_path2.default.resolve(dir, name)).isDirectory() && name;
            });

          case 6:
            _context.t0 = function (a) {
              return a;
            };

            names = _context.sent.filter(_context.t0);


            names.forEach(function (name) {
              console.log(name);
            });

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function list(_x) {
    return _ref2.apply(this, arguments);
  };
}();

/*
 * executes a given list of tasks
 */


/*****************************************************************************
 * HELPERS
 *****************************************************************************/

/*
 * runs either buildorder or tasks
 */
var commandRunner = function () {
  var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref5) {
    var _this = this;

    var flags = _ref5.flags,
        args = _ref5.args,
        defaultDir = _ref5.defaultDir,
        name = _ref5.name;
    var cwd, handlers, projectRootPath;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            cwd = _process2.default.cwd();
            handlers = extractHandlers({
              cwd: cwd,
              names: args,
              defaultDir: defaultDir
            });

            // set default flags

            flags.babelOutdir = flags.babelOutdir || 'build';

            _context3.next = 5;
            return helper.getProjectRootPath();

          case 5:
            projectRootPath = _context3.sent;
            _context3.next = 8;
            return helper.mapAsync(handlers, function () {
              var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(fn, i) {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        helper.taskApiLogHeader(name, args[i]);
                        console.log('');

                        // callsite for task functions
                        _context2.next = 4;
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
                        return _context2.stop();
                    }
                  }
                }, _callee2, _this);
              }));

              return function (_x3, _x4) {
                return _ref7.apply(this, arguments);
              };
            }());

          case 8:

            console.log(_chalk2.default.green('All done!'));

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function commandRunner(_x2) {
    return _ref6.apply(this, arguments);
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


/*
 * flatWalk
 */
var flatWalk = function () {
  var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(dir, cb) {
    var files, res, i;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            files = _fs2.default.readdirSync(dir);
            res = [];
            i = 0;

          case 3:
            if (!(i < files.length)) {
              _context4.next = 12;
              break;
            }

            _context4.t0 = res;
            _context4.next = 7;
            return cb(files[i]);

          case 7:
            _context4.t1 = _context4.sent;

            _context4.t0.push.call(_context4.t0, _context4.t1);

          case 9:
            i++;
            _context4.next = 3;
            break;

          case 12:
            return _context4.abrupt('return', res);

          case 13:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function flatWalk(_x5, _x6) {
    return _ref9.apply(this, arguments);
  };
}();

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

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function tasks(_ref3) {
  var flags = _ref3.flags,
      args = _ref3.args;

  return commandRunner({
    flags: flags,
    args: args,
    defaultDir: _config2.default.defaultTaskDir,
    name: 'TASKS'
  });
}

/*
 * executes a buildorder
 */
function buildorders(_ref4) {
  var flags = _ref4.flags,
      args = _ref4.args;

  return commandRunner({
    flags: flags,
    args: args,
    defaultDir: _config2.default.defaultBuildOrdersDir,
    name: 'BUILD ORDER'
  });
}function extractHandlers(_ref8) {
  var names = _ref8.names,
      cwd = _ref8.cwd,
      defaultDir = _ref8.defaultDir;

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