const seedCategories = ['Ruby', 'Node', 'Java', 'Python', 'Rails', 'Javascript', 'Angular', 'Vue', 'React']
const categories = []

for (let i = 0; i < seedCategories.length; i++) {
  categories.push(
    {
      name: seedCategories[i],
      label: seedCategories[i].toString().toLowerCase()
    }
  )
}

module.exports = categories
