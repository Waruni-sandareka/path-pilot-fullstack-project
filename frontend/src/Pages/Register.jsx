import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../Styles/Register.css";
import loginImage from "../assets/img/dashimage.png";

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, email, password };

    try {
      const response = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || 'Registration successful!');
        localStorage.setItem('token', data.token); // Store token if needed
      } else {
        setMessage(data.message || 'Registration failed.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="register-page">
      <div className="register-image">
        <img src={loginImage} alt="Register Image" />
      </div>
      <div className="register-wrapper">
        <div className="register-container" style={{ width: '350px', height: '420px' }}>
          <div className="register-form">
            <br />
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
            </svg>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <h2>Register</h2><br />
            </div>
            <form onSubmit={handleSubmit}>
              <br /><br />
              <div className="input-group">
                <input
                  type="text"
                  id="username"
                  placeholder="User Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
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
                <button type="submit" className="btn btn-primary">Register</button>
              </div>
            </form>
            <br />
            {message && <p>{message}</p>}
            <p>
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;