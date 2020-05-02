const passport = require('../../config/auth')
const mailer = require('../../modules/mailer')
const crypto = require('crypto')

const User = require('../models/User')

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
  },

  forgotPassword(req, res){
    res.render('auth/forgot_password', {errors: []})
  },

  async sendEmailPasswordInstructions(req, res){
    try {
      const { email } = req.body

      let errors = []

      if(!email){
        errors.push({text: 'Email inválido!'})
        return res.render('auth/forgot_password', { errors })
      }

      const user = await User.findOne({email: email})

      if(!user){
        errors.push({text: 'Não existe um usuário cadastrado com esse email.'})
        return res.render('auth/forgot_password', { errors })
      }

      const now = new Date()
      now.setHours(now.getHours() + 1)

      const token = crypto.randomBytes(20).toString('hex')

      await User.updateOne(
        { _id: user._id },
        { $set: { passwordResetToken: token, passwordResetExpires: now } }
      )

      const { SERVER_HOST, SERVER_PORT} = process.env

      const link = `http://${SERVER_HOST}:${SERVER_PORT}/auth/reset-password?id=${user._id}&token=${token}`

      await mailer.send({
        template: 'forgot_password',
        message: {
          from: 'blogapp <no-reply@blogapp.com>',
          to: email,
          subject: 'Esqueceu a senha?'
        },
        locals: {
          link
        },
      })

      req.flash("success_msg", "Email enviado com sucesso!")
      res.redirect('/')

    } catch (error) {
      console.log('Erro ao enviar email!', error)
      req.flash("error_msg", "Houve um erro ao enviar o email!")
      res.redirect('/')
    }
  },

  async resetPasswordForm(req, res){
    res.render('auth/reset_password', {id: req.query.id, token: req.query.token, errors: []})
  },

  async resetPasswordConfirm(req, res){
    const { id, token, password, passwordConfirmation } = req.body

    try{
      let errors = []

      const user = await User.findById(id).select('+passwordResetToken passwordResetExpires')

      if(!user){
        errors.push({text: 'Não foi possível encontrar seu usuário!'})
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

      if(token != user.passwordResetToken){
        errors.push({text: 'token inválido.'})
      }

      if(new Date() > user.passwordResetExpires){
        errors.push({text: 'Tempo expirado.'})
      }

      if(errors.length > 0){
        return res.render('auth/reset_password', { id, token, errors  })
      }

      user.password = password
      await user.save()

      req.flash("success_msg", "Senha redefinida com sucesso!")
      res.redirect('/')
    }
    catch(err){
      req.flash("error_msg", "Erro interno!")
      res.redirect('/')
    }
  }

}
