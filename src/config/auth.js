const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

const User = require('../app/models/User')

passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, async (email, password, done) => {
  const user = await User.findOne({email: email})

  if(!user){
    return done(null, false, { message: 'Esta conta não existe!'})
  }

  if(!await bcrypt.compare(password, user.password)){
    return done(null, false, { message: 'Senha incorreta!'})
  }
  return done(null, user)
}))

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser( (id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

module.exports = passport
