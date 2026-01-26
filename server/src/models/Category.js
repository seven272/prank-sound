import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      maxLength: 32,
      trim: true,
    },
    alias: {
      type: String,
      required: true,
      unique: true,
      maxLength: 32,
      trim: true,
    },
    imageUrl: String,
  },
  { timestamps: true }
)

const Category = mongoose.model('Category', categorySchema)

export default Category
