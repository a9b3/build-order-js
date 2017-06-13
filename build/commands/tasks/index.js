'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./babel/index.js');

Object.defineProperty(exports, 'babel', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

var _index2 = require('./bootstrap/index.js');

Object.defineProperty(exports, 'bootstrap', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index2).default;
  }
});

var _index3 = require('./ci/index.js');

Object.defineProperty(exports, 'ci', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index3).default;
  }
});

var _index4 = require('./docker/index.js');

Object.defineProperty(exports, 'docker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index4).default;
  }
});

var _index5 = require('./eslint/index.js');

Object.defineProperty(exports, 'eslint', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index5).default;
  }
});

var _index6 = require('./test/index.js');

Object.defineProperty(exports, 'test', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index6).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }