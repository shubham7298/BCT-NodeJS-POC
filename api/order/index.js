const express = require('express');
const orderController = require('./controller');
const isAuth = require('../../middleware/auth');

const router = express.Router();

// GET /order/view
router.get('/view',isAuth, orderController.getOrders);

// POST /order/make
router.post('/make',isAuth, orderController.postOrder);

module.exports = router;