import Post from '../models/Post'

export const HomeController = {

  async index(req, res){
    try{
      const { page = 1 } = req.query

      const posts = await Post.find()
        .populate('category')
        .limit(4)
        .skip((page - 1) * 4)
        .sort({createdAt: 'desc'})

      const total = await Post.find().count()

      res.render('index', {posts, total})
    }
    catch(err){
      req.flash("error_msg", "Erro ao listar posts")
      res.redirect('/')
    }
  }

}
