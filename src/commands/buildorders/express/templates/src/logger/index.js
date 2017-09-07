import bunyan from 'bunyan'

import config from 'config'

/**
 * eg.
 * const logger = require('logger.js').createLogger(__filename)
 *
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
export function createLogger(name) {
  const level = config.BUNYAN_LOG_LEVEL || 'info'

  return bunyan.createLogger({
    name,
    level,
  })
}
