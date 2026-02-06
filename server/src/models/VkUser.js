import mongoose from 'mongoose'

const vkUserSchema = new mongoose.Schema(
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
const VkUser = mongoose.model('VkUser', vkUserSchema)

export default VkUser
