const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('./orders.model');

// Create Checkout Session
router.post('/create-checkout-session', async (req, res) => {
  const { products } = req.body;

  try {
    const lineItems = products.map((product) => ({
      price_data: {
        currency: 'lkr',
        product_data: {
          name: `${product.name} (${product.size || "No Size"})`, 
          images: [product.image],
        },
        unit_amount: Math.round(product.price * 100),
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
  const { session_id, products } = req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items', 'payment_intent', 'customer_details'],
    });

    const paymentIntentId = session.payment_intent.id;

    let order = await Order.findOne({ orderId: paymentIntentId });

    if (!order) {
      const lineItems = session.line_items.data.map((item, i) => ({
        productId: products[i]?._id || 'unknown_product_id',
        quantity: item.quantity,
        price: item.price.unit_amount / 100,
        size: products[i]?.size || 'N/A', 
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
      order.status = session.payment_intent.status === 'succeeded' ? 'pending' : 'failed';
    }

    await order.save();
    res.json({ order });
  } catch (error) {
    console.error('Error confirming payment:', error.message);
    res.status(500).json({ error: 'Failed to confirm payment' });
  }
});

// Get orders by email
router.get("/:email", async (req, res) => {
  const email = req.params.email;
  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }

  try {
    const orders = await Order.find({ email });
    if (!orders.length) {
      return res.status(404).send({ orders: 0, message: "No orders found for this email" });
    }
    res.status(200).send({ orders });
  } catch (error) {
    console.error("Error fetching orders by email", error);
    res.status(500).send({ message: "Failed to fetch orders by email" });
  }
});

// Get single order by ID
router.get("/order/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }
    res.status(200).send(order);
  } catch (error) {
    console.error("Error fetching order", error);
    res.status(500).send({ message: "Failed to fetch order" });
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    if (!orders.length) {
      return res.status(404).send({ message: "No orders found", orders: [] });
    }
    res.status(200).send(orders);
  } catch (error) {
    console.error("Error fetching orders", error);
    res.status(500).send({ message: "Failed to fetch orders" });
  }
});

// Update order status
router.patch("/update-order-status/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).send({ message: "Status is required" });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).send({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order status", error);
    res.status(500).send({ message: "Failed to update order status" });
  }
});

// Delete order
router.delete('/delete-order/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).send({ message: "Order not found" });
    }
    res.status(200).json({
      message: "Order deleted successfully",
      order: deletedOrder
    });
  } catch (error) {
    console.error("Error deleting order", error);
    res.status(500).send({ message: "Failed to delete order" });
  }
});

module.exports = router;
