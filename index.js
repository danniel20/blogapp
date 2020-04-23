const express = require('express')
const app = express()

require('./src/config/database')
require('./src/config/middlewares')(app)

app.use(require('./src/config/routes'))

app.listen(process.env.PORT || 8080, () => {
  console.log('Server is running...')
})
