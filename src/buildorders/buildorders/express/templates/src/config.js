require('dotenv').config()

const APP_ENV = process.env.APP_ENV || 'development'
const NODE_ENV = process.env.NODE_ENV || APP_ENV

export default {
  // Defaults
  APP_ENV,
  NODE_ENV,
  PORT: 8010,
  CORS_ORIGINS: [/\.*/],
  BUNYAN_LOG_LEVEL: 'info',
  LOG_NAME: 'app',
  // Env overrides
  ...{
    test: {
      BUNYAN_LOG_LEVEL: 'error',
      PORT: 8081,
    },
  }[APP_ENV],
}
