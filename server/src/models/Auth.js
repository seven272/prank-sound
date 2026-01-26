import mongoose from 'mongoose'

const authSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isSubscription: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
)
const Auth = mongoose.model('Auth', authSchema)

export default Auth
