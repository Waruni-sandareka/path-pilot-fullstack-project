import React from 'react';
import '../Styles/Navbar.css';
import logo from '../assets/logo.png';
import { FiSearch, FiMessageCircle } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="navbar-left">
        <Link to="/">
          <img src={logo} alt="PathPilot Logo" className="navbar-logo" />
        </Link>
      </div>

      {/* Center: Navigation Links */}
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About us</Link>
      </div>

      {/* Right: Search bar, chat icon, user icon */}
      <div className="navbar-right">
        <div className="search-bar">
          <FiSearch />
          <input type="text" placeholder="Search" />
        </div>
         <Link to="/chatbot">
    <FiMessageCircle className="navbar-icon" /></Link>
        <FaUserCircle className="navbar-icon" />
      </div>
    </nav>
  );
};

export default Navbar;
