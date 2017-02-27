import { Router } from 'express'
import index from './controllers/index.js'
import config from '../config.js'
import cors from 'cors'

const router = new Router()

router.use(cors({
  origin: (origin, callback) => {
    const originIsInWhiteList = config.cors_origins.some(re => re.test(origin))
      callback(!originIsInWhiteList && 'Cors Issue', originIsInWhiteList)
  },
}))
router.get(`/`, index)

export default router
