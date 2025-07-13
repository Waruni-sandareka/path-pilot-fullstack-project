// Sidebar.jsx
import React from 'react';
import { FaHome, FaBook, FaRobot, FaHeart, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import "../Styles/Dashboard.css"; // Adjust path if needed

function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <nav>
        <ul className="menu">
          <li className="menu-item" onClick={() => navigate("/")}>
            <FaHome className="icon" />
            <span>Home</span>
          </li>
          <li className="menu-item">
            <FaBook className="icon" />
            <span>Academic Records</span>
          </li>
          <li className="menu-item" onClick={() => navigate("/chatbot")}>
            <FaRobot className="icon" />
            <span>ChatBot</span>
          </li>
          <li className="menu-item">
            <FaHeart className="icon" />
            <span>Help</span>
          </li>
          <li className="menu-item" onClick={() => navigate("/userprofile")}>
            <FaUser className="icon" /> {/* Add FaUser from react-icons/fa if needed */}
            <span>Profile</span>
          </li>
          <li className="menu-item" onClick={() => navigate("/resume")}>
            <FaUser className="icon" /> {/* Add FaUser from react-icons/fa if needed */}
            <span>Resume Builder</span>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;