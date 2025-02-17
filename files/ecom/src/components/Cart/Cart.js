import React, { useEffect, useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import cartService from '../../services/cartService';
import orderService from '../../services/orderService';
import CartItem from './CartItem';

const Cart = ({ userId }) => {
    const [cart, setCart] = useState(null);

    const refreshCart = async () => {
        try {
            const cartData = await cartService.viewCart(userId);
            setCart(cartData);
        } catch (error) {
            console.error('Failed to fetch cart', error);
        }
    };

    useEffect(() => {
        refreshCart();
    }, [userId]);

    const handleCheckout = async () => {
        try {
            await orderService.createOrder(userId);
            setCart(null);
        } catch (error) {
            console.error('Checkout failed', error);
        }
    };

    if (!cart) {
        return (
            <Container>
                <Typography variant="h4" component="h1" gutterBottom>
                    Your Cart is Empty
                </Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Your Cart
            </Typography>
            {cart.products.map((product) => (
                <CartItem key={product.product._id} product={product} userId={userId} refreshCart={refreshCart} />
            ))}
            <Typography variant="h6" component="h2" gutterBottom>
                Total Price: ${cart.products.reduce((acc, item) => acc + item.product.price * item.quantity, 0)}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleCheckout}>
                Checkout
            </Button>
        </Container>
    );
};

export default Cart;