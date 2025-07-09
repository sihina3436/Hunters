const mongoose = require('mongoose');

const ReviewsSchema = new mongoose.Schema({
   comment: {
      type: String,
      required: true,
      maxlength: 200
   },
   rating: {
      type: Number,
      required: true,
   },
   userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
   },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    image: {
        type: String,
        required: false,
    },
}, {timestamps: true });

const Reviews = mongoose.model('Reviews', ReviewsSchema);  
module.exports = Reviews;
