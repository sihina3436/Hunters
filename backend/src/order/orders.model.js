const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: String,
    products:[
        {
            productId: {type:String, required:true},
            quantity: {type:Number, required:true},
            price: {type:Number, required:true},
        }
    ],
    amount: {type:Number, required:true},
    email: {type:String, required:true},
    status: {type:String, enum: ['pending', 'Processing', 'Shipped', "Completed"], default: 'pending'},
   
}, {timestamps: true});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;