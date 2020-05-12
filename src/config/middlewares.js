import express from 'express'
import session from 'express-session'
import connectMongo from 'connect-mongo'
import passport from './auth'
import flash from 'connect-flash'
import helmet from 'helmet'
import cors from 'cors'
import expressLayouts from 'express-ejs-layouts'
import methodOverride from 'method-override'
import path from 'path'

import { connectionString } from './database'

const app = express()

// Configurações express
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(path.resolve('node_modules/bootstrap/dist/')))
app.use(express.static(path.resolve('uploads/')))

app.use(methodOverride('_method'))
app.use(cors())

// Configuração da sessão
const MongoStore = connectMongo(session)

app.use(session({
  store: new MongoStore({
    url: connectionString,
    ttl: 30 * 60 // = 30 minutos de sessão
  }),
  secret: 'my_key_secret',
  resave: false,
  saveUninitialized: true
}))

// Configuração necessárias do passport
app.use(passport.initialize())
app.use(passport.session())

// Flash messages
app.use(flash())

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg")
  res.locals.error_msg = req.flash("error_msg")
  res.locals.error = req.flash("error")
  res.locals.success = req.flash("success")
  res.locals.current_user = req.user || null //objeto user do passport
  next()
})

// Headers de segurança
app.use(helmet())
app.use(helmet.noSniff())

// Configurações da view com ejs
app.set('views', path.resolve('src/app/views'))
app.set('view engine', 'ejs')

app.use(expressLayouts)
app.set('layout', 'layouts/layout')

export default app
