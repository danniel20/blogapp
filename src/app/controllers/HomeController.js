import Post from '../models/Post'

export const HomeController = {

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


    req.flash("success_msg", "Seeds executado com sucesso!. Usuário Admin: { email: admin@admin, senha: 123456}")
    res.redirect("/")
  }

}
