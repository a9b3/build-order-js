import config from 'config'
import bunyan from 'bunyan'
const log = bunyan.createLogger({ name: 'error-handling' })

/**
 * Logs errors to stdout before passing it along.
 */
export function logErrors(err, req, res, next) {
  if (config.env !== 'test') {
    log.info(err)
    next(err)
  } else {
    next(err)
  }
}

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
export function lastErrorHandler(err, req, res, _) {
  const fallbackError = {
    status: 500,
  }
  // default
  if (!err instanceof Error) fallbackError.message = 'Internal Server Error'
  if (typeof err === 'string') fallbackError.message = err

  if (err instanceof Error) {
    fallbackError.status = err.status || 500
    fallbackError.message = err.message || err.toString()
  }

  return res.status(fallbackError.status).json({ message: fallbackError.message })
}
