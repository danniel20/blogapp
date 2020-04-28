const mongoose = require('mongoose')

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env

mongoose.connect(
  `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
  {
    useNewUrlParser: true
  }
).then(() => console.log('Conectado ao mongo...'))
 .catch(error => {
    const msg = 'ERRO! Não foi possível conectar com o MongoDB!' + error
    console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
})

module.exports = mongoose
