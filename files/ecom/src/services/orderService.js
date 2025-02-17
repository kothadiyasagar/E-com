import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders/';

const createOrder = async (userId) => {
    const response = await axios.post(API_URL, { userId });
    return response.data;
};

const getOrderHistory = async (userId) => {
    const response = await axios.get(`${API_URL}${userId}`);
    return response.data;
};

const orderService = {
    createOrder,
    getOrderHistory,
};

export default orderService;