const User = require('../models/User')

module.exports = {

  new(req, res){
    res.render('users/new', {user: new User({_id: null}), errors: []})
  },

  async edit(req, res){
    try{
      const user = await User.findById(req.params.id)
      res.render('users/edit', {user, errors: []})
    }
    catch(err){
      req.flash("error_msg", "Erro ao carregar formulário.")
      res.redirect('/')
    }
  },

  async saveOrUpdate(req, res){
    try{
      const user = new User(req.body)
      user._id = req.body.id

      let errors = []

      if(!user.name){
        errors.push({text: 'Nome inválido!'})
      }

      if(!user.email){
        errors.push({text: 'Email inválido!'})
      }

      if(!user.password){
        errors.push({text: 'Senha inválida!'})
      }

      if(user.password.length < 4){
        errors.push({text: 'Senha muito curta!'})
      }

      if(user.password != req.body.passwordConfirmation){
        errors.push({text: 'Confirmação de senha diferente da senha, tente novamente.'})
      }

      if(errors.length > 0){
        return res.render(req.body.id ? 'users/edit' : 'users/new', { user, errors  })
      }

      const userToEdit = await User.findById(user._id)

      if(userToEdit){

        if(userToEdit.email != user.email && await User.findOne({email: user.email})){
          errors.push({text: 'Já existe um usuário cadastrado com esse email.'})
          return res.render('users/shared/form', { user, errors })
        }

        userToEdit.photo = user.file.path
        userToEdit.name = user.name
        userToEdit.email = user.email
        userToEdit.password = user.password
        userToEdit.isAdmin = user.isAdmin

        await userToEdit.save()

        req.flash("success_msg", "Usuário editado com sucesso.")
        res.redirect('/admin/users')
      }
      else{

        if(await User.findOne({email: user.email})){
          errors.push({text: 'Já existe um usuário cadastrado com esse email.'})
          return res.render('users/shared/form', { user, errors  })
        }

        delete req.body.passwordConfirmation
        await User.create({...req.body, photo: req.file.filename})

        req.flash("success_msg", "Usuário criado com sucesso.")
        res.redirect('/')
      }

    }
    catch(err){
      console.log(err)
      req.flash("error_msg", "Erro ao registrar usuário.")
      res.redirect('/')
    }
  }

}
