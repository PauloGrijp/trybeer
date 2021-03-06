import React, { useEffect } from 'react';
import { getAllUsersApi } from '../../../api/admin';
import { useAdmin } from '../../../hooks/useAdmin';
import User from './User';
import './User.scss';

function UserList() {
  // const user = JSON.parse(localStorage.getItem('user'));
  const { users, setUsers } = useAdmin();

  async function getUsers() {
    const respUsers = await getAllUsersApi();
    setUsers(respUsers);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="user-list">
      <h3>Lista de usuários</h3>
      <div className="row">
        <div className="col">
          <span>Item</span>
        </div>
        <div className="col">
          <span>Nome</span>
        </div>
        <div className="col">
          <span>E-mail</span>
        </div>
        <div className="col">
          <span>Tipo</span>
        </div>
        <div className="col">
          <span>Excluir</span>
        </div>
      </div>
      <div>
        {users.map((oneUser, index) => (
          <User
            key={ index }
            index={ index }
            item={ index }
            name={ oneUser.name }
            email={ oneUser.email }
            roleUser={ oneUser.role }
            id={ oneUser.id }
          />))}
      </div>
    </div>
  );
}

export default UserList;
