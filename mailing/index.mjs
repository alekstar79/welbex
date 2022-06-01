import { amqp, smtp, queueName } from './config/mailer-config.mjs'
import { listen } from './mailer.mjs'

;(async () => {

  try {

    await listen(amqp, smtp, queueName)

  } catch (e) {
    console.log(e.message)
  }

})()
