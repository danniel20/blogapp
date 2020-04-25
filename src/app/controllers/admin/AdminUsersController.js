const User = require('../../models/User')

module.exports = {

  async index(req, res){
    try{
      const users = await User.find()
      res.render('admin/users/index', {users})
    }
    catch(err){
      req.flash("error_msg", "Erro ao carregar usuários.")
      res.redirect('/admin')
    }
  }
}
