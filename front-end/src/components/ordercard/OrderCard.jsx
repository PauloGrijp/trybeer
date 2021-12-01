import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  formatedDate,
  formatSaveAndRenderPrice,
  statusOrderStyle,
} from '../../helpers/functions';
import './OrderCard.scss';

export default function OrderCard({ order }) {
  return (
    <Link className="card" to={ `/customer/orders/${order.id}` }>
      <div className="order">
        <p>Pedido</p>
        <span
          data-testid={ `customer_orders__element-order-id-${order.id}` }
        >
          { order.id }
        </span>
      </div>
      <div className="status">
        <p
          style={ { color: statusOrderStyle(order.status) } }
          data-testid={ `customer_orders__element-delivery-status-${order.id}` }
        >
          { order.status }
        </p>
      </div>
      <div className="detail">
        <p
          data-testid={ `customer_orders__element-order-date-${order.id}` }
        >
          { formatedDate(new Date(order.saleDate)) }
        </p>
        <p>
          R$
          <span
            data-testid={ `customer_orders__element-card-price-${order.id}` }
          >
            { formatSaveAndRenderPrice(order.totalPrice) }
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
    totalPrice: PropTypes.number.isRequired,
  }).isRequired,
};
