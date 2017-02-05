'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _dec, _dec2, _dec3, _dec4, _dec5, _desc, _value, _obj;

var _npmClientAdapter = require('./npm-client-adapter.js');

var _npmClientAdapter2 = _interopRequireDefault(_npmClientAdapter);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _helper = require('./helper.js');

var helper = _interopRequireWildcard(_helper);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

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

var taskApi = (_dec = helper.relativeDest, _dec2 = helper.relativeDest, _dec3 = helper.relativeDest, _dec4 = helper.relativeDest, _dec5 = helper.relativeDest, (_obj = {

  /**
   * @param {String} command          - shell command to run *note* that interactive
   * commands isn't working right now
   * @param {Object} opts
   * @param {Boolean} [showHeader]    - show task api console logs
   */
  shell: function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(command) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref2$showHeader = _ref2.showHeader,
          showHeader = _ref2$showHeader === undefined ? true : _ref2$showHeader;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (showHeader) {
                helper.taskApiLogHeader('TASK', 'Shell');
              }

              console.log(_chalk2.default.yellow('\n  Running command ' + command + '\n'));
              _context.next = 4;
              return helper.execPromise(command, { log: true });

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function shell(_x2) {
      return _ref.apply(this, arguments);
    }

    return shell;
  }(),


  /**
   * @param {String} [initMessage] - git init message
   */
  gitInit: function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref4$initMessage = _ref4.initMessage,
          initMessage = _ref4$initMessage === undefined ? '\u0CA0_\u0CA0' : _ref4$initMessage,
          _ref4$showHeader = _ref4.showHeader,
          showHeader = _ref4$showHeader === undefined ? true : _ref4$showHeader;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (showHeader) {
                helper.taskApiLogHeader('TASK', 'Git Init');
              }

              _context2.next = 3;
              return helper.execPromise('git add .', { log: true });

            case 3:
              _context2.next = 5;
              return helper.execPromise('git commit -m \'' + initMessage + '\'', { log: true });

            case 5:
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


  /**
   * @param {Object} opts
   * @param {Array.<String>} packages - Npm packages to add
   * @param {Boolean} [dev]           - Use --save-dev or not
   * @param {Boolean} [showHeader]    - show task api console logs
   */
  addPackages: function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          packages = _ref6.packages,
          dev = _ref6.dev,
          _ref6$showHeader = _ref6.showHeader,
          showHeader = _ref6$showHeader === undefined ? true : _ref6$showHeader;

      var paddedPackagesStr;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (showHeader) {
                helper.taskApiLogHeader('TASK', 'Add Package');
              }

              paddedPackagesStr = helper.leftPad(packages.join('\n'), ' ', 2);

              console.log(_chalk2.default.yellow('\n  Adding packages to ' + (dev ? 'devDependencies' : 'dependencies') + '\n'));
              console.log(_chalk2.default.yellow(paddedPackagesStr));
              console.log('');
              _context3.next = 7;
              return _npmClientAdapter2.default.add(packages, { dev: dev });

            case 7:
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
          dest = _ref8.dest,
          _ref8$showHeader = _ref8.showHeader,
          showHeader = _ref8$showHeader === undefined ? true : _ref8$showHeader;

      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (showHeader) {
                helper.taskApiLogHeader('TASK', 'Add JSON File');
              }

              if (!helper.fileExists(dest)) {
                _fs2.default.writeFileSync(dest, '{}', { encoding: 'utf8' });
              }

              _context4.next = 4;
              return helper.mergeToJsonFile({ json: json, dest: dest });

            case 4:
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


  /**
   * @param {Object} opts
   * @param {Object} json          - json to merge into package.json
   * @param {Boolean} [showHeader] - show task api console logs
   */
  addToPackageJson: function () {
    var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
      var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          json = _ref10.json,
          _ref10$showHeader = _ref10.showHeader,
          showHeader = _ref10$showHeader === undefined ? true : _ref10$showHeader;

      var projectRootPath, packageJsonFilePath;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (showHeader) {
                helper.taskApiLogHeader('TASK', 'Add to package.json');
              }

              _context5.next = 3;
              return helper.getProjectRootPath();

            case 3:
              projectRootPath = _context5.sent;
              packageJsonFilePath = _path2.default.resolve(projectRootPath, 'package.json');

              if (!helper.fileExists(packageJsonFilePath)) {
                _fs2.default.writeFileSync(packageJsonFilePath, '{}', { encoding: 'utf8' });
              }

              _context5.next = 8;
              return helper.mergeToJsonFile({ json: json, dest: packageJsonFilePath });

            case 8:
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
        dest = _ref11.dest,
        _ref11$showHeader = _ref11.showHeader,
        showHeader = _ref11$showHeader === undefined ? true : _ref11$showHeader;

    if (showHeader) {
      helper.taskApiLogHeader('TASK', 'Add Directory');
    }

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
          overwrite = _ref13.overwrite,
          _ref13$showHeader = _ref13.showHeader,
          showHeader = _ref13$showHeader === undefined ? true : _ref13$showHeader;

      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (showHeader) {
                helper.taskApiLogHeader('TASK', 'Add File');
              }

              (0, _invariant2.default)(typeof fileContent === 'string' || helper.fileExists(src), 'Must provide either \'fileContent\':String or \'src\':filepath');

              fileContent = [null, undefined].indexOf(fileContent) === -1 ? fileContent : _fs2.default.readFileSync(src, { encoding: 'utf8' });

              if (!(helper.fileExists(dest) && !overwrite)) {
                _context6.next = 6;
                break;
              }

              console.log(_chalk2.default.gray('\n  File already exists ' + dest + '\n'));
              return _context6.abrupt('return');

            case 6:

              console.log(_chalk2.default.yellow('\n  Adding into file -> ' + dest + '\n'));
              console.log(_chalk2.default.yellow(helper.leftPad(fileContent, ' ', 2)));

              _fs2.default.writeFileSync(dest, fileContent, { encoding: 'utf8' });

            case 9:
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
          overwrite = _ref15.overwrite,
          _ref15$showHeader = _ref15.showHeader,
          showHeader = _ref15$showHeader === undefined ? true : _ref15$showHeader;

      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (showHeader) {
                helper.taskApiLogHeader('TASK', 'Copy Directory');
              }

              // dir already exists early return

              if (!(helper.fileExists(dest) && !overwrite)) {
                _context7.next = 4;
                break;
              }

              console.log(_chalk2.default.gray('\n  Directory already exists ' + dest + '\n'));
              return _context7.abrupt('return');

            case 4:

              console.log(_chalk2.default.yellow('\n  Copying dir -> ' + dest + '\n'));

              helper.copy(src, dest, { overwrite: overwrite });

            case 6:
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
          overwrite = _ref17.overwrite,
          _ref17$showHeader = _ref17.showHeader,
          showHeader = _ref17$showHeader === undefined ? true : _ref17$showHeader;

      var compiled, rendered, paddedRendered;
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (showHeader) {
                helper.taskApiLogHeader('TASK', 'Template File');
              }

              if (!(helper.fileExists(dest) && !overwrite)) {
                _context8.next = 4;
                break;
              }

              console.log(_chalk2.default.gray('\n  File already exists ' + dest + '\n'));
              return _context8.abrupt('return');

            case 4:
              compiled = _lodash2.default.template(_fs2.default.readFileSync(src, { encoding: 'utf8' }));
              rendered = compiled(args);


              console.log(_chalk2.default.yellow('\n  From ' + src + ' with args'));
              console.log(_chalk2.default.yellow(helper.leftPad((0, _stringify2.default)(args, null, '  '), ' ', 2)));
              console.log(_chalk2.default.yellow('\n  Copying to -> ' + dest + '\n'));
              paddedRendered = helper.leftPad(rendered, ' ', 2);

              console.log(_chalk2.default.yellow(paddedRendered));

              _fs2.default.writeFileSync(dest, rendered, { encoding: 'utf8' });

            case 12:
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
}, (_applyDecoratedDescriptor(_obj, 'addToJsonFile', [_dec], (0, _getOwnPropertyDescriptor2.default)(_obj, 'addToJsonFile'), _obj), _applyDecoratedDescriptor(_obj, 'addDirectory', [_dec2], (0, _getOwnPropertyDescriptor2.default)(_obj, 'addDirectory'), _obj), _applyDecoratedDescriptor(_obj, 'addFile', [_dec3], (0, _getOwnPropertyDescriptor2.default)(_obj, 'addFile'), _obj), _applyDecoratedDescriptor(_obj, 'copyDirectory', [_dec4], (0, _getOwnPropertyDescriptor2.default)(_obj, 'copyDirectory'), _obj), _applyDecoratedDescriptor(_obj, 'templateFile', [_dec5], (0, _getOwnPropertyDescriptor2.default)(_obj, 'templateFile'), _obj)), _obj));

exports.default = taskApi;