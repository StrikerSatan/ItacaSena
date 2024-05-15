import { useState } from 'react';
import '../Css/Login.css'
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://itacaapi-puw8.onrender.com/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });
    if (response.ok) {
      const data = await response.json();
      const decodedToken = jwtDecode(data.token);
      const userRole = decodedToken.role;
      localStorage.setItem('token', data.token);
      if (userRole == 'admin') {
        window.location.href = '/admin';
      }else if (userRole == 'user'){
        window.location.href = '/menu';
      }else if (userRole == 'client'){
      window.location.href = '/proyecto';
      }
    } else {
      alert("error al iniciar sesion")
      console.log("ERROR");
    }
  };
  return (
    <div className="container">

      <div className="content">
        <div className="text-sc">
          <img src="/Image/Logos.png" alt="Logo" width="400" height="400" />
          <p>More than 20 years<br />finding solutions <span style={{ color: 'rgb(4, 107, 9)' }}>keys</span><br />to build processes and<br />strategies in<br />several industries</p>
          <div className="social-icons">
            <a href="https://co.linkedin.com" target="_blank"><i className='fab fa-linkedin'></i></a>
            <a href="https://www.facebook.com" target="_blank"><i className='fab fa-facebook'></i></a>
            <a href="https://www.instagram.com" target="_blank"><i className='fab fa-instagram'></i></a>
          </div>
        </div>
      </div>
      <div className="logreg-box">
        <div className="form-box">
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="input-box">
              {/* <span className="icon"><i className='fas fa-envelope'></i></span> */}
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <label> Email</label>
            </div>
            <div className="input-box">
              {/* <span className="icon"><i className='fas fa-lock'></i></span> */}
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <label> Password</label>
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" style={{ width: "auto", height: "auto", marginRight: "10px" }} />
                Remember me
              </label>
              <a href="/forgotpassword">Forgot password?</a>
            </div>
            <button type="submit" className="btn" >Login</button>
            <div className="login-registrer">
              <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
