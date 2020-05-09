import Post from '../models/Post'
import Category from '../models/Category'

export const PostsController = {

  async show(req, res){
    try{
      const post = await Post.findById(req.params.id)
      res.render('posts/show', {post})
    }
    catch(err){
      req.flash("error_msg", "Erro ao buscar post")
      res.redirect('/categories')
    }
  },

  async byCategory(req, res){
    try{
      const category = await Category.findById(req.params.id)
      const posts = await Post.find({category: category._id})

      res.render('categories/posts', {category, posts})
    }
    catch(err){
      req.flash("error_msg", "Erro ao buscar posts desta categoria!")
      res.redirect('/categories')
    }
  }
}
