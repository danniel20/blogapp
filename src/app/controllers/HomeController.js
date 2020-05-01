const Post = require('../models/Post')
const User = require('../models/User')

const email = require('../../modules/mailer')

module.exports = {

  async index(req, res){
    try{
      const posts = await Post.find().populate('category').sort({createdAt: 'desc'})
      res.render('index', {posts})
    }
    catch(err){
      req.flash("error_msg", "Erro ao listar posts")
      res.redirect('/')
    }
  },

  async createUserAdmin(req, res){
    try{
      const user = new User({
        name: 'Admin',
        email: 'admin@admin.com',
        password: '123456',
        isAdmin: 1
      })

      user.save()

      req.flash("success_msg", `Usuário Admin: { email: ${user.email}, senha: ${user.password}}`)
      res.redirect("/")
    }
    catch(err){
      req.flash("error_msg", "Erro interno")
      res.redirect("/")
    }
  },

  sendEmailTeste(req, res){
    email.send({
      template: 'hello',
      message: {
        from: 'Bruce Wayne <no-reply@blog.com>',
        to: 'john@snow.com',
        subject: 'Email de Teste'
      },
      locals: {
        fname: 'John',
        lname: 'Snow',
      },
    }).then(() => console.log('email enviado!'))
      .catch(err => console.log(err))

      res.sendStatus(200)
  }

}
