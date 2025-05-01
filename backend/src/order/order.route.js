const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('./orders.model'); // Ensure this is the correct path to your Mongoose model

// Create Checkout Session
router.post('/create-checkout-session', async (req, res) => {
  const { products } = req.body;

  try {
    const lineItems = products.map((product) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
          images: [product.image],
        },
        unit_amount: Math.round(product.price * 100), // price in cents
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error.message);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Confirm Payment
router.post('/confirm-payment', async (req, res) => {
  const { session_id } = req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items', 'payment_intent', 'customer_details'],
    });

    const paymentIntentId = session.payment_intent.id;

    // Check if order already exists
    let order = await Order.findOne({ orderId: paymentIntentId });

    if (!order) {
      const lineItems = session.line_items.data.map((item) => ({
        productId: item.price.product || 'custom_product_id',
        quantity: item.quantity,
        price: item.price.unit_amount / 100,
      }));

      const amount = session.amount_total / 100;

      order = new Order({
        orderId: paymentIntentId,
        products: lineItems,
        amount: amount,
        email: session.customer_details?.email || 'unknown@example.com',
        status: session.payment_intent.status === 'succeeded' ? 'pending' : 'failed',
      });
    } else {
      // Update status if order exists
      order.status = session.payment_intent.status === 'succeeded' ? 'pending' : 'failed';
    }

    await order.save();

    res.json({ order });
  } catch (error) {
    console.error('Error confirming payment:', error.message);
    res.status(500).json({ error: 'Failed to confirm payment' });
  }
});

module.exports = router;
