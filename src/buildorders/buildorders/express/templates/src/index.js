import logger from 'logger'
import config from 'config'
import app    from 'express/app'
import pkg    from '../package.json'

/*
 * Main entry point to the app. Do synchronous initialization stuff here e.g.
 * database initialization, etc.
 */
async function main() {
  // print out configuration information
  logger.info(`${pkg.name || 'name'} - ${pkg.version || 'version'}`)
  logger.info(``, config)

  await app.listen(config.PORT)
  logger.info(`listening on port ${config.PORT}...`)
}

// Start it up
main().catch(err => {
  logger.error(err)
  process.exit()
})
