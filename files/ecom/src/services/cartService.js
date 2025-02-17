import axios from 'axios';

const API_URL = 'http://localhost:5000/api/cart/';

const addToCart = async (cartData) => {
    const response = await axios.post(`${API_URL}add`, cartData);
    return response.data;
};

const removeFromCart = async (cartData) => {
    const response = await axios.post(`${API_URL}remove`, cartData);
    return response.data;
};

const viewCart = async (userId) => {
    const response = await axios.get(`${API_URL}${userId}`);
    return response.data;
};

const cartService = {
    addToCart,
    removeFromCart,
    viewCart,
};

export default cartService;