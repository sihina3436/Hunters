const express = require('express');
const Product = require('./products.model');
const Reviews = require('../reviews/reviews.model');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

const router = express.Router();

// POST a product
router.post('/create-product', async (req, res) => {
    try {
        const newProduct = new Product({...req.body});
        const savedProduct = await newProduct.save();
        const revies = await Reviews.find({ productId: savedProduct._id });
        if(revies.length > 0) {
            const totalRating = revies.reduce((acc, review) => acc + review.rating, 0);
            const averageRating = totalRating / revies.length;
            savedProduct.rating = averageRating.toFixed(1);
            await savedProduct.save();
        }
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("Error Creating new product",error);
        res.status(500).json({ message: 'Fail Create new product' });
    }
});

// get all products
router.get('/', async (req, res) => {
    try {
        const {category, color, minPrice, maxPrice,page=1, limit=10 } = req.query;
        let filter = {};
        if (category && category !== 'all') {
            filter.category = category;
        }
        if (color && color !== 'all') {
            filter.color = color;
        }
        if(minPrice && maxPrice) {
            const min = parseFloat(minPrice);
            const max = parseFloat(maxPrice);
            if(!isNaN(min) && !isNaN(max)) {
                filter.price = { $gte: min, $lte: max };
            }
        }
        const skip = (parseInt(page) -1)*parseInt(limit);
        const totalProducts = await Product.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / parseInt(limit));
        const products = await Product.find(filter)
                                      .skip(skip).limit(parseInt(limit))
                                      .populate('author', ' email')
                                      .sort({ createdAt: -1 });

        res.status(200).send({
            products,
            totalProducts,
            totalPages
            
        });
    } catch (error) {
        console.error("Error fetching products",error);
        res.status(500).json({ message: 'Fail to fetch products' });
    }
});

// Get related products based on category and name similarity
router.get('/related/:id', async (req, res) => {
try {
const { id } = req.params;
if (!id) return res.status(400).json({ message: 'Product ID not provided' });

const product = await Product.findById(id);
if (!product) return res.status(404).json({ message: 'Product not found' });

const titleRegex = new RegExp(
  product.name
    .split(' ')
    .filter((word) => word.length > 2)
    .join('|'),
  'i'
);

const relatedProducts = await Product.find({
  _id: { $ne: id },
  $or: [{ name: { $regex: titleRegex } }, { category: product.category }],
}).limit(6);

res.status(200).json(relatedProducts);
} catch (error) {
console.error('Error fetching related products:', error);
res.status(500).json({ message: 'Failed to fetch related products' });
}
});

// get a single product
router.get('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId).populate('author', 'email username');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const reviews = await Reviews.find({productId }).populate("userId","username email");
        res.status(200).json({ product, reviews });
    } catch (error) {
        console.error("Error fetching a product",error);
        res.status(500).json({ message: 'Fail to fetch a product' });
    }
});

// update a product
router.patch("/update-product/:id",  verifyToken ,verifyAdmin ,async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProduct = await Product.findByIdAndUpdate(productId,{...req.body}, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).send({message:"Product Updates Successfull..." ,updatedProduct});
    } catch (error) {
        console.error("Error updating product",error);
        res.status(500).json({ message: 'Fail to update product' });
    }
})

// delete a product
router.delete("/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await Reviews.deleteMany({ productId: productId });
        res.status(200).send({message:"Product Deleted Successfull..." });
    } catch (error) {
        console.error("Error deleting product",error);
        res.status(500).json({ message: 'Fail to delete product' });
    }
})



module.exports = router;
