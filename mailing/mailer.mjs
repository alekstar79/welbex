import { createTransport, createTestAccount } from 'nodemailer'
import { connect } from 'amqplib'

/**
* Starts listenning the emails queue and sending messages
* @param {Object} amqpOptions
* @param {Object} smtpOptions
* @param {String} queueName
*/
export async function listen(amqpOptions, smtpOptions, queueName)
{
  let nodeMailerTransport, testEmailAccount, connection, ch

  if (!smtpOptions.auth.user) {
    testEmailAccount = await createTestAccount()

    smtpOptions.auth.user = testEmailAccount.user
    smtpOptions.auth.pass = testEmailAccount.pass
  }

  nodeMailerTransport = createTransport(smtpOptions)

  connection = await connect(amqpOptions)

  ch = await connection.createChannel()

  await ch.assertQueue(queueName)

  ch.consume(queueName, msg => {
    let email

    if (msg !== null) {
      email = msg.content.toString()

      nodeMailerTransport.sendMail({
        from: '"WelbeX" <hello@welbex.ru>',
        to: email,
        subject: 'Greeting from WelbeX',
        text: 'This message was sent from WelbeX Service.',
        html: 'This <i>message</i> was sent from <strong>WelbeX</strong> Service.',
      })
        .then(result => {
          console.log({ email, result })
        })
        .catch(error => {
          console.log({ email, error: error.message })
        })
    }
  }, { noAck: true })
}
