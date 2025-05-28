import React from 'react';
import '../Styles/Navbar.css';
import logo from '../assets/logo.png';
import { FiSearch, FiMessageCircle } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="navbar-left">
        <img src={logo} alt="PathPilot Logo" className="navbar-logo" />
        
      </div>

      {/* Center: Navigation Links */}
      <div className="navbar-links">
        <a href="#">Home</a>
        <a href="#">Services</a>
        <a href="#">Dashboard</a>
        <a href="#">Contact</a>
        <a href="#">About us</a>
      </div>

      {/* Right: Search bar, chat icon, user icon */}
      <div className="navbar-right">
        <div className="search-bar">
          <FiSearch />
          <input type="text" placeholder="Search" />
        </div>
        <FiMessageCircle className="navbar-icon" />
        <FaUserCircle className="navbar-icon" />
      </div>
    </nav>
  );
};

export default Navbar;
