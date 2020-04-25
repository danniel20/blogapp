const Post = require('../../models/Post')
const Category = require('../../models/Category')

module.exports =  {

  async index(req, res) {
    try {
      const posts = await Post.find().populate("category").sort({ createdAt: 'desc' })
      res.render('admin/posts/index', { posts })

    } catch (err) {
      req.flash("error_msg", "Erro ao listar posts, tente novamente.")
      res.redirect('/admin')
    }
  },

  async new(req, res) {
    try {
      const categories = await Category.find().sort({ createdAt: 'desc' })
      res.render('admin/posts/new', { post: new Post({_id: null}), categories, errors: [] })
    }
    catch (err) {
      console.log(err)
      req.flash("error_msg", "Erro ao carregar formulário.")
      res.redirect('/admin/posts')
    }
  },

  async edit(req, res) {
    try {
      const post = await Post.findById(req.params.id).populate("category")

      if (!post) {
        req.flash("error_msg", "Post não encontrado, tente novamente.")
        return res.redirect('/admin/posts')
      }

      const categories = await Category.find()
      res.render('admin/posts/edit', { post, categories, errors: [] })
    }
    catch (err) {
      req.flash("error_msg", "Erro ao carregar formulário de edição.")
      res.redirect('/admin/posts')
    }
  },

  async saveOrUpdate(req, res){
    try {
      const post = new Post(req.body)
      post._id = req.body.id

      let errors = []

      if (!post.title) {
        errors.push({ text: "Nome inválido" })
      }

      if (!post.description) {
        errors.push({ text: "Descrição inválida" })
      }

      if (!post.content) {
        errors.push({ text: "Conteúdo inválido" })
      }

      if (post.category == 0) {
        errors.push({ text: "Categoria inválida, registre uma categoria" })
      }

      if (errors.length > 0) {
        const categories = await Category.find().sort({ createdAt: 'desc' })
        return res.render(req.body.id ? 'admin/posts/edit' : 'admin/posts/new', { post, categories, errors  })
      }

      const postToEdit = await Post.findById(post._id)

      if(postToEdit){
        postToEdit.title = post.title
        postToEdit.description = post.description
        postToEdit.content = post.content
        postToEdit.category = post.category

        await postToEdit.save()

        req.flash("success_msg", "Post editado com sucesso.")
        res.redirect('/admin/posts')
      }
      else{
        await Post.create(req.body)
        req.flash("success_msg", "Post criado com sucesso!")
        res.redirect('/admin/posts')
      }
    }
    catch (err) {
      req.flash("error_msg", "Erro ao salvar post, tente novamente.")
      res.redirect('/admin/posts/shared/form', { post, categories, errors  })
    }
  },


  async delete(req, res) {
    try {
      if (await Post.deleteOne({ _id: req.body.id })) {
        req.flash("success_msg", "Post removido com sucesso.")
        res.redirect('/admin/posts')
      }
    }
    catch (err) {
      req.flash("error_msg", "Erro ao deletar post.")
      res.redirect('/admin/posts')
    }
  }
}
