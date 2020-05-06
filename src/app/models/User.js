const mongoose = require('../../config/database')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const path = require("path")

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
  photo: {
    type: String
  },
  passwordResetToken: {
    type: String,
    select: false
  },
  passwordResetExpires: {
    type: Date,
    select: false
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
  this.updatedAt = new Date()

  next()
})

UserSchema.pre('remove', function(){
  if(this.photo){
    fs.unlink(path.resolve(__dirname, '..', '..', '..', 'uploads', this.photo), (err) => {
      if (err) throw err
    })
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User
