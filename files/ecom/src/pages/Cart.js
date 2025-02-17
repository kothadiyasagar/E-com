import React from 'react';
import CartComponent from '../components/Cart/Cart';

const Cart = ({ userId }) => {
    return <CartComponent userId={userId} />;
};

export default Cart;