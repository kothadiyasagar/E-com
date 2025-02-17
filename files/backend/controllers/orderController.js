const Order = require('../models/Order');
const Cart = require('../models/Cart');

const createOrder = async (req, res) => {
    const { userId } = req.body;

    try {
        const cart = await Cart.findOne({ user: userId }).populate('products.product');

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const totalPrice = cart.products.reduce((acc, p) => acc + p.product.price * p.quantity, 0);

        const order = new Order({
            user: userId,
            products: cart.products,
            totalPrice,
        });

        await order.save();
        await Cart.findOneAndDelete({ user: userId });

        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getOrderHistory = async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await Order.find({ user: userId }).populate('products.product');

        res.status(200).json(orders);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = { createOrder, getOrderHistory };