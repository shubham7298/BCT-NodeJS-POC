const express = require('express');
const app = express();

//Import Routes
const feedRoutes = require('./feed');
const authRoutes = require('./auth');
const cartRoutes = require('./cart');
const orderRoutes = require('./order');

app.use('/auth', authRoutes);
app.use('/feed', feedRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);
