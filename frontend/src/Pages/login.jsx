import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../Styles/Login.css";


import loginImage from "../assets/img/skillimage.png"; 





function Login() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement login functionality here
    console.log({ email, password });
  };

  return (

<div className="login-page">
    {/* Left side Image */}
    
    <div className="login-image">
    <img src={loginImage} alt="Login Image" />

   
    </div>
    
    <div className="login-wrapper">

    <div className="login-container" style={{ width: '350px', height: '400px' }}>
      
      

      {/* Form Section */}
      <div className="login-form">
      <br />
     
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
          <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
        </svg>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h2>Login</h2><br />
        </div>
        <form onSubmit={handleSubmit}>
          <br /><br />
          <div className="input-group">
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div><br />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
             <button type="submit" className="btn btn-primary">Login</button>
          </div>

        </form>
        <br />
        <p>
          Don't have an account? <Link to="/register">Create a account</Link>
        </p>
      </div>
    </div>
    </div>
    </div>
  );
}

export default Login;