import { Router } from 'express'

import {HomeController} from '../app/controllers/HomeController'
import {PostsController} from '../app/controllers/PostsController'
import {CategoriesController} from "../app/controllers/CategoriesController"
import {AuthController} from '../app/controllers/AuthController'
import {UsersController} from '../app/controllers/UsersController'

import {AdminController} from '../app/controllers/AdminController'
import {AdminUsersController} from '../app/controllers/admin/AdminUsersController'
import {AdminCategoriesController} from '../app/controllers/admin/AdminCategoriesController'
import {AdminPostsController} from '../app/controllers/admin/AdminPostsController'
import {SeedController} from '../app/controllers/SeedController'

import {isAdmin} from './isAdmin'
import upload from './upload'

const router = Router()

router
  .get('/', HomeController.index)
  .get('/populate-database', SeedController.seed)

  .get('/users/new', UsersController.new)
  .get('/users/edit/:id', UsersController.edit)
  .post('/users', upload.single('photo'), UsersController.saveOrUpdate)

const authRouter = Router()

authRouter.route('/login')
  .get(AuthController.form)
  .post(AuthController.login)

authRouter.get('/logout', AuthController.logout)

authRouter.route('/forgot-password')
  .get(AuthController.forgotPassword)
  .post(AuthController.sendEmailPasswordInstructions)

authRouter.route('/reset-password')
  .get(AuthController.resetPasswordForm)
  .post(AuthController.resetPasswordConfirm)

router.use('/auth', authRouter)

router
  .get('/categories', CategoriesController.index)
  .get('/post/:id', PostsController.show)
  .get('/posts/category/:id', PostsController.byCategory)

const adminRouter = Router()

adminRouter.get('/', AdminController.index)

adminRouter.route('/categories')
  .get(AdminCategoriesController.index)
  .post(AdminCategoriesController.saveOrUpdate)
  .delete(AdminCategoriesController.delete)

adminRouter
  .get('/categories/new', AdminCategoriesController.new)
  .get('/categories/edit/:id', AdminCategoriesController.edit)

adminRouter.route('/posts')
  .get(AdminPostsController.index)
  .post(AdminPostsController.saveOrUpdate)
  .delete(AdminPostsController.delete)

adminRouter
  .get('/posts/new', AdminPostsController.new)
  .get('/posts/edit/:id', AdminPostsController.edit)

adminRouter.route('/users')
  .get(AdminUsersController.index)
  .delete(AdminUsersController.delete)

router.use('/admin', isAdmin, adminRouter)

export default router
