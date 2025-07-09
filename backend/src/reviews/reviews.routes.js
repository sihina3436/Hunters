const express = require('express');
const router = express.Router();
const Reviews = require('./reviews.model');
const Product = require('../products/products.model');
const upload = require('../middleware/multer');
const { v2: cloudinary } = require('cloudinary');
const connectCloudinary = require('../config/cloudinary');

router.post('/post-review', upload.single('file'), async (req, res) => {
try {
const { comment, rating, productId, userId } = req.body;
const image = req.file ? req.file.path : null;

if (!comment || !rating || !productId || !userId) {
  return res.status(400).json({ message: 'All fields are required' });
}

let imageUrl = null;
if (image) {
  const result = await cloudinary.uploader.upload(req.file.path);
  imageUrl = result.secure_url;
}

let review = await Reviews.findOne({ userId, productId });

if (review) {
  review.comment = comment;
  review.rating = rating;
  review.image = imageUrl;
  await review.save();
} else {
  review = new Reviews({ comment, rating, userId, productId, image: imageUrl });
  await review.save();
}

const allReviews = await Reviews.find({ productId });
const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
const avgRating = totalRating / allReviews.length;

const product = await Product.findById(productId);
if (product) {
  product.rating = avgRating;
  await product.save({ validateBeforeSave: false });
}

return res.status(200).json({
  message: 'Review posted successfully',
  review,
});
} catch (error) {
console.error('Error in posting review:', error.message);
res.status(500).json({ message: 'Error in posting review' });
}
});

module.exports = router;