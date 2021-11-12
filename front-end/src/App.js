import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './modules/login/Login';
import Signup from './modules/signup/Signup';
import ProductList from './modules/customer/ProductList';
import Seller from './modules/seller/Seller';
import ProductCheckout from './modules/customer/ProductCheckout';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Admin from './modules/admin/Admin';

function App() {
  return (
    <div className="container-fluid">
      <Switch>
        <Route
          exact
          path="/customer/products"
          render={ (props) => <ProductList { ...props } /> }
        />
        <Route
          exact
          path="/customer/checkout"
          render={ (props) => <ProductCheckout { ...props } /> }
        />
        <Route
          exact
          path="/register"
          render={ (props) => <Signup { ...props } /> }
        />
        <Route
          exact
          path="/login"
          render={ (props) => <Login { ...props } /> }
        />
        <Route
          exact
          path="/"
          render={ (props) => <Login { ...props } /> }
        />
        <Route
          exact
          path="/seller/orders"
          render={ (props) => <Seller { ...props } /> }
        />
        <Route
          exact
          path="/admin/manage"
          render={ (props) => <Admin { ...props } /> }
        />
      </Switch>
    </div>
  );
}

export default App;
