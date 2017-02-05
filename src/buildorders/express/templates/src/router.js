import { Router } from 'express'
import index from './controllers/index.js'

const router = new Router()

router.get(`/`, index)

export default router
