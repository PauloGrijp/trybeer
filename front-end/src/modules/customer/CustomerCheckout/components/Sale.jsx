import React from 'react';
import PropType from 'prop-types';
import { useCustomer } from '../../../../hooks/useCustomer';
import './SalesList.scss';

function Sale({ product, index }) {
  const { productId, name, quantity, unitPrice, subTotal } = product;
  const { handleRemoveItemCart } = useCustomer();

  return (
    <tr className="sale">
      <td
        className="index"
        data-testid={ `customer_checkout__element-order-table-item-number-${index}` }
      >
        { (index + 1) }
      </td>
      <td
        className="item"
        data-testid={ `customer_checkout__element-order-table-name-${index}` }
      >
        { name }
      </td>
      <td
        className="quantity"
        data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
      >
        { quantity }
      </td>
      <td
        className="price"
      >
        R$&nbsp;
        <span
          data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
        >
          { unitPrice }
        </span>
      </td>
      <td
        className="subtotal"
      >
        R$&nbsp;
        <span
          data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
        >
          { subTotal }
        </span>
      </td>
      <td className="remove">
        <button
          data-testid={ `customer_checkout__element-order-table-remove-${index}` }
          type="button"
          onClick={ () => handleRemoveItemCart(productId) }
        >
          REMOVER
        </button>
      </td>
    </tr>
  );
}

export default Sale;

Sale.propTypes = {
  product: PropType.shape({
    productId: PropType.number.isRequired,
    name: PropType.string.isRequired,
    quantity: PropType.number.isRequired,
    unitPrice: PropType.string.isRequired,
    subTotal: PropType.string.isRequired,
  }).isRequired,
  index: PropType.number.isRequired,
};
