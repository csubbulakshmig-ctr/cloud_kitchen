import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  food: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  image: {
    type: String,
  },
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  userId: {
    type: String,
  },
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  deliveryAddress: {
    type: String,
    required: [true, 'Delivery address is required'],
  },
  items: [orderItemSchema],
  subtotal: {
    type: Number,
    required: true,
  },
  deliveryCharge: {
    type: Number,
    required: true,
    default: 40,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['Cash on Delivery', 'UPI', 'Card'],
    default: 'Cash on Delivery',
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid'],
    default: 'Pending',
  },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;
