import { envOverride } from 'js-functions'
const APP_ENV = process.env.APP_ENV || 'development'
const NODE_ENV = process.env.NODE_ENV || 'development'

const config = {}

config.development = {
  APP_ENV,
  NODE_ENV,
  PORT: 8010,
  CORS_ORIGINS: [/\.*/],
}

config.test = {
  APP_ENV,
  NODE_ENV,
  PORT: 8081,
  CORS_ORIGINS: [/\.*/],
}

config.staging = {
  APP_ENV,
  NODE_ENV,
  PORT: 8080,
  CORS_ORIGINS: [/\.*/],
}

config.production = {
  APP_ENV,
  NODE_ENV,
  PORT: 8080,
  CORS_ORIGINS: [/\.*/],
}

export default envOverride(Object.assign({}, config[APP_ENV]))
