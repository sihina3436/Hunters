const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  description: String,
  price: { type: Number, required: true },
  oldPrice: Number,
  images: { type: [String], default: [] },  
  color:{ type: [String], default: [] },
  rating: { type: Number, default: 0 },
  sizes: { type: [String], default: [] },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  currentStock:Number
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
