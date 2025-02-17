const Product = require('../models/Product');

const createProduct = async (req, res) => {
    const { name, description, price, category, image } = req.body;

    try {
        const product = new Product({ name, description, price, category, image });
        await product.save();

        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getProducts = async (req, res) => {
    const { page = 1, limit = 10, sort = 'name', order = 'asc', category, priceRange } = req.query;

    try {
        const query = {};
        if (category) query.category = category;
        if (priceRange) {
            const [min, max] = priceRange.split('-').map(Number);
            query.price = { $gte: min, $lte: max };
        }

        const products = await Product.find(query)
            .sort({ [sort]: order === 'asc' ? 1 : -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await Product.countDocuments(query);

        res.status(200).json({ products, total });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updateProduct = async (req, res) => {
    const { name, description, price, category, image } = req.body;

    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, price, category, image },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = { createProduct, getProducts, getProduct, updateProduct, deleteProduct };