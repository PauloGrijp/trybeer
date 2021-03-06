import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { formatSaveAndRenderPrice } from '../helpers/functions';
import { useCustomer } from '../hooks/useCustomer';

function RedirectButton() {
  const { total } = useCustomer();
  const history = useHistory();
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    if (total !== '0,00') return setIsDisable(false);
    setIsDisable(true);
  }, [total]);

  function redirectCheckout() {
    history.push('/customer/checkout');
  }

  return (
    <div
      className="d-grid gap-2 d-md-flex justify-content-md-end"
    >
      <button
        data-testid="customer_products__button-cart"
        className="btn btn-warning"
        type="button"
        disabled={ isDisable }
        onClick={ redirectCheckout }
        style={ { position: 'fixed', bottom: '0', right: 0 } }
      >
        <span>
          Ver carrinho: R$
          <span data-testid="customer_products__checkout-bottom-value">
            { formatSaveAndRenderPrice(total) }
          </span>
        </span>
      </button>
    </div>
  );
}
export default RedirectButton;
