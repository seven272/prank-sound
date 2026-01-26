import mongoose from 'mongoose'

const soundSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
    number: {
      type: Number,
      required: true,
      trim: true, 
    },
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    soundUrl: {
      type: String,
      required: true,
      trim: true,
    },
    isFree: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  { timestamps: true }
)
const Sound = mongoose.model('Sound', soundSchema)

export default Sound
