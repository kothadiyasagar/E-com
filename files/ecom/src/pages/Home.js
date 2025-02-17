import React from 'react';
import ProductList from '../components/Product/ProductList';

const Home = ({ userId }) => {
    return (
        <div>
            <ProductList userId={userId} />
        </div>
    );
};

export default Home;