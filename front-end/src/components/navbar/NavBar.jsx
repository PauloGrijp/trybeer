import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import './NavBar.scss';
import { linkRedirect } from '../../helpers/functions';

function NavBar({ item1, item2, user }) {
  const history = useHistory();
  function handleLogout() {
    localStorage.clear();
    history.push('/login');
  }

  return (
    <div className="row d-flex customer-navbar">
      <div className="col-3 inner-customer-navbar">
        <Link
          to={ linkRedirect(item1) }
          data-testid="customer_products__element-navbar-link-products"
        >
          {item1 || ''}
        </Link>
      </div>
      <div className="col-3 inner-customer-navbar">
        <Link
          to={ linkRedirect(item2) }
          data-testid="customer_products__element-navbar-link-orders"
        >
          {item2 || ''}
        </Link>
      </div>
      <div className="col-5 inner-customer-navbar">
        <span
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {user || ''}
        </span>
      </div>
      <div className="col-1 inner-customer-navbar">
        <Link
          to="/login"
          onClick={ handleLogout }
          className="d-flex justify-content-center"
          data-testid="customer_products__element-navbar-link-logout"
        >
          Sair
        </Link>
      </div>
    </div>
  );
}

NavBar.propTypes = {
  item1: PropTypes.string.isRequired,
  item2: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

export default NavBar;
