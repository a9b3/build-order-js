'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _desc, _value, _obj;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _npmClientAdapter = require('services/npm-client-adapter');

var _npmClientAdapter2 = _interopRequireDefault(_npmClientAdapter);

var _helper = require('services/helper');

var helper = _interopRequireWildcard(_helper);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var taskApi = (_dec = showHeader('Shell'), _dec2 = showHeader('Git Init'), _dec3 = showHeader('Add Package'), _dec4 = showHeader('Add JSON File'), _dec5 = helper.relativeDest, _dec6 = showHeader('Add to package.json'), _dec7 = showHeader('Add Directory'), _dec8 = helper.relativeDest, _dec9 = showHeader('Add File'), _dec10 = helper.relativeDest, _dec11 = showHeader('Copy Directory'), _dec12 = helper.relativeDest, _dec13 = showHeader('Template File'), _dec14 = helper.relativeDest, (_obj = {
  shell: function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          command = _ref2.command;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log(_chalk2.default.yellow('\n  Running command ' + command + '\n'));

              _context.next = 3;
              return helper.execPromise(command, { log: true });

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function shell() {
      return _ref.apply(this, arguments);
    }

    return shell;
  }(),
  gitInit: function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref4$initMessage = _ref4.initMessage,
          initMessage = _ref4$initMessage === undefined ? '\u0CA0_\u0CA0' : _ref4$initMessage;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return helper.execPromise('git add .', { log: true });

            case 2:
              _context2.next = 4;
              return helper.execPromise('git commit -m \'' + initMessage + '\'', { log: true });

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function gitInit() {
      return _ref3.apply(this, arguments);
    }

    return gitInit;
  }(),
  addPackages: function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          packages = _ref6.packages,
          dev = _ref6.dev;

      var paddedPackagesStr;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              paddedPackagesStr = helper.leftPad(packages.join('\n'), ' ', 2);

              console.log(_chalk2.default.yellow('\n  Adding packages to ' + (dev ? 'devDependencies' : 'dependencies') + '\n'));
              console.log(_chalk2.default.yellow(paddedPackagesStr));
              console.log('');

              _context3.next = 6;
              return _npmClientAdapter2.default.add(packages, { dev: dev });

            case 6:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function addPackages() {
      return _ref5.apply(this, arguments);
    }

    return addPackages;
  }(),
  addToJsonFile: function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
      var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          json = _ref8.json,
          dest = _ref8.dest;

      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!helper.fileExists(dest)) {
                _fs2.default.writeFileSync(dest, '{}', { encoding: 'utf8' });
              }

              _context4.next = 3;
              return helper.mergeToJsonFile({ json: json, dest: dest });

            case 3:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function addToJsonFile() {
      return _ref7.apply(this, arguments);
    }

    return addToJsonFile;
  }(),
  addToPackageJson: function () {
    var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
      var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          json = _ref10.json;

      var projectRootPath, packageJsonFilePath;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return helper.getProjectRootPath();

            case 2:
              projectRootPath = _context5.sent;
              packageJsonFilePath = _path2.default.resolve(projectRootPath, 'package.json');

              if (!helper.fileExists(packageJsonFilePath)) {
                _fs2.default.writeFileSync(packageJsonFilePath, '{}', { encoding: 'utf8' });
              }

              _context5.next = 7;
              return helper.mergeToJsonFile({ json: json, dest: packageJsonFilePath });

            case 7:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function addToPackageJson() {
      return _ref9.apply(this, arguments);
    }

    return addToPackageJson;
  }(),
  addDirectory: function addDirectory() {
    var _ref11 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        dest = _ref11.dest;

    // dir already exists early return
    if (helper.fileExists(dest)) {
      console.log(_chalk2.default.gray('\n  Directory already exists ' + dest + '\n'));
      return;
    }

    console.log(_chalk2.default.yellow('\n  Making dir -> ' + dest + '\n'));

    _fs2.default.mkdirSync(dest);
  },
  addFile: function () {
    var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
      var _ref13 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          src = _ref13.src,
          fileContent = _ref13.fileContent,
          dest = _ref13.dest,
          overwrite = _ref13.overwrite;

      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              (0, _invariant2.default)(typeof fileContent === 'string' || helper.fileExists(src), 'Must provide either \'fileContent\':String or \'src\':filepath');

              fileContent = [null, undefined].indexOf(fileContent) === -1 ? fileContent : _fs2.default.readFileSync(src, { encoding: 'utf8' });

              if (!(helper.fileExists(dest) && !overwrite)) {
                _context6.next = 5;
                break;
              }

              console.log(_chalk2.default.gray('\n  File already exists ' + dest + '\n'));
              return _context6.abrupt('return');

            case 5:

              console.log(_chalk2.default.yellow('\n  Adding into file -> ' + dest + '\n'));
              console.log(_chalk2.default.yellow(helper.leftPad(fileContent, ' ', 2)));

              _fs2.default.writeFileSync(dest, fileContent, { encoding: 'utf8' });

            case 8:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function addFile() {
      return _ref12.apply(this, arguments);
    }

    return addFile;
  }(),
  copyDirectory: function () {
    var _ref14 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
      var _ref15 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          src = _ref15.src,
          dest = _ref15.dest,
          overwrite = _ref15.overwrite;

      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!(helper.fileExists(dest) && !overwrite)) {
                _context7.next = 3;
                break;
              }

              console.log(_chalk2.default.gray('\n  Directory already exists ' + dest + '\n'));
              return _context7.abrupt('return');

            case 3:

              console.log(_chalk2.default.yellow('\n  Copying dir -> ' + dest + '\n'));

              helper.copy(src, dest, { overwrite: overwrite });

            case 5:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function copyDirectory() {
      return _ref14.apply(this, arguments);
    }

    return copyDirectory;
  }(),
  templateFile: function () {
    var _ref16 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {
      var _ref17 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          src = _ref17.src,
          _ref17$args = _ref17.args,
          args = _ref17$args === undefined ? {} : _ref17$args,
          dest = _ref17.dest,
          overwrite = _ref17.overwrite;

      var compiled, rendered, paddedRendered;
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (!(helper.fileExists(dest) && !overwrite)) {
                _context8.next = 3;
                break;
              }

              console.log(_chalk2.default.gray('\n  File already exists ' + dest + '\n'));
              return _context8.abrupt('return');

            case 3:
              compiled = _lodash2.default.template(_fs2.default.readFileSync(src, { encoding: 'utf8' }));
              rendered = compiled(args);


              console.log(_chalk2.default.yellow('\n  From ' + src + ' with args'));
              console.log(_chalk2.default.yellow(helper.leftPad((0, _stringify2.default)(args, null, '  '), ' ', 2)));
              console.log(_chalk2.default.yellow('\n  Copying to -> ' + dest + '\n'));
              paddedRendered = helper.leftPad(rendered, ' ', 2);

              console.log(_chalk2.default.yellow(paddedRendered));

              _fs2.default.writeFileSync(dest, rendered, { encoding: 'utf8' });

            case 11:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function templateFile() {
      return _ref16.apply(this, arguments);
    }

    return templateFile;
  }()
}, (_applyDecoratedDescriptor(_obj, 'shell', [_dec], (0, _getOwnPropertyDescriptor2.default)(_obj, 'shell'), _obj), _applyDecoratedDescriptor(_obj, 'gitInit', [_dec2], (0, _getOwnPropertyDescriptor2.default)(_obj, 'gitInit'), _obj), _applyDecoratedDescriptor(_obj, 'addPackages', [_dec3], (0, _getOwnPropertyDescriptor2.default)(_obj, 'addPackages'), _obj), _applyDecoratedDescriptor(_obj, 'addToJsonFile', [_dec4, _dec5], (0, _getOwnPropertyDescriptor2.default)(_obj, 'addToJsonFile'), _obj), _applyDecoratedDescriptor(_obj, 'addToPackageJson', [_dec6], (0, _getOwnPropertyDescriptor2.default)(_obj, 'addToPackageJson'), _obj), _applyDecoratedDescriptor(_obj, 'addDirectory', [_dec7, _dec8], (0, _getOwnPropertyDescriptor2.default)(_obj, 'addDirectory'), _obj), _applyDecoratedDescriptor(_obj, 'addFile', [_dec9, _dec10], (0, _getOwnPropertyDescriptor2.default)(_obj, 'addFile'), _obj), _applyDecoratedDescriptor(_obj, 'copyDirectory', [_dec11, _dec12], (0, _getOwnPropertyDescriptor2.default)(_obj, 'copyDirectory'), _obj), _applyDecoratedDescriptor(_obj, 'templateFile', [_dec13, _dec14], (0, _getOwnPropertyDescriptor2.default)(_obj, 'templateFile'), _obj)), _obj));

/*
 * @decorator
 * if function is called with { showHeader: true, ... }
 * call taskApiLogHeader with given message
 */
function showHeader() {
  var _this = this;

  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return function (target, key, descriptor) {
    var fn = descriptor.value;
    var newFn = function () {
      var _ref18 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var res;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if ((args[0] || {}).showHeader) {
                  helper.taskApiLogHeader('TASK', message);
                }
                _context9.next = 3;
                return fn.call.apply(fn, [target].concat((0, _toConsumableArray3.default)(args)));

              case 3:
                res = _context9.sent;
                return _context9.abrupt('return', res);

              case 5:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, _this);
      }));

      return function newFn() {
        return _ref18.apply(this, arguments);
      };
    }();

    descriptor.value = newFn;
    return descriptor;
  };
}

exports.default = taskApi;