'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = process.env.NODE_ENV || 'dev';

var config = {};

var envOverrides = {
  port: process.env.PORT
};

config.dev = {
  port: envOverrides.port || 8080
};

config.test = {
  port: envOverrides.port || 8081
};

config.travis = {
  port: envOverrides.port || 8080
};

config.prod = {
  port: envOverrides.port || 8080
};

exports.default = (0, _assign2.default)({}, config[env]);