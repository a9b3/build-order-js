const env = process.env.NODE_ENV || 'development'

const config = {
  default: {
    env,
    port: 8080,
    cors_origins: [/\.*/],
  },
  development: {},
  test: {
    port: 8081,
  },
  // deploy targets
  staging: {
    cors_origins: [/\.*/],
  },
  production: {
    cors_origins: [/\.CHANGEME.com/],
  },
}

const selectedConfig = Object.assign({}, config.default, config[env] || {})
module.exports = Object.assign({}, selectedConfig, {
  port: process.env.SERVICE_PORT || selectedConfig.port,
})
