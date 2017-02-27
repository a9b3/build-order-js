'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = process.env.NODE_ENV || 'development';

var config = {
  default: {
    env: env,
    port: 8080,
    cors_origins: [/\.*/]
  },
  development: {},
  test: {
    port: 8081
  },
  // deploy targets
  staging: {
    cors_origins: [/\.*/]
  },
  production: {
    cors_origins: [/\.CHANGEME.com/]
  }
};

var selectedConfig = (0, _assign2.default)({}, config.default, config[env] || {});
module.exports = (0, _assign2.default)({}, selectedConfig, {
  port: process.env.SERVICE_PORT || selectedConfig.port
});