import { checkDuplicateUsernameOrEmail } from '../middlewares/verify-sign-up.mjs'
import { signup, signin } from '../controllers/auth-controller.mjs'

export default function(router)
{
  router.post('/signin', signin)

  router.post(
    '/signup',
    [checkDuplicateUsernameOrEmail],
    signup
  )
}
