'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _helper = require('./helper.js');

var helper = _interopRequireWildcard(_helper);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adapters = {
  npm: {
    add: function add(keys, _ref) {
      var dev = _ref.dev;

      keys = [].concat(keys);
      var options = dev ? '--save-dev' : '--save';
      return helper.execPromise('npm i ' + keys.join(' ') + ' ' + options, { log: true });
    }
  },

  yarn: {
    add: function add(keys, _ref2) {
      var dev = _ref2.dev;

      keys = [].concat(keys);
      var options = dev ? '--dev' : '--save';
      return helper.execPromise('yarn add ' + keys.join(' ') + ' ' + options, { log: true });
    }
  }
};

var NpmClientAdapter = function () {
  function NpmClientAdapter() {
    (0, _classCallCheck3.default)(this, NpmClientAdapter);
    this.adapter = null;
  }

  (0, _createClass3.default)(NpmClientAdapter, [{
    key: 'setAdapter',
    value: function setAdapter(key) {
      if (!adapters[key]) {
        throw new Error('\'' + key + '\' is not a valid npm client use \'npm\' or \'yarn\'');
      }
      this.adapter = adapters[key];
    }
  }, {
    key: 'add',
    value: function add() {
      var _adapter;

      return (_adapter = this.adapter).add.apply(_adapter, arguments);
    }
  }]);
  return NpmClientAdapter;
}();

exports.default = new NpmClientAdapter();