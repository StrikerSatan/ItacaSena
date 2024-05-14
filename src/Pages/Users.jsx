import React, { useState } from 'react';
import '../Css/Users.css'
const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Usuario 1', email: 'usuario1@example.com', role: 'Admin', dni: '12345678', enabled: true },
    { id: 2, name: 'Usuario 2', email: 'usuario2@example.com', role: 'User', dni: '87654321', enabled: true },
    { id: 3, name: 'Usuario 3', email: 'usuario3@example.com', role: 'User', dni: '56781234', enabled: false },
    { id: 4, name: 'Usuario 4', email: 'usuario4@example.com', role: 'User', dni: '43218765', enabled: true },
    { id: 5, name: 'Usuario 5', email: 'usuario5@example.com', role: 'User', dni: '98765432', enabled: false },
    { id: 6, name: 'Usuario 6', email: 'usuario6@example.com', role: 'Admin', dni: '87654321', enabled: true },
  ]);

  const toggleEnableUser = (id) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        return { ...user, enabled: !user.enabled };
      }
      return user;
    }));
  };

  const UserDetailsModal = ({ user }) => (
    <div className="user-details-modal">
      <h2>Detalles del Usuario</h2>
      <p>Nombre: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Rol: {user.role}</p>
      <p>Número de Identificación: {user.dni}</p>
      <p>Estado: {user.enabled ? 'Habilitado' : 'Inhabilitado'}</p>
      <button onClick={() => toggleEnableUser(user.id)}>
        {user.enabled ? 'Inhabilitar' : 'Habilitar'}
      </button>
      <button onClick={() => setShowModal(false)}>Cerrar</button>
    </div>
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="users-list">
      {users.map(user => (
        <div key={user.id} className="user-item">
          <h3>{user.name}</h3>
          <p>Rol: {user.role}</p>
          <button onClick={() => { setSelectedUser(user); setShowModal(true); }}>
            Detalles
          </button>
        </div>
      ))}
      {showModal && selectedUser && <UserDetailsModal user={selectedUser} />}
    </div>
  );
};

export default Users;
