const Post = require('../models/Post')

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
  }

}
