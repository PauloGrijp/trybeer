import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { useParams } from 'react-router-dom';
// import socketIOClient from 'socket.io-client';
import { io } from 'socket.io-client';
import { getAllOrdersApi } from '../api/orders';

const URL = 'http://localhost:3001';
const client = io(URL);
// import {
//   formatManipulatePrice,
//   formatSaveAndRenderPrice,
//   formatedSales,
// } from '../helpers/functions';
// import api from '../services/api';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [customerOrders, setCustomerOrders] = useState([]);
  const [customerSingleOrder, setCustomerSingleOrder] = useState({});
  const [sellerOrders, setSellerOrders] = useState([]);
  const [sellerSingleOrder, setSellerSingleOrder] = useState({});
  const [didUpdate, setDidUpdate] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  // const { id } = useParams();

  async function getOrders() {
    const respOrders = await getAllOrdersApi(user.token);
    setSellerOrders(respOrders);
  }

  useEffect(() => {
    getOrders();
  }, []);
  console.log(sellerSingleOrder);
  client.on('statusUpdated', (data) => {
    // updateOrders(customerOrders, data, setCustomerOrders);
    // updateSingleOrder(customerSingleOrder, data, setCustomerSingleOrder);
    // updateOrders(sellerOrders, data, setSellerOrders);
    setSellerSingleOrder(data);
    setCustomerSingleOrder(data);
    setDidUpdate(!didUpdate);
  });

  function emitUpdateOrder(data) {
    client.emit('updateStatus', data);
  }

  return (
    <OrderContext.Provider
      value={
        { customerOrders,
          setCustomerOrders,
          customerSingleOrder,
          setCustomerSingleOrder,
          sellerOrders,
          setSellerOrders,
          sellerSingleOrder,
          setSellerSingleOrder,
          emitUpdateOrder,
          didUpdate }
      }
    >
      { children }
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  return context;
}

OrderProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes).isRequired,
};
