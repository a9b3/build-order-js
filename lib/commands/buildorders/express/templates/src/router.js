import { Router } from 'express'
import cors       from 'cors'
import config     from 'config'
import index      from 'controllers/index.js'

const router = new Router()

router.use(cors({
  origin: (origin, callback) => {
    const originIsInWhiteList = config.cors_origins.some(re => re.test(origin))
      callback(!originIsInWhiteList && 'Cors Issue', originIsInWhiteList)
  },
}))
router.get(`/`, index)

export default router
