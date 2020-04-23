const User = require('../models/User')

module.exports = {

  new(req, res){
    res.render('users/form', {errors: []})
  },

  async create(req, res){
    const { name, email, password, passwordConfirmation, isAdmin } = req.body

    let errors = []

    if(!name){
      errors.push({text: 'Nome inválido!'})
    }

    if(!email){
      errors.push({text: 'Email inválido!'})
    }

    if(!password){
      errors.push({text: 'Senha inválida!'})
    }

    if(password.length < 4){
      errors.push({text: 'Senha muito curta!'})
    }

    if(password != passwordConfirmation){
      errors.push({text: 'Confirmação de senha diferente da senha, tente novamente.'})
    }

    if(errors.length > 0){
      return res.render('users/form', { errors: errors})
    }

    try{
      const user = await User.findOne({email: email})

      if(user){
        req.flash("error_msg", "Usuário já cadastrado com esse e-mail!")
        return res.redirect('/users/new')
      }

      delete req.body.passwordConfirmation
      await User.create(req.body)

      req.flash("success_msg", "Usuário criado com sucesso.")
      return res.redirect('/')

    }
    catch(err){
      req.flash("error_msg", "Erro ao registrar user.")
      res.redirect('/')
    }

  }

}
