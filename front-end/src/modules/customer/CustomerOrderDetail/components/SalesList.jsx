import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sale from './Sale';
import './SaleList.scss';
import api from '../../../../services/api';
import { useOrder } from '../../../../hooks/useOrder';
import { formatedDate, formatSaveAndRenderPrice } from '../../../../helpers/functions';

const TEST_STATUS = 'customer_order_details__element-order-details-label-delivery-status';

function SalesList() {
  const { setOrder, order } = useOrder();
  const { id } = useParams();
  const [ísLoading, setIsLoading] = useState(true);

  const saleDate = formatedDate(new Date(order.saleDate));

  console.log(order);
  useEffect(() => {
    async function getOrder() {
      setIsLoading(true);
      const response = await api.get(`/oneorder/${id}`);
      setOrder(response.data);
      setIsLoading(false);
    }
    getOrder();
  }, []);

  return (
    <div>
      <div className="conteiner border">
        <div className="order-title">
          <span
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            { order.id }
          </span>
          <span
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            { order.sellerName }
          </span>
          <span
            data-testid="customer_order_details__element-order-details-label-order-date"
          >
            { saleDate }
          </span>
          <span data-testid={ TEST_STATUS }>
            { order.status }
          </span>
          <button
            data-testid="customer_order_details__button-delivery-check"
            type="button"
            disabled
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
          {ísLoading
            ? <p>Carregando...</p>
            : order.saleItens.map((product, index) => (
              <Sale
                key={ index }
                product={ product }
                index={ index }
              />
            ))}
        </table>
        <p>
          R$
          <span data-testid="customer_order_details__element-order-total-price">
            { formatSaveAndRenderPrice(order.totalPrice) }
          </span>
        </p>
      </div>
    </div>
  );
}

export default SalesList;
