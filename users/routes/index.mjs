import routes from './auth-routes.mjs'

import { Router } from 'express'

const router = Router()

routes(router)

export { router }
