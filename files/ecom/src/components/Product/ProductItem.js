import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material';
import cartService from '../../services/cartService';

const ProductItem = ({ product, userId }) => {
    const handleAddToCart = async () => {
        try {
            await cartService.addToCart({ userId, productId: product._id, quantity: 1 });
        } catch (error) {
            console.error('Failed to add to cart', error);
        }
    };

    return (
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
                <Typography variant="h6" color="text.primary">
                    ${product.price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={handleAddToCart}>
                    Add to Cart
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProductItem;