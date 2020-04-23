const passport = require('../../config/auth')

module.exports = {

  form(req, res){
    res.render('auth/login', {errors: []})
  },

  login(req, res){
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/auth/login',
      failureFlash: true,
      successFlash: 'Usuário logado com sucesso!'
    })(req, res)
  },

  async logout(req, res){
    req.logout() // função adicionada do passport
    req.flash("success_msg", "Usuário deslogado com sucesso.")
    res.redirect("/")
  }

}
