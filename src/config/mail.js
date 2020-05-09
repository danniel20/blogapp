const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_SENDER } = process.env

export const mailConfig = {
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  user: EMAIL_USER,
  password: EMAIL_PASS,
  sender: EMAIL_SENDER
}
