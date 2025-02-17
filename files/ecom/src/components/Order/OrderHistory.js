import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import orderService from '../../services/orderService';

const OrderHistory = ({ userId }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const orderData = await orderService.getOrderHistory(userId);
                setOrders(orderData);
            } catch (error) {
                console.error('Failed to fetch order history', error);
            }
        };

        fetchOrders();
    }, [userId]);

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Order History
            </Typography>
            {orders.map((order) => (
                <div key={order._id}>
                    <Typography variant="h6">Order ID: {order._id}</Typography>
                    <Typography variant="body1">Total Price: ${order.totalPrice}</Typography>
                    <Typography variant="body2">Order Date: {new Date(order.createdAt).toLocaleDateString()}</Typography>
                    <Typography variant="body2">Products:</Typography>
                    <ul>
                        {order.products.map((product) => (
                            <li key={product.product._id}>
                                {product.product.name} - Quantity: {product.quantity}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </Container>
    );
};

export default OrderHistory;