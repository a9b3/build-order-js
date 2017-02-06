'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var initialize = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return helper.areCommandsInstalled([['yarn', 'npm'], 'git']);

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function initialize() {
    return _ref.apply(this, arguments);
  };
}();

var main = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return initialize();

          case 2:
            setupCommanderShepard();

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function main() {
    return _ref2.apply(this, arguments);
  };
}();

var _commanderShepard = require('commander-shepard');

var _commanderShepard2 = _interopRequireDefault(_commanderShepard);

var _helper = require('./helper.js');

var helper = _interopRequireWildcard(_helper);

var _npmClientAdapter = require('./npm-client-adapter.js');

var _npmClientAdapter2 = _interopRequireDefault(_npmClientAdapter);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _index = require('./commands/index.js');

var commands = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setupCommanderShepard() {
  var c = new _commanderShepard2.default({
    key: 'bojs',
    package: require('../package.json'),
    longDescription: 'Set up your javascript project procedurally',
    flags: [{
      keys: ['npm'],
      required: false,
      shortDescription: 'specify npm client to use [npm || yarn] defaults to npm'
    }, {
      keys: ['git'],
      required: false,
      shortDescription: 'initialize empty git repo'
    }],
    subcommands: [{
      key: 'tasks',
      shortDescription: 'apply tasks to the current project',
      longDescription: 'Apply a granular task to current project',
      command: commands.task
    }, {
      key: 'buildorders',
      shortDescription: 'apply build orders to the current project',
      longDescription: 'Apply a set of tasks to the current project',
      command: commands.buildorders
    }]
  });
  _npmClientAdapter2.default.setAdapter(c.flags.npm || 'npm');
  c.execute();
}

main().catch(function (e) {
  console.log(_chalk2.default.red(e.message));
});