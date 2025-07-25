import React, { useState, useRef, useEffect } from 'react';
import '../Styles/Navbar.css';
import logo from '../assets/logo.png';
import { FiSearch, FiMessageCircle } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        <Link to="/contactus">ContactUs</Link>
        <Link to="/about">About us</Link>
      </div>

      {/* Right: Search bar, chat icon, user icon */}
      <div className="navbar-right" ref={dropdownRef}>
        <div className="search-bar">
          <FiSearch />
          <input type="text" placeholder="Search" />
        </div>
        <Link to="/chatbot">
          <FiMessageCircle className="navbar-icon" />
        </Link>

        {/* Profile icon with dropdown */}
        <div className="profile-dropdown-container">
          <FaUserCircle
            className="navbar-icon"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && (
            <div className="profile-dropdown">
              <button
                className="dropdown-item"
                onClick={() => {
                  setDropdownOpen(false);
                  navigate('/UserProfile');
                }}
              >
                User Profile
              </button>
              <button
                className="dropdown-item"
                onClick={() => {
                  setDropdownOpen(false);
                  // Add logout logic here later
                  alert('Logged out (placeholder)');
                }}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
