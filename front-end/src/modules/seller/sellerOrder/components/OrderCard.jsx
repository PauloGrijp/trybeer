import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { formatedDate, statusOrderStyle } from '../../../../helpers/functions';
import './OrderCard.module.scss';

export default function OrderCard({ order }) {
  const address = `${order.deliveryAddress}, ${order.deliveryNumber}`;
  return (
    <Link className="card" to={ `/seller/orders/${order.id}` }>
      <div className="order">
        <p>Pedido</p>
        <p
          data-testid={ `seller_orders__element-order-id-${order.id}` }
        >
          { order.id }
        </p>
      </div>
      <div className="status">
        <p
          style={ { color: statusOrderStyle(order.status) } }
          data-testid={ `seller_orders__element-delivery-status-${order.id}` }
        >
          { order.status }
        </p>
      </div>
      <div className="detail">
        <p
          data-testid={ `seller_orders__element-order-date-${order.id}` }
        >
          { formatedDate(new Date(order.saleDate)) }
        </p>
        <p>
          R$
          <span
            data-testid={ `seller_orders__element-card-price-${order.id}` }
          >
            { order.totalPrice }
          </span>
        </p>
        <p>
          <span
            data-testid={ `seller_orders__element-card-price-${order.id}` }
          >
            { address }
          </span>
        </p>
      </div>
    </Link>
  );
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    saleDate: PropTypes.string.isRequired,
    deliveryAddress: PropTypes.string.isRequired,
    deliveryNumber: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired,
  }).isRequired,
};
