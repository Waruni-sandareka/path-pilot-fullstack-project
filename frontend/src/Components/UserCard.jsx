import React from 'react';
import { User, Mail, Crown } from 'lucide-react';
import '../Styles/ResumeBuilder.css';

const UserCard = ({ user, loading }) => {
  if (loading) {
    return (
      <div className="user-card loading">
        <div className="user-card-content">
          <div className="user-avatar-placeholder"></div>
          <div className="user-text-placeholder">
            <div className="placeholder-line"></div>
            <div className="placeholder-line short"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-card">
      <div className="user-card-content">
        <div className="user-avatar-container">
          <div className="user-avatar">
            <User className="user-icon" />
          </div>
          <div className="user-crown">
            <Crown className="crown-icon" />
          </div>
        </div>
        <div className="user-text">
          <h3 className="user-title">Welcome, {user.username}!</h3>
          <div className="user-email">
            <Mail className="email-icon" />
            <span>{user.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;