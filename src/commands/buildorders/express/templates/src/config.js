import { envOverride } from 'js-functions'
const APP_ENV = process.env.APP_ENV || 'development'
const NODE_ENV = process.env.NODE_ENV || 'development'

const config = {}

config.development = {
  APP_ENV,
  NODE_ENV,
  PORT: 8010,
  CORS_ORIGINS: [/\.*/],
  BUNYAN_LOG_LEVEL: 'info',
}

config.test = {
  APP_ENV,
  NODE_ENV,
  PORT: 8081,
  CORS_ORIGINS: [/\.*/],
  BUNYAN_LOG_LEVEL: 'error',
}

config.staging = {
  APP_ENV,
  NODE_ENV,
  PORT: 8080,
  CORS_ORIGINS: [/\.*/],
  BUNYAN_LOG_LEVEL: 'info',
}

config.production = {
  APP_ENV,
  NODE_ENV,
  PORT: 8080,
  CORS_ORIGINS: [/\.*/],
  BUNYAN_LOG_LEVEL: 'info',
}

export default envOverride(Object.assign({}, config[APP_ENV]))
