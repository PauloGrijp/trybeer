import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOneOrderApi } from '../../../../api/orders';
import { formatedDate, formatSaveAndRenderPrice } from '../../../../helpers/functions';
import { useOrder } from '../../../../hooks/useOrder';
import Product from './Product';
import './ProductsList.scss';

const TEST_STATUS = 'seller_order_details__element-order-details-label-delivery-status';

function ProductsList() {
  const { id } = useParams();
  const { setSellerSingleOrder, sellerSingleOrder, emitUpdateOrder } = useOrder();
  const [isLoading, setIsLoading] = useState(true);
  const [isActiveDelivery, setIsActiveDelivery] = useState(true);

  async function getOrder() {
    setIsLoading(true);
    const respOrder = await getOneOrderApi(id);
    setSellerSingleOrder(respOrder);
    setIsLoading(false);
  }

  useEffect(() => {
    getOrder();
  }, []);

  function handleUpdateStatus(status) {
    setIsActiveDelivery(false);
    const data = { id: sellerSingleOrder.id, status };
    emitUpdateOrder(data);
  }

  return (
    <div>
      <div className="conteiner border">
        <div className="order-title">
          <span>PEDIDO</span>
          <span
            data-testid="seller_order_details__element-order-details-label-order-id"
          >
            {sellerSingleOrder.id}
          </span>
          <span
            data-testid="seller_order_details__element-order-details-label-order-date"
          >
            { formatedDate(new Date(sellerSingleOrder.saleDate)) }
          </span>
          <span data-testid={ TEST_STATUS }>
            { sellerSingleOrder.status }
          </span>
          <button
            type="button"
            data-testid="seller_order_details__button-preparing-check"
            name="Preparando"
            onClick={ ({ target }) => handleUpdateStatus(target.name) }
          >
            PREPARAR PEDIDO
          </button>
          <button
            type="button"
            data-testid="seller_order_details__button-dispatch-check"
            disabled={ isActiveDelivery }
            name="Em Trânsito"
            onClick={ ({ target }) => handleUpdateStatus(target.name) }
          >
            SAIU PARA ENTREGA
          </button>
        </div>
        <table style={ { width: '100%' } }>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor unitario</th>
            <th>Sub-total</th>
          </tr>
          <tbody>
            {isLoading
              ? <p>Carregando...</p>
              : (sellerSingleOrder.saleItens.map((product, index) => (
                <Product
                  key={ index }
                  product={ product }
                  index={ index }
                />
              ))
              )}
          </tbody>
        </table>
        <p>
          <span
            data-testid="seller_order_details__element-order-total-price"
          >
            { formatSaveAndRenderPrice(sellerSingleOrder.totalPrice) }
          </span>
        </p>
      </div>
    </div>
  );
}

export default ProductsList;
