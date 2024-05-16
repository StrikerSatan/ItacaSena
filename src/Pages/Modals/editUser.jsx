import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const EditUser = ({ user, isOpen, onClose, children }) => {
  const [token, setToken] = useState('');
  const [_id, setId] = useState('');
  if (!isOpen) return null;

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      const decodedToken = jwtDecode(storedToken);
    }
  })
  return (
    <div className="user-edit-modal">
            <h2>Detalles del Usuario</h2>
            <div className="user-info">
                <div className="info-label">Nombre:</div>
                <div className="info-value">{user.username}</div>
            </div>
            <div className="user-info">
                <div className="info-label">Email:</div>
                <div className="info-value">{user.email}</div>
            </div>
            <div className="user-info">
                <div className="info-label">Rol:</div>
                <div className="info-value">{user.role.name}</div>
            </div>
            <div className="user-info">
                <div className="info-label">Número de Identificación:</div>
                <div className="info-value">{user.numDni}</div>
            </div>
            <div className="user-info">
                <div className="info-label">Estado:</div>
                <div className={`info-value ${user.enabled ? 'enabled' : 'disabled'}`}>
                    {user.enabled ? 'Habilitado' : 'Inhabilitado'}
                </div>
            </div>
            <div className="button-group">
                {/* <button onClick={() => toggleEnableUser(user.id, user.enabled)} className={`action-button ${user.enabled ? 'disable' : 'enable'}`}>
                    {user.enabled ? 'Inhabilitar' : 'Habilitar'}
                </button> */}
                <Link to="/usersManage" className="button">Manage</Link>
                <button onClick={() => setShowModal(false)} className="action-button">Cerrar</button>
            </div>
        </div>

  );
};

export default EditUser;
