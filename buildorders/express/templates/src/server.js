import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import router from './router.js'

export default class Server {
  _bootstrap = () => {
    this.app.use(cors())
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
  }

  _setupRouter = () => {
    this.app.use(router)
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
