import mongoose from '../../config/database'
import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from "path"

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

export default mongoose.model('User', UserSchema)
