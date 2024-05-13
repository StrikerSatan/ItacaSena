import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Css/Register.css'

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [numDni, setNumDni] = useState('');
  
  const handleSubmit  = async (e) => {
    e.preventDefault();
    const response = await fetch('https://itacaapi2-0-1oon.onrender.com/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password, numDni })
    });
    if (response.ok) {
      window.location.href = '/Login';
      console.log(username, email, password, numDni)
    } else {
      alert("error al iniciar sesion")
      console.log("ERROR")
    }
  }

  return (
    <div className="register-container">
      <div className="form-content">
        <h1 id="title">Registro</h1>
        <form onSubmit={handleSubmit }>

          <div className="input-group">

            <div className="input-field">
              <span className="icon"><i className="fas fa-user"></i></span>
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="input-field">
              <span className="icon"><i className='fas fa-envelope'></i></span>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input-field">
              <span className="icon"><i className='fas fa-lock'></i></span>
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="input-field">
              <span className="icon"><i className='fas fa-id-card'></i></span>
              <input type="text" placeholder="Identification number " value={numDni} onChange={(e) => setNumDni(e.target.value)} required />
            </div>
          </div>
          <button type="submit" className="btn" >Register</button>
            <div className="login-registrer">
            <p>Already have an account? <Link to="/">Sign In</Link></p>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
