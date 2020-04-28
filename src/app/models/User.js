const mongoose = require('../../config/database')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  isAdmin: {
    type: Number,
    default: 0
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

UserSchema.pre('save', function(next){
  const hash = bcrypt.hashSync(this.password, 10)
  this.password = hash

  next()
})

UserSchema.pre('updateOne', function() {
  this.set({ updatedAt: new Date() })
})

const User = mongoose.model('User', UserSchema)

module.exports = User
