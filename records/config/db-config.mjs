const { PG_HOST = 'localhost', PG_PORT = 5432, PG_USER = 'welbex', PG_DB = 'welbex_records', PG_PASSWORD = 'pass12345' } = process.env

export default {
  HOST: PG_HOST,
  PORT: PG_PORT,
  USER: PG_USER,
  PASSWORD: PG_PASSWORD,
  DB: PG_DB,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
