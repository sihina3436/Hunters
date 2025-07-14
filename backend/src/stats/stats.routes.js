const express = require('express');
const User = require('../users/user.model');
const router = express.Router();
const Product = require('../products/products.model');
const Order = require('../order/orders.model');
const Reviews = require('../reviews/reviews.model');



// user stats by email
router.get('/user-stats/:email', async (req, res) => {
    const { email } = req.params;
    if(!email) {
        return res.status(400).json({ error: 'Email is required' });
    }
    try {
        const user = await User.findOne({email:email});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }   
 
        const totalPaymentsResults = await Order.aggregate([
            { $match: { email:email } },
            { $group: { _id: null, totalAmounts: { $sum: '$amount' } } }
        ]);

        
        const totalPaymentsAmounts = totalPaymentsResults.length > 0 ? totalPaymentsResults[0].totalAmounts : 0;

  
         const totalReviews = await Reviews.countDocuments({userId:user._id});


      

         const purchasedProducts = await Order.distinct('products.productId', { email:email });

         const totalPurchasedProducts = purchasedProducts.length;

        res.status(200).send({
            totalPayments: totalPaymentsAmounts.toFixed(2),
            totalReviews: totalReviews,
            totalPurchasedProducts: totalPurchasedProducts,
        });


         console.log("Reviews Count "+totalReviews);
        console.log("Total Amount is "+totalPaymentsAmounts);
    } catch (error) {
        console.error('Error fetching user stats:', error);
        return res.status(500).json({ error: 'Internal server error' });
        
    }
});

// admin stats

router.get('/admin-stats', async (req,res) => {
    try {
        const totalOrders = await Order.countDocuments({});
        const totalProducts = await Product.countDocuments({});
        const totalUsers = await User.countDocuments({});
        const totalReviews = await Reviews.countDocuments({});

        const totalEarningsResults = await Order.aggregate([
            { $group: { _id: null, totalEarnings: { $sum: '$amount' } } }
        ]);
        const totalEarnings = totalEarningsResults.length > 0 ? totalEarningsResults[0].totalEarnings : 0;

        const monthlyEarningsResults = await Order.aggregate([
            {
                $group: {
                    _id: { 
                        month: { $month: "$createdAt" }, 
                        year: { $year: "$createdAt" }
                    },
                    monthlyEarning: { $sum: '$amount' }
                }
            },
            { 
                $sort: { "_id.year": 1, "_id.month": 1 } 
            } // Sort by year and month
        ]);
        

        const monthlyEarnings = monthlyEarningsResults.map((item) => ({
                month: item._id.month,
                year: item._id.year,
                earnings: item.monthlyEarning.toFixed(2),
        }));

        res.status(200).send({
            totalOrders: totalOrders,
            totalProducts: totalProducts,
            totalUsers: totalUsers,
            totalReviews: totalReviews,
            totalEarnings: totalEarnings.toFixed(2),
            monthlyEarnings: monthlyEarnings,
        });

    } catch (error) {
        console.error('Error fetching admin stats:', error);
        return res.status(500).json({ error: 'Error fetching admin stats' });
        
    }
});


module.exports = router;