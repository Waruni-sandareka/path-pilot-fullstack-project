import React from 'react';
import '../Styles/Navbar.css';
import logo from '../assets/logo.png';
import { FiSearch, FiMessageCircle } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const scrollToSection = (id) => {
    if (window.location.pathname === '/') {
      const elem = document.getElementById(id);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll
      }
    } else {
      window.location.href = `/#${id}`; // Redirect if NOT on Home
    }
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src={logo} alt="PathPilot Logo" className="navbar-logo" />
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <span className="nav-link" onClick={() => scrollToSection("services")}>
          Services
        </span>
        <Link to="/dashboard">Dashboard</Link>
        <span className="nav-link" onClick={() => scrollToSection("contact")}>
          Contact
        </span>
        <Link to="/about">About us</Link>
      </div>

      <div className="navbar-right">
        <div className="search-bar">
          <FiSearch />
          <input type="text" placeholder="Search" />
        </div>
        <Link to="/chatbot">
          <FiMessageCircle className="navbar-icon" />
        </Link>
        <FaUserCircle className="navbar-icon" />
      </div>
    </nav>
  );
};

export default Navbar;
