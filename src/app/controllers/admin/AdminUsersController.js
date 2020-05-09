import User from '../../models/User'

export const AdminUsersController = {

  async index(req, res){
    try{
      const users = await User.find()
      res.render('admin/users/index', {users})
    }
    catch(err){
      req.flash("error_msg", "Erro ao carregar usuários.")
      res.redirect('/admin')
    }
  },

  async delete(req, res){
    try{
      await User.findByIdAndRemove(req.body.id)

      req.flash("success_msg", "Usuário removido com sucesso.")
      res.redirect('/admin/users')
    }
    catch(err){
      req.flash("error_msg", "Erro ao deletar usuário.")
      res.redirect('/')
    }
  }
}
