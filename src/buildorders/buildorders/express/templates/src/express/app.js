import bodyParser    from 'body-parser'
import express       from 'express'
import helmet        from 'helmet'
import morgan        from 'morgan'

import config        from 'config'
import { lastError } from 'express/middlewares'
import router        from 'express/router'

const app = express()

// mount global middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(
  morgan(
    `[morgan] :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"`,
  ),
)
if (config.APP_ENV === 'production') {
  app.use(helmet())
}

// mount router
app.use(router)
app.use(lastError)

export default app
