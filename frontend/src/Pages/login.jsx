import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import "../Styles/Login.css";
import loginImage from "../assets/img/skillimage.png";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = { email, password };

    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || 'Login successful!');
        // Store the token for future authenticated requests
        localStorage.setItem('token', data.token);
        // Navigate to /dashboard after successful login
        navigate('/dashboard');
      } else {
        setMessage(data.message || 'Login failed.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-image">
        <img src={loginImage} alt="Login Image" />
      </div>
      <div className="login-wrapper">
        <div className="login-container" style={{ width: '350px', height: '400px' }}>
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
            {message && <p>{message}</p>}
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