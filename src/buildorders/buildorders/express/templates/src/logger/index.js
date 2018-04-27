import bunyan from 'bunyan'

import config from 'config'

/**
 * Log levels
 * https://github.com/trentm/node-bunyan#levels
 *
 * TL;DR;
 * fatal 60
 * error 50
 * warn 40
 * info 30
 * debug 20
 * trace 10
 */
export default bunyan.createLogger({
  name: config.LOG_NAME,
  level: config.BUNYAN_LOG_LEVEL,
})
