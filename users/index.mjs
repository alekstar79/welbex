// noinspection JSCheckFunctionSignatures

import bodyParser from 'body-parser'
import express from 'express'

import './config/index.mjs'

import { router } from './routes/index.mjs'
import { db } from './models/user.mjs'

const { USERS_DOCKER_PORT: PORT = 8080 } = process.env

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/auth', router)

db.sequelize.sync({ force: true })

const server = app.listen(PORT, () => {
  const { address, port } = server.address()
  console.log('Records service started on host: %s, port: %s', address, port)
})
