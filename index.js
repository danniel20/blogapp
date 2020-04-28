const express = require('express')
const app = express()

require('./src/config/database')
require('./src/config/middlewares')(app)

app.use(require('./src/config/routes'))

app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
  console.log('Server is running...')
})
