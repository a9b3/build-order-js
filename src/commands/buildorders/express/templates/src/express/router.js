import { Router }  from 'express'
import cors        from 'cors'

import config      from 'config'
import index       from 'express/controllers/index'
import {asyncWrap} from 'helpers/try-catch-middleware'

const router = new Router()

router.use(cors({
  origin: (origin, callback) => {
    const originIsInWhiteList = config.CORS_ORIGINS.some(re => re.test(origin))
    callback(!originIsInWhiteList && 'Cors Issue', originIsInWhiteList)
  },
}))

router.get(`/`, asyncWrap(index))

export default router
