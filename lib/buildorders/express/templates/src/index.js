import path from 'path'
// add these to NODE_PATH to enable using absolute paths in require
require('app-module-path').addPath(path.resolve(__dirname, '..'))
require('app-module-path').addPath(__dirname)
import bunyan from 'bunyan'
import server from './server.js'
import config from '../config.js'
import pkg from '../package.json'
const logger = bunyan.createLogger({ name: 'init' })

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

  await server.listen(config.port)
  logger.info(`listening on port ${config.port}`)
}

// Start it up
main()
.catch(logger.error)
