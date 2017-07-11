import { tryCatchMiddleware } from 'helpers/try-catch-middleware'

async function foo(req, res) {
  res.send('ok')
}

export default tryCatchMiddleware(foo)
