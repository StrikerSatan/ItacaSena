import React from 'react';
import '../../Css/Perfil.css'
const Modalperfil = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-perfil-overlay" onClick={onClose}>
      <div className="modal-perfil-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-perfil-title">Mi Perfil</div>
        <div className="perfil-info">
          <div className="perfil-info-item">
            <span className="info-label">Username:</span>
            <span className="info-value">Usuario123</span>
          </div>
          <div className="perfil-info-item">
            <span className="info-label">Email:</span>
            <span className="info-value">usuario@example.com</span>
          </div>
          <div className="perfil-info-item">
            <span className="info-label">Role:</span>
            <span className="info-value">Admin</span>
          </div>
          <div className="perfil-info-item">
            <span className="info-label">Número de DNI:</span>
            <span className="info-value">12345678</span>
          </div>
        </div>
        <div className="button-perfil-group">
          <button className="cerrar" onClick={onClose}>Cerrar</button>
          <button className="editar">Editar</button>
        </div>
      </div>
    </div>
  );
};

export default Modalperfil;
