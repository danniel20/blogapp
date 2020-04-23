const Category = require('../models/Category')

module.exports = {

  async index(req, res){
    try{
      const categories = await Category.find().sort({createdAt: 'desc'})
      res.render('categories/index', {categories})
    }
    catch(err){
      req.flash("error_msg", "Erro ao listar categorias")
      res.redirect('/erro')
    }
  }

}
