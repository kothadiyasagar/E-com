import React, { useEffect, useState } from 'react';
import { Grid, Container, Typography } from '@mui/material';
import productService from '../../services/productService';
import ProductItem from './ProductItem';

const ProductList = ({ userId }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productData = await productService.getProducts();
                setProducts(productData.products);
            } catch (error) {
                console.error('Failed to fetch products', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Products
            </Typography>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product._id}>
                        <ProductItem product={product} userId={userId} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ProductList;