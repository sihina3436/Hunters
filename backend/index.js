const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: 'https://www.zerozclothes.com', 
    credentials: true,
  })
);

// Routes
const authRoutes = require('./src/users/user.routes.js');
const productRoutes = require('./src/products/roducts.route.js'); 
const reviewRoutes = require('./src/reviews/reviews.routes.js');
const orderRoutes = require('./src/order/order.route.js');
const statsRoutes = require('./src/stats/stats.routes.js');
const uploadRoute = require('./src/utils/upload.js');
const contactRoutes = require('./src/contact/contact.routes.js');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/contact', contactRoutes); 
app.use(uploadRoute);

// MongoDB connection
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
  res.send('🚀 ZeroZCloths Backend is running');
});

// Start server
app.listen(port, () => {
  console.log(`🌐 Server running on http://localhost:${port}`);
});
