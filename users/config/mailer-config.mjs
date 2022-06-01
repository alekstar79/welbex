const { RMQ_HOST: HOST = 'localhost', RMQ_PORT: PORT = 5672, RMQ_USER: USER = 'guest', RMQ_PASS: PASS = 'guest' } = process.env

export const queueName = 'mail'

export const amqp = {
  protocol: 'amqp',
  username: USER,
  password: PASS,
  hostname: HOST,
  port: PORT
}
