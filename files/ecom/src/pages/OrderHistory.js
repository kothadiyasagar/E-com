import React from 'react';
import OrderHistoryComponent from '../components/Order/OrderHistory';

const OrderHistory = ({ userId }) => {
    return <OrderHistoryComponent userId={userId} />;
};

export default OrderHistory;