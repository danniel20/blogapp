const categories = ['Ruby', 'Node', 'Java', 'Python', 'Rails', 'Javascript', 'Angular', 'Vue', 'React']

for (let i = 0; i < categories.length; i++) {
  categories.push(
    {
      name: categories[i],
      label: categories[i].toLowerCase()
    }
  )
}

module.exports = categories
