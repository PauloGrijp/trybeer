import React from 'react';
import Sale from './Sale';
import './SalesList.scss';

import { useCustomer } from '../../../../hooks/useCustomer';

function SalesList() {
  const { sales, total } = useCustomer();
  return (
    <div>
      <div className="container">
        <h3>Finalizar pedido</h3>
        <table style={ { width: '100%' } }>
          <tr className="table-header">
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor-unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
          {sales.map((product, index) => (
            <Sale
              key={ product.productId }
              product={ product }
              index={ index }
            />
          ))}
        </table>
        <p className="total-price">
          Total: R$&nbsp;
          <span data-testid="customer_checkout__element-order-total-price">
            {total}
          </span>
        </p>
      </div>
    </div>
  );
}

export default SalesList;
