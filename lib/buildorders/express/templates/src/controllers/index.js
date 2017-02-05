import { tryCatchMiddleware } from '../services/middleware-helper.js'

async function foo(req, res) {
  res.send('ok')
}

export default tryCatchMiddleware(foo)
