import nodemailer from 'nodemailer'
import Email from 'email-templates'
import path from 'path'

import {mailConfig} from '../config/mail'

// Create a SMTP transporter object
const transporter = nodemailer.createTransport({
  host: mailConfig.host,
  port: mailConfig.port,
  auth: {
    user: mailConfig.user,
    pass: mailConfig.password
  }
})

const email = new Email({
  transport: transporter,
  send: true,
  preview: false,
  views: {
    options: {
      extension: 'ejs',
    },
    root: path.resolve('./src/app/views/mails')
  },
})

export default email
