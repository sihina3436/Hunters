const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

//middlewares
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',  // Removed trailing slash
  credentials: true,
}));

// routes
const authRoutes = require('./src/users/user.routes');
const productRoutes = require('../backend/src/products/roducts.route.js');
const reviewRoutes = require('../backend/src/reviews/reviews.routes.js');
const orderRoutes = require('../backend/src/order/order.route.js');
const statsRoutes = require('../backend/src/stats/stats.routes.js');
const connectCloudinary = require('../backend/src/config/cloudinary');


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stats', statsRoutes);

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
}); 
