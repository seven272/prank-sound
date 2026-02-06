import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    vk_id: {
      type: String,
      required: true,
      unique: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
)
const User = mongoose.model('User', userSchema)

export default User
