const Category = require('../../models/Category')

module.exports = {

  async index(req, res) {
    try {
      const categories = await Category.find().sort({ createdAt: 'desc' })
      res.render('admin/categories/index', { categories })

    } catch (err) {
      req.flash("error_msg", "Erro ao listar categorias, tente novamente.")
      res.redirect('/admin')
    }
  },

  new(req, res) {
    res.render('admin/categories/new', {category: new Category(), errors: []})
  },

  async edit(req, res) {
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

  async saveOrUpdate(req, res) {
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

  async delete(req, res) {
    try {
      await Category.findByIdAndRemove(req.body.id)
      req.flash("success_msg", "Categoria removida com sucesso.")
      res.redirect('/admin/categories')
    }
    catch (err) {
      req.flash("error_msg", "Erro ao deletar categoria.")
      res.redirect('/admin/categories')
    }
  }

}
