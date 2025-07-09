const express = require('express');
const router = express.Router();
const Reviews = require('./reviews.model');
const Product = require('../products/products.model');

router.post('/post-review', async (req, res) => {
    try {
        const { comment, rating, productId, userId } = req.body;
        if (!comment || !rating || !productId || !userId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingReview = await Reviews.findOne({ userId, productId });

        // update existing review if it exists
        if (existingReview) {
            existingReview.comment = comment;
            existingReview.rating = rating;
            await existingReview.save();
        } else {
            // create a new review if it doesn't exist
            const newReview = new Reviews({
                comment,
                rating,
                userId,
                productId
            });
            await newReview.save();
        }

        // Calculate the average rating for the product
        const reviews = await Reviews.find({ productId });
        if (reviews.length > 0) {
            const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
            const averageRating = totalRating / reviews.length;
            const product = await Product.findById(productId);
            if (product) {
                product.rating = averageRating;
                await product.save({validateBeforeSave: false});
            }else{
                return res.status(404).json({ message: "Product not found" });
            }
        }

        return res.status(200).json({ 
            message: "Review posted successfully",
            review: reviews
        });

    } catch (error) {
        console.log("Error in posting review:", error);
        res.status(500).json({ message: "Error in posting review" });
    }
});

router.get('/total-reviews', async (req, res) => {
    try {

        const totalReviews = await Reviews.countDocuments({});
        res.status(200).send({ totalReviews });
        
    } catch (error) {
        console.log("Error in getting reviews:", error);
        res.status(500).json({ message: "Error in getting reviews count" });
    }
});


router.get('/:userId',async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }
    try {
        const reviews = await Reviews.find({userId: userId}).sort({createdAt : -1});
        if(!reviews || reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found for this user" });
        }
        res.status(200).send({ reviews });
    } catch (error) {
        console.log("Error in getting reviews:", error);
        res.status(500).json({ message: "Error in getting reviews" });
    }
});


module.exports = router;