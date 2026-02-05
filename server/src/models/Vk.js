import mongoose from 'mongoose'

const vkSchema = new mongoose.Schema(
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
const Vk = mongoose.model('Vk', vkSchema)

export default Vk
