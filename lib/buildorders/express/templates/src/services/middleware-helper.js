/**
 * Wraps es2017 async functions so it can detect errors
 *
 * @param {Function} middleware - express middleware
 * @returns {Function} wrapped middleware
 */
export function tryCatchMiddleware(middleware) {
  return (req, res, next) => {
    const promise = middleware(req, res, next)
    if (promise.catch) {
      promise.catch(e => next(e))
    }
  }
}
