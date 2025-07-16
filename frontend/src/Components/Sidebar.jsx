// Sidebar.jsx
import React from 'react';
import { FaHome, FaBook, FaRobot, FaHeart, FaUser, FaChartBar } from 'react-icons/fa';
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
          </li><br />
          <li className="menu-item">
            <FaBook className="icon" />
            <span>Academic Records</span>
          </li><br />
          <li className="menu-item" onClick={() => navigate("/chatbot")}>
            <FaRobot className="icon" />
            <span>ChatBot</span>
          </li><br />
          <li className="menu-item">
            <FaHeart className="icon" />
            <span>Help</span>
          </li><br />
          <li className="menu-item" onClick={() => navigate("/userprofile")}>
            <FaUser className="icon" /> 
            <span>Profile</span>
          </li><br />
          <li className="menu-item" onClick={() => navigate("/resume")}>
            <FaUser className="icon" /> 
            <span>Resume Builder</span>
          </li><br></br>
          <li className="menu-item" onClick={() => navigate("/trends")}>
            <FaChartBar className="icon" /> 
            <span>Trends</span>
          </li><br></br>
          <li className="menu-item" onClick={() => navigate("/cvupload")}>
            <FaChartBar className="icon" /> 
            <span>Career predictor</span>
          </li><br></br>

        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;