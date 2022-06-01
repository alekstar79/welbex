import { queueName, amqp } from '../config/mailer-config.mjs'
import { connect } from 'amqplib'

export class AmqpClient
{
  static async createConnection()
  {
    AmqpClient.conn || (AmqpClient.conn = await connect(amqp))

    if (!AmqpClient.ch) {
      AmqpClient.ch = await AmqpClient.conn.createChannel()
      await AmqpClient.ch.assertQueue(queueName)
    }
  }

  static sendMail(email)
  {
    AmqpClient.ch.sendToQueue(queueName, Buffer.from(email))
  }
}
