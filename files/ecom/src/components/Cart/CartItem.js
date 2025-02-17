import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import cartService from '../../services/cartService';

const CartItem = ({ product, userId, refreshCart }) => {
    const handleRemove = async () => {
        try {
            await cartService.removeFromCart({ userId, productId: product.product._id });
            refreshCart();
        } catch (error) {
            console.error('Failed to remove item from cart', error);
        }
    };

    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
                <Typography variant="h6">{product.product.name}</Typography>
                <Typography variant="body2">{product.product.description}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="body1">${product.product.price}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="body1">Quantity: {product.quantity}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Button variant="contained" color="secondary" onClick={handleRemove}>
                    Remove
                </Button>
            </Grid>
        </Grid>
    );
};

export default CartItem;