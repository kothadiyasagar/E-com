import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

const register = async (userData) => {
    const response = await axios.post(`${API_URL}register`, userData);
    return response.data;
};

const login = async (userData) => {
    const response = await axios.post(`${API_URL}login`, userData);
    return response.data;
};

const authService = {
    register,
    login,
};

export default authService;