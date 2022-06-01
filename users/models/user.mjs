import Sequelize from 'sequelize/lib/sequelize'
import config from '../config/db-config.mjs'

const { DB, HOST, PORT, USER, PASSWORD } = config

const { PG_DB = DB, PG_HOST = HOST, PG_PORT = PORT, PG_USER = USER, PG_PASSWORD = PASSWORD } = process.env

const sequelize = new Sequelize(
  PG_DB,
  PG_USER,
  PG_PASSWORD,
  {
    host: PG_HOST || 'localhost',
    port: PG_PORT || 5432,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min
    }
  }
)

export const db = {
  Sequelize,
  sequelize,
  user: sequelize.define('users', {
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    }
  })
}
