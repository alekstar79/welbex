import routes from './record-routes.mjs'

import { Router } from 'express'

const router = Router()

routes(router)

export { router }
