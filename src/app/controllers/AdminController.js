const Category = require('../models/Category')
const Post = require('../models/Post')

module.exports = {

  index(req, res) {
    res.render('admin/index')
  },

  async listCategories(req, res) {
    try {
      const categories = await Category.find().sort({ createdAt: 'desc' })
      res.render('admin/categories/list', { categories })

    } catch (err) {
      req.flash("error_msg", "Erro ao listar categorias, tente novamente.")
      res.redirect('/admin')
    }
  },

  formCategory(req, res) {
    res.render('admin/categories/form', {errors: []})
  },

  async createCategory(req, res) {
    try {

      const { name, label } = req.body

      let errors = []

      if (!name) {
        errors.push({ text: "Nome inválido" })
      }

      if (!label) {
        errors.push({ text: "Slug inválido" })
      }

      if (errors.length > 0) {
        return res.render('admin/categories/form', { errors})
      }

      await Category.create(req.body)

      req.flash("success_msg", "Categoria criada com sucesso!")
      res.redirect('/admin/categories')
    }
    catch (err) {
      req.flash("error_msg", "Erro ao cadastar categoria, tente novamente.")
      res.redirect('/admin')
    }
  },

  async editCategory(req, res) {
    try {
      const category = await Category.findById(req.params.id)

      if (!category) {
        req.flash("error_msg", "Erro ao selecionar categoria, tente novamente.")
        return res.redirect('/admin/categories/list')
      }

      res.render('admin/categories/edit', { category, errors: [] })
    }
    catch (err) {
      req.flash("error_msg", "Erro interno.")
      res.redirect('/admin/categories/list')
    }
  },

  async updateCategory(req, res) {
    try {
      const category = req.body

      let errors = []

      if (!category.name) {
        errors.push({ texto: "Nome inválido" })
      }

      if (!category.label) {
        errors.push({ texto: "Label inválido" })
      }

      if (errors.length > 0) {
        return res.render('admin/categories/edit', { category, errors })
      }

      const categoryToEdit = await Category.findById(category.id)

      if (!categoryToEdit) {
        req.flash("error_msg", "Categoria não existe, tente novamente.")
        return res.redirect('/admin/categories')
      }

      categoryToEdit.name = category.name
      categoryToEdit.label = category.label

      if (await categoryToEdit.save()) {
        req.flash("success_msg", "Categoria editada com sucesso.")
        res.redirect('/admin/categories')
      }
    }
    catch (err) {
      req.flash("error_msg", "Erro ao editar categoria.")
      res.redirect('/admin/categories')
    }
  },

  async deleteCategory(req, res) {
    try {
      if (await Category.deleteOne({ _id: req.body.id })) {
        req.flash("success_msg", "Categoria removida com sucesso.")
        res.redirect('/admin/categories')
      }
    }
    catch (err) {
      req.flash("error_msg", "Erro ao deletar categoria.")
      res.redirect('/admin/categories')
    }
  },

  async listPosts(req, res) {
    try {
      const posts = await Post.find().populate("category").sort({ createdAt: 'desc' })
      console.log(posts)
      res.render('admin/posts/list', { posts })

    } catch (err) {
      console.log(err)
      req.flash("error_msg", "Erro ao listar posts, tente novamente.")
      res.redirect('/admin')
    }
  },

  async formPost(req, res) {
    try {
      const categories = await Category.find().sort({ createdAt: 'desc' })
      res.render('admin/posts/form', { categories, errors: [] })
    }
    catch (err) {
      req.flash("error_msg", "Erro ao carregar formulário.")
      res.redirect('/admin/posts')
    }
  },

  async createPost(req, res) {
    const { title, description, content, category } = req.body
    let errors = []

    if (!title) {
      errors.push({ texto: "Nome inválido" })
    }

    if (!description) {
      errors.push({ texto: "Descrição inválida" })
    }

    if (!content) {
      errors.push({ texto: "Conteúdo inválido" })
    }

    if (category == 0) {
      errors.push({ text: "Categoria inválida, registre uma categoria" })
    }

    if (errors.length > 0) {
      const categories = await Category.find().sort({ createdAt: 'desc' })
      return res.render('admin/posts/form', { errors, categories })
    }

    try {
      await Post.create(req.body)

      req.flash("success_msg", "Post criado com sucesso!")
      res.redirect('/admin/posts')

    }
    catch (err) {
      req.flash("error_msg", "Erro ao cadastar post, tente novamente.")
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

  async updatePost(req, res) {
    try {
      const { id, title, description, content, category } = req.body
      const postToEdit = await Post.findById(id)

      if (!postToEdit) {
        req.flash("error_msg", "Post não existe, tente novamente.")
        return res.redirect('/admin/posts')
      }

      postToEdit.title = title
      postToEdit.description = description
      postToEdit.content = content
      postToEdit.category = category

      if (await postToEdit.save()) {
        req.flash("success_msg", "Post editado com sucesso.")
        res.redirect('/admin/posts')
      }
    }
    catch (err) {
      req.flash("error_msg", "Erro ao editar post.")
      res.redirect('/admin/posts')
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
