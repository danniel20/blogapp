const express = require('express')
const session = require('express-session')
const passport = require('./auth')
const flash = require('connect-flash')
const helmet = require('helmet')
const cors = require('cors')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const path = require('path')

module.exports = (app) => {

  // Configurações express
  app.use(express.urlencoded({extended: true}))
  app.use(express.json())
  app.use(express.static(path.resolve('node_modules/bootstrap/dist/')))

  app.use(methodOverride('_method'))

  app.use(cors())

  // Configuração da sessão
  app.use(session({
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
  app.set('layout', 'layouts/layout')
  app.use(expressLayouts)
}
