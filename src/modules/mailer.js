const nodemailer = require('nodemailer')
const Email = require('email-templates')
const path = require('path')

const mailConfig = require('../config/mail')

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

module.exports = email
