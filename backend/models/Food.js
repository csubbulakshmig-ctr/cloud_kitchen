import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Food name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Biryani', 'South Indian', 'Chinese', 'Chicken', 'Vegetarian', 'Desserts', 'Beverages'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0,
  },
  image: {
    type: String,
    required: [true, 'Food image URL is required'],
  },
  rating: {
    type: Number,
    default: 4.5,
    min: 1,
    max: 5,
  },
  available: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Food = mongoose.models.Food || mongoose.model('Food', foodSchema);
export default Food;
