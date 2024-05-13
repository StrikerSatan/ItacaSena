import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Css/ForgotPassword.css';

const ForgotPassword = ({ onSubmit }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://itacaapi-ap2d.onrender.com/api/user/recoverPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // Incluye el correo electrónico en el cuerpo de la solicitud
      });
      const data = await response.json();
      console.log(data); // Muestra la respuesta del servidor en la consola
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-content">
      <img src="./Image/itacablocked2.jpg" alt="Logo" width="100" height="100" className="forgot-password-img" />
        <h1 className="forgot-password-title">Having trouble logging in?</h1>
        <p style={{ color: '#666' }}>Enter your email and we will send you an email to regain access to your account.</p>
        <form onSubmit={handleSubmit}>
          <div className="forgot-password-input">
            {/* <span className="forgot-password-icon"><i className='fas fa-envelope'></i></span> */}
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <button type="submit" className="forgot-password-btn">Send mail</button>
          <div className="forgot-password-link">
            <Link to="/" className="forgot-password-link-text">Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
