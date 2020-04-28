const { Router } = require('express')
const router = Router()

const HomeController = require('../app/controllers/HomeController')
const PostsController = require('../app/controllers/PostsController')
const CategoriesController = require("../app/controllers/CategoriesController")
const AuthController = require('../app/controllers/AuthController')
const UsersController = require('../app/controllers/UsersController')

const AdminController = require('../app/controllers/AdminController')
const AdminUsersController = require('../app/controllers/admin/AdminUsersController')
const AdminCategoriesController = require('../app/controllers/admin/AdminCategoriesController')
const AdminPostsController = require('../app/controllers/admin/AdminPostsController')

const isAdmin = require('./isAdmin')
const upload = require('./upload')

router.get('/', HomeController.index)
router.get('/create-user-admin', HomeController.createUserAdmin)

router.get('/users/new', UsersController.new)
router.get('/users/edit/:id', UsersController.edit)
router.post('/users', upload.single('photo'), UsersController.saveOrUpdate)

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
  .get(AdminCategoriesController.index)
  .post(AdminCategoriesController.saveOrUpdate)
  .delete(AdminCategoriesController.delete)

adminRouter.get('/categories/new', AdminCategoriesController.new)
adminRouter.get('/categories/edit/:id', AdminCategoriesController.edit)

adminRouter.route('/posts')
  .get(AdminPostsController.index)
  .post(AdminPostsController.saveOrUpdate)
  .delete(AdminPostsController.delete)

adminRouter.get('/posts/new', AdminPostsController.new)
adminRouter.get('/posts/edit/:id', AdminPostsController.edit)

adminRouter.route('/users')
  .get(AdminUsersController.index)

router.use('/admin', isAdmin, adminRouter)

module.exports = router
