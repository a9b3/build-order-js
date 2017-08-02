import winston from 'winston'
import config  from '../config.js'

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console(),
  ],
})

// Set log level to only log out errors in production.
if (['production', 'test'].indexOf(config.APP_ENV) > -1) {
  logger.transports.console.level = 'error'
}

export default logger
