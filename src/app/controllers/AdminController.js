const Category = require('../models/Category')
const Post = require('../models/Post')

module.exports = {

  index(req, res) {
    res.render('admin/index')
  },

  async listCategories(req, res) {
    try {
      const categories = await Category.find().sort({ createdAt: 'desc' })
      res.render('admin/categories/index', { categories })

    } catch (err) {
      req.flash("error_msg", "Erro ao listar categorias, tente novamente.")
      res.redirect('/admin')
    }
  },

  newCategory(req, res) {
    res.render('admin/categories/new', {category: new Category(), errors: []})
  },

  async editCategory(req, res) {
    try {
      const category = await Category.findById(req.params.id)

      if (!category) {
        req.flash("error_msg", "Erro ao selecionar categoria, tente novamente.")
        return res.redirect('/admin/categories/index')
      }

      res.render('admin/categories/edit', { category, errors: [] })
    }
    catch (err) {
      req.flash("error_msg", "Erro interno.")
      res.redirect('/admin/categories/index')
    }
  },

  async saveOrUpdateCategory(req, res) {
    try {
      const category = new Category(req.body)

      let errors = []

      if (!category.name) {
        errors.push({ text: "Nome inválido" })
      }

      if (!category.label) {
        errors.push({ text: "Label inválido" })
      }

      if (errors.length > 0) {
        return res.render(category.id ? 'admin/categories/edit': 'admin/categories/new', {category, errors })
      }

      const categoryToEdit = await Category.findById(req.body.id)

      if (categoryToEdit) {
        categoryToEdit.name = category.name
        categoryToEdit.label = category.label

        await categoryToEdit.save()
        req.flash("success_msg", "Categoria editada com sucesso.")
        res.redirect('/admin/categories')
      }
      else{
        await Category.create(category)
        req.flash("success_msg", "Categoria criada com sucesso!")
        res.redirect('/admin/categories')
      }

    }catch(err){
      req.flash("error_msg", "Erro ao salvar categoria, tente novamente.")
      res.render('admin/categories/shared/form', {category, errors})
    }
  },

  async deleteCategory(req, res) {
    try {
      await Category.findByIdAndRemove(req.body.id)
      req.flash("success_msg", "Categoria removida com sucesso.")
      res.redirect('/admin/categories')
    }
    catch (err) {
      req.flash("error_msg", "Erro ao deletar categoria.")
      res.redirect('/admin/categories')
    }
  },

  async listPosts(req, res) {
    try {
      const posts = await Post.find().populate("category").sort({ createdAt: 'desc' })
      res.render('admin/posts/index', { posts })

    } catch (err) {
      req.flash("error_msg", "Erro ao listar posts, tente novamente.")
      res.redirect('/admin')
    }
  },

  async newPost(req, res) {
    try {
      const categories = await Category.find().sort({ createdAt: 'desc' })
      res.render('admin/posts/new', { post: new Post({_id: null}), categories, errors: [] })
    }
    catch (err) {
      req.flash("error_msg", "Erro ao carregar formulário.")
      res.redirect('/admin/posts')
    }
  },

  async editPost(req, res) {
    try {
      const post = await Post.findById(req.params.id).populate("category")

      if (!post) {
        req.flash("error_msg", "Post não existe, tente novamente.")
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

  async saveOrUpdatePost(req, res){
    try {
      const post = new Post(req.body)
      post._id = null

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
        return res.render(post.id ? 'admin/posts/edit' : 'admin/posts/new', { post, categories, errors  })
      }

      const postToEdit = await Post.findById(req.body.id)

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
        await Post.create(post)
        req.flash("success_msg", "Post criado com sucesso!")
        res.redirect('/admin/posts')
      }
    }
    catch (err) {
      req.flash("error_msg", "Erro ao salvar post, tente novamente.")
      res.redirect('/admin/posts/shared/form', { post, categories, errors  })
    }
  },


  async deletePost(req, res) {
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
