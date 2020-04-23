module.exports = (req, res, next) => {
  if(req.isAuthenticated() && req.user.isAdmin){ // função do passport
    return next()
  }

  req.flash("error_msg", "Acesso não permitido, você precisa ser um Admin!")
  res.redirect('/')
}
