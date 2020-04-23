const { Router } = require('express')
const router = Router()

const HomeController = require('../app/controllers/HomeController')
const PostsController = require('../app/controllers/PostsController')
const CategoriesController = require("../app/controllers/CategoriesController")
const AuthController = require('../app/controllers/AuthController')
const UsersController = require('../app/controllers/UsersController')
const AdminController = require('../app/controllers/AdminController')
const isAdmin = require('./isAdmin')

router.get('/', HomeController.index)

router.get('/users/new', UsersController.new)
router.post('/users', UsersController.create)

const authRouter = Router()

authRouter.route('/login')
  .get(AuthController.form)
  .post(AuthController.login)

authRouter.get('/logout', AuthController.logout)

router.use('/auth', authRouter)

router.get('/categories', CategoriesController.index)
router.get('/post/:id', PostsController.show)
router.get('/posts/category/:id', PostsController.byCategory)

const adminRouter = Router()

adminRouter.get('/', AdminController.index)

adminRouter.route('/categories')
  .get(AdminController.listCategories)
  .post(AdminController.saveOrUpdateCategory)
  .delete(AdminController.deleteCategory)

adminRouter.get('/categories/new', AdminController.newCategory)
adminRouter.get('/categories/edit/:id', AdminController.editCategory)

adminRouter.route('/posts')
  .get(AdminController.listPosts)
  .post(AdminController.saveOrUpdatePost)
  .delete(AdminController.deletePost)

adminRouter.get('/posts/new', AdminController.newPost)
adminRouter.get('/posts/edit/:id', AdminController.editPost)

router.use('/admin', isAdmin, adminRouter)

module.exports = router
