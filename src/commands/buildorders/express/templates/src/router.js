import { Router } from 'express'
import cors       from 'cors'
import config     from './config.js'
import index      from './controllers/index.js'

const router = new Router()

router.use(cors({
  origin: (origin, callback) => {
    const originIsInWhiteList = config.CORS_ORIGINS.some(re => re.test(origin))
    callback(!originIsInWhiteList && 'Cors Issue', originIsInWhiteList)
  },
}))
router.get(`/`, index)

export default router
