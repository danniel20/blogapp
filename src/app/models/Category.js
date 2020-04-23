const mongoose = require('../../config/database')

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  label: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
})

CategorySchema.pre('save', function() {
  this.set({ updatedAt: new Date() })
})

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category
