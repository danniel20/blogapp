const bcrypt = require('bcryptjs')
const faker = require('faker')

const users = []

users.push(
  {
    name: 'Admin',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: 1
  }
)

for (let i = 1; i < 10; i++) {
  users.push(
    {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync('123456', 10)
    }
  )
}

module.exports = users
