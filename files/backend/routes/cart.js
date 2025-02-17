const express = require('express');
const { addToCart, removeFromCart, viewCart } = require('../controllers/cartController');

const router = express.Router();

router.post('/add', addToCart);
router.post('/remove', removeFromCart);
router.get('/:userId', viewCart);

module.exports = router;