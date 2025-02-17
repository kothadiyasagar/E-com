const Cart = require('../models/Cart');

const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, products: [{ product: productId, quantity }] });
        } else {
            const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }
        }

        await cart.save();

        res.status(200).json(cart);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const removeFromCart = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        cart.products = cart.products.filter(p => p.product.toString() !== productId);
        await cart.save();

        res.status(200).json(cart);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const viewCart = async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({ user: userId }).populate('products.product');

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = { addToCart, removeFromCart, viewCart };