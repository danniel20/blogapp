import mongoose from '../../config/database'

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
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

PostSchema.pre('save', function() {
  this.set({ updatedAt: new Date() })
})

export default mongoose.model('Post', PostSchema)
