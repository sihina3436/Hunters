const express = require('express');
const router = express.Router();
const Order = require('./orders.model');
const Product = require('../products/products.model');

// ✅ Create Order and reduce stock
router.post('/create', async (req, res) => {
  try {
    const { products, amount, email } = req.body;

    if (!products || !amount || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check stock before creating order
    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      }
      if (product.currentStock < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for ${product.name}` });
      }
    }

    // Create order
    const order = new Order({
      orderId: Date.now().toString(),
      products,
      amount,
      email,
      status: 'pending',
    });
    await order.save();

    // Reduce stock
    for (const item of products) {
      const product = await Product.findById(item.productId);
      product.currentStock -= item.quantity;
      await product.save();
    }

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("❌ Error creating order:", error);
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
});

// ✅ Get orders by email
router.get("/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const orders = await Order.find({ email });
    res.status(200).send({ orders });
  } catch (error) {
    console.error("Error fetching orders by email", error);
    res.status(500).send({ message: "Failed to fetch orders" });
  }
});

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

// ✅ Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).send(orders);
  } catch (error) {
    console.error("Error fetching orders", error);
    res.status(500).send({ message: "Failed to fetch orders" });
  }
});

// ✅ Update order status
router.patch("/update-order-status/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    res.status(200).json({ order: updatedOrder });
  } catch (error) {
    console.error("Error updating order status", error);
    res.status(500).send({ message: "Failed to update order status" });
  }
});

// ✅ Cancel/Delete order (restore stock)
router.delete('/delete-order/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).send({ message: "Order not found" });
    }

    // Restore stock when order is deleted/canceled
    for (const item of deletedOrder.products) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.currentStock += item.quantity;
        await product.save();
      }
    }

    res.status(200).json({
      message: "Order deleted successfully, stock restored",
      order: deletedOrder,
    });
  } catch (error) {
    console.error("Error deleting order", error);
    res.status(500).send({ message: "Failed to delete order" });
  }
});

module.exports = router;
