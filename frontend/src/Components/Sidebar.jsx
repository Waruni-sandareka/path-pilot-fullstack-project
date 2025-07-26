import React from 'react';
import { FaHome, FaBook, FaRobot, FaHeart, FaUser, FaChartBar, FaFileAlt, FaChartLine } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import "../Styles/Dashboard.css";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
  <nav className="sidebar-nav">
    <ul className="menu">
          <li className="menu-item" onClick={() => navigate("/")}>
            <FaHome className="icon" />
            <span>Home</span>
          </li><br />
          <li className="menu-item" onClick={() => navigate("/academicrecords")}>
            <FaBook className="icon" />
            <span>Academic Records</span>
          </li><br />
          <li className="menu-item" onClick={() => navigate("/chatbot")}>
            <FaRobot className="icon" />
            <span>ChatBot</span>
          </li><br />
          <li className="menu-item" onClick={() => navigate("/userprofile")}>
            <FaUser className="icon" /> 
            <span>Profile</span>
          </li><br />
          <li className="menu-item" onClick={() => navigate("/resume")}>
            <FaFileAlt className="icon" /> 
            <span>Resume Builder</span>
          </li><br />
          <li className="menu-item" onClick={() => navigate("/trends")}>
            <FaChartBar className="icon" /> 
            <span>Trends</span>
          </li><br />
          <li className="menu-item" onClick={() => navigate("/cvupload")}>
            <FaChartLine className="icon" /> 
            <span>Career predictor</span>
          </li><br />
          <li className="menu-item"onClick={() => navigate("/help")}>
            <FaHeart className="icon" />
            <span>Help</span>
          </li><br />
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
