import express            from 'express'
import config             from '../config.js'
import bodyParser         from 'body-parser'
import router             from './router.js'
import helmet             from 'helmet'
import morgan             from 'morgan'
import * as errorHandling from './helpers/error-handling.js'

class Server {
  _bootstrap = () => {
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(morgan(`[morgan] :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"`))

    // only add these middlewares in prod
    if (config.env === 'production') {
      this.app.use(helmet())
    }
  }

  _setupRouter = () => {
    this.app.use(router)
    this.app.use(errorHandling.logErrors)
    this.app.use(errorHandling.lastErrorHandler)
  }

  constructor() {
    this.app = express()
    this.server = undefined

    this._bootstrap()
    this._setupRouter()
  }

  listen(port = 8080) {
    return new Promise((resolve, reject) => {
      this.server = this.app.listen(port, (e) => {
        if (e) return reject(e)
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
