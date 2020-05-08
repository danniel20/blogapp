const Post = require('../models/Post')
const User = require('../models/User')

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

  executeSeeds(req, res){
    require('../../config/seedTask')

    req.flash("success_msg", "Seeds executado com sucesso!. Usuário Admin: { email: admin@admin, senha: 123456}")
    res.redirect("/")
  }

}
