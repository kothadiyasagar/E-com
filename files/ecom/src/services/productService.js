import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products/';

const getProducts = async (params) => {
    const response = await axios.get(API_URL, { params });
    return response.data;
};

const getProduct = async (id) => {
    const response = await axios.get(`${API_URL}${id}`);
    return response.data;
};

const createProduct = async (productData) => {
    const response = await axios.post(API_URL, productData);
    return response.data;
};

const updateProduct = async (id, productData) => {
    const response = await axios.put(`${API_URL}${id}`, productData);
    return response.data;
};

const deleteProduct = async (id) => {
    const response = await axios.delete(`${API_URL}${id}`);
    return response.data;
};

const productService = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};

export default productService;