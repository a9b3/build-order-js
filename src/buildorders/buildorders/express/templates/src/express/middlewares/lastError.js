import config from 'config'
import logger from 'logger'

/*
 * fall back error handler for express server, add to the end of all route
 * definitions so anything that isn't caught will propagate to this handler. Use
 * this at the end of the middleware chain.
 *
 * ex.
 *
 * // apply other stuff to express app
 * app.use(lastErrorHandler)
 */
export default function lastErrorHandler(
  err,
  req,
  res,
  next, // eslint-disable-line
) {
  if (config.APP_ENV !== 'test') {
    logger.error(err.stack)
  }

  // Do not show stack trace to production users.
  if (config.APP_ENV === 'production') {
    delete err.stack
  }

  return res.status(err.status || 500).json({
    message: err.message,
  })
}
