const express = require('express')
const app = express()
require('dotenv').config()

require('./src/config/database')
require('./src/config/middlewares')(app)

app.use(require('./src/config/routes'))

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log('Server is running...')
})
