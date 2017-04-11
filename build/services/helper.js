'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapAsync = exports.areCommandsInstalled = exports.isCommandInstalled = exports.getProjectRootPath = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

/**
 * returns project root based on where .git is located in the ancestor nodes
 *
 * @returns {String} project root dir
 */
var getProjectRootPath = exports.getProjectRootPath = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var res;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return execPromise('git rev-parse --show-toplevel');

          case 3:
            res = _context.sent;
            return _context.abrupt('return', res.trim());

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', '');

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 7]]);
  }));

  return function getProjectRootPath() {
    return _ref.apply(this, arguments);
  };
}();

/**
 * @param {String} command - check if command line tool exists ex. 'git', 'npm'
 * @returns {Boolean}
 */
// TODO this might need to be improved on to not use 'which'


var isCommandInstalled = exports.isCommandInstalled = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(command) {
    var res;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return execPromise('which ' + command);

          case 2:
            res = _context2.sent;
            return _context2.abrupt('return', Boolean(res.trim()));

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function isCommandInstalled(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Check if commands are installed
 *
 * ex.
 *
 * [['yarn', 'npm'], 'git']
 * =
 * ('yarn' || 'npm') && 'git'
 *
 * @param {Array.<String>} commands - refer to ex
 * @returns {Boolean}
 */


var areCommandsInstalled = exports.areCommandsInstalled = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(commands) {
    var i, checkForThese, hasTheseCommands, j;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            i = 0;

          case 1:
            if (!(i < commands.length)) {
              _context3.next = 19;
              break;
            }

            checkForThese = [].concat(commands[i]);
            hasTheseCommands = void 0;
            j = 0;

          case 5:
            if (!(j < checkForThese.length)) {
              _context3.next = 14;
              break;
            }

            if (!hasTheseCommands) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt('break', 14);

          case 8:
            _context3.next = 10;
            return isCommandInstalled(checkForThese[j]);

          case 10:
            hasTheseCommands = _context3.sent;

          case 11:
            j++;
            _context3.next = 5;
            break;

          case 14:
            if (hasTheseCommands) {
              _context3.next = 16;
              break;
            }

            throw new Error('Missing dependencies \'' + checkForThese + '\'');

          case 16:
            i++;
            _context3.next = 1;
            break;

          case 19:
            return _context3.abrupt('return', false);

          case 20:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function areCommandsInstalled(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Array.map for async functions
 *
 * async/await style
 * const res = await mapAsync([asyncFn, asyncFn], async (fn) => await fn())
 *
 * promise style
 * mapAsync([foo, foo], fn => fn())
 * .then(res => {
 *   console.log(res)
 * })
 *
 * @param {Array.<Promise>} arr - Array of async functions/promises
 * @param {Function} callback - Accepts async function as argument
 * @returns {Promise}
 */
var mapAsync = exports.mapAsync = function () {
  var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(arr, callback) {
    var results, i;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            results = [];
            i = 0;

          case 2:
            if (!(i < arr.length)) {
              _context5.next = 11;
              break;
            }

            _context5.t0 = results;
            _context5.next = 6;
            return callback(arr[i], i);

          case 6:
            _context5.t1 = _context5.sent;

            _context5.t0.push.call(_context5.t0, _context5.t1);

          case 8:
            i++;
            _context5.next = 2;
            break;

          case 11:
            return _context5.abrupt('return', results);

          case 12:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function mapAsync(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Recursively walk a file tree starting at src
 *
 * @param {String} src - file path
 * @param {Function} callback - Will be passed (file, stat)
 * @returns {Array.<Any>} Array of returns from callback
 */


exports.execPromise = execPromise;
exports.fileExists = fileExists;
exports.deepMergeJson = deepMergeJson;
exports.requireJson = requireJson;
exports.padString = padString;
exports.leftPad = leftPad;
exports.taskApiLogHeader = taskApiLogHeader;
exports.relativeDest = relativeDest;
exports.walk = walk;
exports.rmdir = rmdir;
exports.copyFile = copyFile;
exports.copy = copy;
exports.concatMappedArrays = concatMappedArrays;
exports.mergeToJsonFile = mergeToJsonFile;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _child_process = require('child_process');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * const text = await execPromise('echo hi')
 * => text = 'hi'
 *
 * returns stdout
 */
function execPromise(execCommand) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return new _promise2.default(function (resolve, reject) {
    var child = (0, _child_process.exec)(execCommand, { async: true });

    var allData = '';
    child.stdout.on('data', function (data) {
      if (opts.log) {
        console.log(_chalk2.default.grey(data));
      }
      allData += data;
    });

    child.on('close', function (code) {
      if (code > 100) reject(new Error('exit code ' + code));
      resolve(allData);
    });
  });
}

/**
 * @param {String] filePath
 * @returns {Boolean} whether file exists
 */
function fileExists(filePath) {
  try {
    _fsExtra2.default.accessSync(filePath, _fsExtra2.default.F_OK);
    return true;
  } catch (e) {
    return false;
  }
}

function _deepMergeJson(a, b, c) {
  var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (a.constructor === Object) {
    for (var key in b) {
      // eslint-disable-line
      if (!c[key]) {
        c[key] = b[key];
      } else {
        c[key] = _deepMergeJson(a[key], b[key], c[key], opts);
      }
    }
  } else if (a.constructor === Array) {
    if (b.constructor !== Array) {
      throw new Error('Cannot merge ' + a + ' with ' + b + ' not the same type');
    }

    // IMPORTANT: this is not allowing arr dupes
    for (var i = 0; i < b.length; i++) {
      if (a.indexOf(b[i]) === -1) {
        a = a.concat(b);
      }
    }
    return a;
  } else {
    return opts.override ? b : a;
  }

  return c;
}

function deepMergeJson(a, b, opts) {
  var c = a;
  return _deepMergeJson(a, b, c, opts);
}

function requireJson(filepath) {
  return JSON.parse(_fsExtra2.default.readFileSync(filepath, 'utf8'));
}

function padString(str, char, limit) {
  var diff = limit - str.length;
  return str + ' ' + char.repeat(diff - 1);
}

function leftPad(str) {
  var char = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var leftPadAmt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  return str.split('\n').map(function (line) {
    return char.repeat(leftPadAmt) + line;
  }).join('\n');
}

function taskApiLogHeader(header, taskName, color) {
  var str = padString(header + ': [' + taskName + ']', '*', 80);
  color ? console.log(_chalk2.default[color](str)) : console.log(str);
}

function relativeDest(v, key, desc) {
  var old = desc.value;

  desc.value = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(opts) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var projectRootPath;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return getProjectRootPath();

            case 2:
              projectRootPath = _context4.sent;

              opts.dest = _path2.default.resolve(projectRootPath, opts.dest);

              return _context4.abrupt('return', old.call.apply(old, [this, opts].concat((0, _toConsumableArray3.default)(args))));

            case 5:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function (_x7) {
      return _ref4.apply(this, arguments);
    };
  }();

  return desc;
}function walk(src, callback) {
  var results = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (!_fsExtra2.default.existsSync(src)) {
    return results;
  }

  var stat = _fsExtra2.default.lstatSync(src);
  if (stat.isDirectory()) {
    _fsExtra2.default.readdirSync(src).forEach(function (file) {
      var filepath = _path2.default.resolve(src, file);
      results.concat(walk(filepath, callback, results));
    });
    results.push(callback(src, stat));
  } else {
    results.push(callback(src, stat));
  }
  return results;
}

/**
 * @param {String} src - file path
 * @returns{Array.<String>} Array of filepaths deleted
 */
function rmdir(src) {
  return walk(src, function (file, stat) {
    stat.isDirectory() ? _fsExtra2.default.rmdirSync(file) : _fsExtra2.default.unlinkSync(file);
    return file;
  });
}

/**
 * Copy src to dest
 *
 * @param {String} src - file path
 * @param {String} dest - file path
 */
function copyFile(src, dest) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { encoding: 'utf8' };

  var fileContent = _fsExtra2.default.readFileSync(src, opts);
  _fsExtra2.default.writeFileSync(dest, fileContent, opts);
}

/**
 * Copy src to dest recursively
 *
 * @param {String} src - file path
 * @param {String} dest - file path
 */
function copy(src, dest) {
  var _ref6 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref6$overwrite = _ref6.overwrite,
      overwrite = _ref6$overwrite === undefined ? false : _ref6$overwrite;

  var stat = _fsExtra2.default.lstatSync(src);
  if (stat.isDirectory()) {
    if (_fsExtra2.default.existsSync(dest) && overwrite) {
      rmdir(dest);
    }
    _fsExtra2.default.mkdirSync(dest);

    var files = _fsExtra2.default.readdirSync(src);
    files.forEach(function (file) {
      var filePath = _path2.default.resolve(src, file);
      var destFilePath = _path2.default.resolve(dest, file);
      copy(filePath, destFilePath);
    });
  } else {
    copyFile(src, dest);
  }
}

/**
 * concatMappedArrays(['one', 'two'], {
 *   one: [1],
 *   two: [2],
 *   three: [3],
 * })
 * => [1,2]
 */
function concatMappedArrays(keys, mappedArrays) {
  return keys.reduce(function (arr, key) {
    if (!mappedArrays[key]) {
      return arr;
    }
    if (mappedArrays[key].constructor !== Array) {
      return arr;
    }

    return arr.concat(mappedArrays[key]);
  }, []);
}

/**
 * requires a json file, executes a deep merge, and then writes the merged
 * content back into the json file
 * *might want to consider separating the file operation from the merge
 * operation
 *
 * @param {Object} opts
 * @param {Object} json - json to merge
 * @param {String} dest - destination file path of json file to merge into
 */
function mergeToJsonFile(_ref7) {
  var jsonToMerge = _ref7.json,
      dest = _ref7.dest;

  var json = requireJson(dest);

  // log out the merging json
  var jsonStr = (0, _stringify2.default)(jsonToMerge, null, '  ');
  var paddedJsonStr = leftPad(jsonStr, ' ', 2);
  console.log(_chalk2.default.yellow('\n  Merging -> ' + dest));
  console.log(_chalk2.default.yellow(paddedJsonStr));
  console.log('');

  var mergedJson = deepMergeJson(json, jsonToMerge);
  _fsExtra2.default.writeFileSync(dest, (0, _stringify2.default)(mergedJson, null, '  '));
}