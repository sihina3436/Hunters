const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: String,
  products: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      size: { type: String }, 
    },
  ],
  amount: { type: Number, required: true },
  email: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'completed'],
    default: 'pending',
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
