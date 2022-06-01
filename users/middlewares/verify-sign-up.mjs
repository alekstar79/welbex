import { db } from '../models/user.mjs'

const { user: User } = db

export function checkDuplicateUsernameOrEmail(req, res, next)
{
  User.findOne({ where: { username: req.body.username } })
    .then(user => {
      if (user) {
        return res.status(400).send({
          message: 'Failed username is already in use'
        })
      }

      User.findOne({ where: { email: req.body.email } })
        .then(user => {
          if (user) {
            return res.status(400).send({
              message: 'Failed email is already in use'
            })
          }

          next()
        })
    })
}
