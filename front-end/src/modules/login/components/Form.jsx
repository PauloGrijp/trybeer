import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';
import './form.scss';
import { isValidateLogin } from '../../../helpers/validateLogin';

function Form() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidate, setIsValidade] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const validateForm = isValidateLogin(email, password);

    if (validateForm) {
      setIsValidade(false);
    } else {
      setIsValidade(true);
    }
  }, [email, password]);

  async function handleLogin(event) {
    event.preventDefault();
    setIsNotFound(false);
    try {
      const data = {
        email,
        password,
      };
      const response = await api.post('/login', data);
      const dataLocalStorage = {
        name: response.data.name,
        email: response.data.email,
        role: response.data.role,
        token: response.data.token,
      };
      localStorage.setItem('user', JSON.stringify(dataLocalStorage));
      switch (response.data.role) {
      case 'customer':
        history.push('/customer/products');
        break;
      case 'seller':
        history.push('/seller/orders');
        break;
      case 'administrator':
        history.push('/admin/manage');
        break;
      default:
        history.push('/');
        break;
      }
    } catch (error) {
      console.log(error.response);
      setEmail('');
      setPassword('');
      return setIsNotFound(true);
    }

    // zebirita@email.com
    // $#zebirita#$

    // fulana@deliveryapp.com
    // fulana@123

    // adm@deliveryapp.com
    // --adm2@21!!--
  }

  function handleRegister() {
    history.push('/register');
  }

  return (
    <div>
      <form action="" className="flex-column align-items-center custom-form p-4">
        <div className="row d-flex flex-column">
          <div className="col">
            <p>E-mail</p>
            <input
              type="email"
              placeholder="trybber@email.com"
              name="email"
              value={ email }
              onChange={ (e) => setEmail(e.target.value) }
              data-testid="common_login__input-password"
              className="form-control"
            />
          </div>
          <div className="col">
            <p>Password</p>
            <input
              type="password"
              placeholder="******"
              name="password"
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
              data-testid="common_login__input-password"
              className="form-control"
            />
          </div>
          <div className="col mt-2">
            <button
              type="submit"
              data-testid="common_login__button-login"
              onClick={ handleLogin }
              disabled={ isValidate }
              className="btn btn-primary w-100"
            >
              LOGIN
            </button>
          </div>
          <div className="col mt-2">
            <button
              type="button"
              onClick={ handleRegister }
              data-testid="common_login__button-register"
              className="btn btn-outline-primary w-100"
            >
              Ainda não tenho conta
            </button>
          </div>
          {
            isNotFound
            && (
              <p data-testid="common_login__element-invalid-email">
                usuário não encontrado
              </p>
            )
          }
        </div>
      </form>
    </div>

  );
}

export default Form;
