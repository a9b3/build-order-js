import { Router }                from 'express'

import index                     from 'express/controllers/index'
import { asyncMiddleware, cors } from 'express/middlewares'

const router = new Router()

router.use(cors)

router.get(`/`, asyncMiddleware(index))

export default router
