import React from 'react';
import '../../Css/Perfil.css'
const Modalperfil = ({ isOpen, onClose, nombre, correo, identificacion }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-perfil-overlay" onClick={onClose}>
      <div className="modal-perfil-content">
        <h2 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Perfil de Usuario</h2>
        <div style={{ marginBottom: '20px' }}>
          <p><strong>Nombre:</strong> {nombre}</p>
          <p><strong>Correo:</strong> {correo}</p>
          <p><strong>Número de Identificación:</strong> {identificacion}</p>
        </div>
        <div className="button-perfil-group" style={{ display: 'flex', justifyContent: 'center' }}>
          <button style={{ marginRight: '10px' }} onClick={onClose}>Cerrar</button>
          <button>Editar</button>
        </div>
      </div>
    </div>
  );
};

export default Modalperfil;
