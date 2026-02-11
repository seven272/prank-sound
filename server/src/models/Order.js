import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, unique: true, required: true }, // ID от VK
    userId: { type: String, required: true },
    item: { type: String, required: true },
    status: { type: String, default: 'completed' },
  },
  { timestamps: true },
)
const Order = mongoose.model('Order', orderSchema)

export default Order
