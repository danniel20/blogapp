const { Router } = require('express')
const router = Router()

const isAdmin = require('./isAdmin')

const PostsController = require('../app/controllers/PostsController')
const CategoriesController = require("../app/controllers/CategoriesController")
const AuthController = require('../app/controllers/AuthController')
const UsersController = require('../app/controllers/UsersController')
const AdminController = require('../app/controllers/AdminController')

router.get('/', PostsController.index)

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
  .post(AdminController.createCategory)
  .put(AdminController.updateCategory)
  .delete(AdminController.deleteCategory)

adminRouter.get('/categories/new', AdminController.formCategory)
adminRouter.get('/categories/edit/:id', AdminController.editCategory)

adminRouter.route('/posts')
  .get(AdminController.listPosts)
  .post(AdminController.createPost)
  .put(AdminController.updatePost)
  .delete(AdminController.deletePost)

adminRouter.get('/posts/new', AdminController.formPost)
adminRouter.get('/posts/edit/:id', AdminController.editPost)

router.use('/admin', isAdmin, adminRouter)

module.exports = router
