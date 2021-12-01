import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useCustomer } from '../../../../hooks/useCustomer';
import { formatManipulatePrice } from '../../../../helpers/functions';
import { getAllSellersApi, newOrderApi } from '../../../../api/customer';

export default function Form() {
  const HALF_SECOND = 500;
  const history = useHistory();
  const mountedRef = useRef(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const { sales, total } = useCustomer();
  const [sellers, setSellers] = useState([]);
  const [selectSeller, setSelectSeller] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  // https://stackoverflow.com/questions/56450975/to-fix-cancel-all-subscriptions-and-asynchronous-tasks-in-a-useeffect-cleanup-f

  useEffect(() => {
    async function getSellers() {
      const respSellers = await getAllSellersApi();
      console.log(respSellers);
      setSellers(respSellers);
      setSelectSeller(respSellers[0]);
    }
    getSellers();
  }, []);

  async function handleFinalizeOrder(event) {
    event.preventDefault();

    const products = sales.map((sale) => ({
      productId: sale.productId, quantity: sale.quantity,
    }));

    const data = {
      sellerId: selectSeller.id,
      totalPrice: Number(formatManipulatePrice(total)),
      deliveryAddress,
      deliveryNumber,
      products,
      status: 'Pendente',
    };

    const saleId = await newOrderApi(user.token, data);

    localStorage.removeItem('cart');
    localStorage.removeItem('total');

    setDeliveryAddress('');
    setDeliveryNumber('');
    setSelectSeller(sellers[0]);

    setTimeout(() => {
      history.push(`/customer/orders/${saleId}`);
    }, HALF_SECOND);
  }

  useEffect(() => {
    mountedRef.current = false;
  }, []);

  return (
    <div className="container">
      <form className="row mt-4">
        <h3>Detalhes e endereço para entrega</h3>
        <div className="col">
          <span>Vendedor responsável</span>
          <select
            data-testid="customer_checkout__select-seller"
            className="form-select"
            name="seller"
            id="seller"
            value={ selectSeller }
          >
            {sellers.map(({ id, name }) => (
              <option key={ id } value={ name }>{ name }</option>
            ))}
          </select>
        </div>
        <div className="col-5">
          <span>Endereço</span>
          <input
            type="text"
            className="form-control"
            data-testid="customer_checkout__input-address"
            value={ deliveryAddress }
            onChange={ (e) => setDeliveryAddress(e.target.value) }
          />
        </div>
        <div className="col">
          <span>Número</span>
          <input
            type="text"
            className="form-control"
            data-testid="customer_checkout__input-addressNumber"
            value={ deliveryNumber }
            onChange={ (e) => setDeliveryNumber(e.target.value) }
          />
        </div>
        <div className="col d-flex align-items-center">
          <button
            className="btn btn-warning mt-2 w-100"
            data-testid="customer_checkout__button-submit-order"
            type="button"
            onClick={ handleFinalizeOrder }
          >
            FINALIZAR PEDIDO
          </button>
        </div>
      </form>
    </div>
  );
}
