import User from '../models/User'
import Category from '../models/Category'
import Post from '../models/Post'

import faker from 'faker'

export const SeedController = {

  async seed(req, res){

    await User.remove()
    await Category.remove()
    await Post.remove()

    await User.create(
      {
        name: 'Admin',
        email: 'admin@admin.com',
        password: '123456',
        isAdmin: 1
      }
    )

    for (let i = 1; i < 10; i++) {
      await User.create(
        {
          name: faker.name.firstName(),
          email: faker.internet.email(),
          password: '123456'
        }
      )
    }

    const seedCategories = ['Ruby', 'Node', 'Java', 'Python', 'Ruby on Rails', 'Javascript', 'Angular', 'Vue', 'React']

    for (let i = 0; i < seedCategories.length; i++) {
      await Category.create(
        {
          name: seedCategories[i],
          label: seedCategories[i].toString().toLowerCase()
        }
      )
    }

    const categories = await Category.find()

    for (let i = 0; i < categories.length; i++) {
      let max = getRandomIntInclusive(1, 3)

      for (let j = 0; j < max; j++) {
        await Post.create(
          {
            title: faker.name.title(),
            description: faker.lorem.sentence(),
            content: faker.lorem.sentences(),
            category: categories[i]._id
          }
        )
      }
    }

    req.flash("success_msg", "Seeds executado com sucesso. Usuário Admin {email: admin@admin.com, senha: 123456}")
    res.redirect('/')

  }
}

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
