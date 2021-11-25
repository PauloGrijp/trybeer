import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sale from './Sale';
import './SaleList.scss';
import { useOrder } from '../../../../hooks/useOrder';
import { formatedDate, formatSaveAndRenderPrice } from '../../../../helpers/functions';
import { getOneOrderApi } from '../../../../api/orders';

const TEST_STATUS = 'customer_order_details__element-order-details-label-delivery-status';

function SalesList() {
  const { setCustomerSingleOrder, customerSingleOrder, emitUpdateOrder } = useOrder();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getOrder() {
      setIsLoading(true);
      const order = await getOneOrderApi(id);
      setCustomerSingleOrder(order);
      setIsLoading(false);
    }
    getOrder();
  }, []);

  function handleUpdateStatus(status) {
    const data = { id, status };
    emitUpdateOrder(data);
  }

  function isEnabled() {
    if (customerSingleOrder.status === 'Em Trânsito') {
      return false;
    }
    return true;
  }

  return (
    <div>
      <div className="conteiner">
        <div className="order-title">
          <span
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            { customerSingleOrder.id }
          </span>
          <span
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            { customerSingleOrder.sellerName }
          </span>
          <span
            data-testid="customer_order_details__element-order-details-label-order-date"
          >
            { formatedDate(new Date(customerSingleOrder.saleDate)) }
          </span>
          <span data-testid={ TEST_STATUS }>
            { customerSingleOrder.status }
          </span>
          <button
            data-testid="customer_order_details__button-delivery-check"
            type="button"
            disabled={ isEnabled() }
            name="Entregue"
            onClick={ ({ target }) => handleUpdateStatus(target.name) }
          >
            MARCAR COMO ENTREGUE
          </button>
        </div>
        <table style={ { width: '100%' } }>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor-unitário</th>
            <th>Sub-total</th>
          </tr>
          {isLoading
            ? <p>Carregando...</p>
            : (customerSingleOrder.saleItens.map((product, index) => (
              <Sale
                key={ index }
                product={ product }
                index={ index }
              />
            ))
            )}
        </table>
        <p>
          R$
          <span data-testid="customer_order_details__element-order-total-price">
            { formatSaveAndRenderPrice(customerSingleOrder.totalPrice) }
          </span>
        </p>
      </div>
    </div>
  );
}

export default SalesList;
