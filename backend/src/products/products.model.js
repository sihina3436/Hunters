const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: String,
    description: String,
    price: { type: Number, required: true },
    oldPrice: Number,
    image: String,
    color: String,
    rating: { type: Number, default: 0 },
    sizes: { type: [String], default: [] }, 
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);  
module.exports = Product;
