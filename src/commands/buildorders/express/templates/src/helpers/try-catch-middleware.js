/**
 * Wraps es2017 async functions so it can detect errors
 *
 * ex.
 *
 * A traditional express middleware looks like this
 *
 * function(req, res, next) {
 *   // ex 1. do stuff
 *   fooPromise.then(() => { next() })
 *   .catch(next)
 *
 *   // ex 2. or simply
 *   throw new Error('this will propogate up')
 *
 *   // ex 3. or errors in callbacks
 *   fooPromise.then(() => {  throw new Error('this is uncaught') })
 * }
 *
 * Using async/await, all async functions are promises so you have to catch
 * errors thrown in them
 *
 * async function foo() {}
 * export default tryCatchMiddleware(foo)
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
export function asyncWrap(...args) {
  return tryCatchMiddleware(...args)
}

/**
 * Decorator for an async express middleware
 */
export function tryCatch(target, key, descriptor) {
  const fn = descriptor.value
  const newFn = async(req, res, next) => {
    try {
      await fn.call(target, req, res, next)
    } catch (e) {
      next(e)
    }
  }

  descriptor.value = newFn
  return descriptor
}
