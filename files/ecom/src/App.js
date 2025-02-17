import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import OrderHistory from './pages/OrderHistory';
import Navbar from './components/Layout/Navbar';
import authService from './services/authService';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);

    const login = async (credentials) => {
        const userData = await authService.login(credentials);
        setIsAuthenticated(true);
        setUserId(userData.user.id);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserId(null);
    };

    return (
        <Router>
            <CssBaseline />
            <Navbar isAuthenticated={isAuthenticated} logout={logout} />
            <Routes>
                <Route path="/" element={<Home userId={userId} />} />
                <Route path="/login" element={<Login login={login} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart userId={userId} />} />
                <Route path="/orders" element={<OrderHistory userId={userId} />} />
            </Routes>
        </Router>
    );
};

export default App;