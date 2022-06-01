import config from '../config/auth-config.mjs'

import { AmqpClient } from './mailer.mjs'
import { db } from '../models/user.mjs'

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const { user: User } = db

AmqpClient.createConnection().catch(() => {
  throw new Error("Can't initialize connection with the host. Please verify if RabbitMQ server is running")
})

export function signup(req, res)
{
  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    email: req.body.email
  })
    .then(() => {
      res.send({ message: 'User was registered successfully' })
      AmqpClient.sendMail(req.body.email)
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
    })
}

export function signin(req, res)
{
  User.findOne({ where: { username: req.body.username } })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'User Not found' })
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      )

      if (!passwordIsValid) {
        return res.status(401).send({
          message: 'Invalid Password',
          accessToken: null
        })
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      })

      res.status(200).send({
        id: user.id,
        username: user.username,
        accessToken: token
      })
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
    })
}
