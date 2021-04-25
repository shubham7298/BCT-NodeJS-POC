const express = require('express');

const cartController = require('./controller');
const isAuth = require('../../middleware/auth');

const router = express.Router();

// GET /cart/posts
router.get('/posts',isAuth, cartController.getCart);

// POST /cart/add
router.post('/add',isAuth, cartController.postCart);

// DELETE /cart/delete-item
router.delete('/delete-item', isAuth, cartController.cartDeleteProduct);

module.exports = router;
