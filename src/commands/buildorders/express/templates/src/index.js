const logger = require('logger.js').createLogger(__filename)
import config from './config.js'
import server from './server.js'
import pkg    from '../package.json'

/*
 * Main entry point to the app. Do synchronous initialization stuff here e.g.
 * database initialization, etc.
 */
async function main() {
  // print out configuration information
  logger.info(
    `\n${pkg.name || 'name'} - ${pkg.version || 'version'}\n`,
    `\nStarting server with the following configs:\n\n`,
    config,
    `\n`,
  )

  await server.listen(config.PORT)
  logger.info(`listening on port ${config.PORT}`)
}

// Start it up
main()
.catch(logger.error)
