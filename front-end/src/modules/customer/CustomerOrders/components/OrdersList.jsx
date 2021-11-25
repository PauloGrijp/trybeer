import React, { useEffect } from 'react';
import { getAllOrdersApi } from '../../../../api/orders';
import OrderCard from '../../../../components/ordercard/OrderCard';
import { useOrder } from '../../../../hooks/useOrder';

// const testOrders = [
//   { id: 1, status: 'Pendente', date: new Date(), price: 55.60 },
//   { id: 2, status: 'Entregue', date: new Date(), price: 35.60 },
//   { id: 3, status: 'Pendente', date: new Date(), price: 58.83 },
//   { id: 4, status: 'Em andamento', date: new Date(), price: 15.45 },
// ];

export default function OrdersList() {
  const user = JSON.parse(localStorage.getItem('user'));
  const { customerOrders, setCustomerOrders, didUpdate } = useOrder();

  useEffect(() => {
    async function allOrders() {
      const respOrders = await getAllOrdersApi(user.token);
      setCustomerOrders(respOrders);
    }
    allOrders();
  }, [didUpdate]);

  return (
    <div className="d-flex justify-content-center flex-wrap">
      {customerOrders.map((order) => <OrderCard key={ order.id } order={ order } />)}
    </div>
  );
}
