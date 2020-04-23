const Post = require('../models/Post')
const Category = require('../models/Category')

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

  async show(req, res){
    try{
      const post = await Post.findById(req.params.id)
      res.render('posts/index', {post})
    }
    catch(err){
      req.flash("error_msg", "Erro ao buscar post")
      res.redirect('/categories')
    }
  },

  async byCategory(req, res){
    try{
      const category = await Category.findById(req.params.id)

      if(!category){
        req.flash("error_msg", "Erro ao buscar category")
        return res.redirect('/categories')
      }

      const posts = await Post.find({category: category._id})

      if(!posts){
        req.flash("error_msg", "Erro ao buscar posts")
        return res.redirect('/categories')
      }

      res.render('categories/posts', {posts})
    }
    catch(err){
      console.log(err)
      req.flash("error_msg", "Erro interno!")
      res.redirect('/categories')
    }
  }
}
