import express          from 'express'
import config           from 'config'
import bodyParser       from 'body-parser'
import helmet           from 'helmet'
import morgan           from 'morgan'
import lastErrorHandler from './middlewares/error-handling.js'
import router           from './router.js'

class Server {
  app = express()
  server = null

  constructor() {
    this._bootstrap()
    this._mountRoutes()
  }

  _bootstrap = () => {
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(morgan(`[morgan] :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"`))

    // only add these middlewares in prod
    if (config.APP_ENV === 'production') {
      this.app.use(helmet())
    }
  }

  _mountRoutes = () => {
    this.app.use(router)
    this.app.use(lastErrorHandler)
  }

  listen(port = 8080) {
    return new Promise((resolve, reject) => {
      this.server = this.app.listen(port, (err) => {
        if (err) return reject(err)
        resolve()
      })
    })
  }

  async stop() {
    if (!this.server) return
    await this.server.close()
  }
}

export default new Server()
