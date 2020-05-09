import './src/config/database'
import app from './src/config/middlewares'
import route from './src/config/routes'

app.use(route)

app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
  console.log('Server is running...')
})
