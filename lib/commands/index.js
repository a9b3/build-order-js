'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var commandRunner = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref) {
    var _this = this;

    var options = _ref.options,
        args = _ref.args,
        defaultDir = _ref.defaultDir,
        name = _ref.name;
    var cwd, handlers, projectRootPath;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            cwd = _process2.default.cwd();
            handlers = helper.extractHandlers({
              cwd: cwd,
              names: args,
              defaultDir: defaultDir
            });
            _context2.next = 4;
            return helper.getProjectRootPath();

          case 4:
            projectRootPath = _context2.sent;
            _context2.next = 7;
            return helper.mapAsync(handlers, function () {
              var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(fn, i) {
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        helper.taskApiLogHeader(name, args[i]);
                        console.log('');

                        _context.next = 4;
                        return fn({
                          options: options,
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
                return _ref3.apply(this, arguments);
              };
            }());

          case 7:

            console.log(_chalk2.default.green('All done!'));

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function commandRunner(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.tasks = tasks;
exports.buildorders = buildorders;

var _process = require('process');

var _process2 = _interopRequireDefault(_process);

var _helper = require('../helper.js');

var helper = _interopRequireWildcard(_helper);

var _taskApi = require('../task-api.js');

var _taskApi2 = _interopRequireDefault(_taskApi);

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function tasks(_ref4) {
  var options = _ref4.options,
      args = _ref4.args;

  return commandRunner({ options: options, args: args, defaultDir: _config2.default.defaultTaskDir, name: 'TASKS' });
}

function buildorders(_ref5) {
  var options = _ref5.options,
      args = _ref5.args;

  return commandRunner({ options: options, args: args, defaultDir: _config2.default.defaultBuildOrdersDir, name: 'BUILD ORDER' });
}