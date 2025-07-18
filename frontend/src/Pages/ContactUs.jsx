import React from 'react';
import contactImg from '../assets/img/contact2.png';
import '../Styles/Contact.css';
import Sidebar from '../Components/Sidebar';

const ContactUs = () => {
  return (
    <div className="contact-page"> {/* <-- NEW flex wrapper */}
      <Sidebar />
      <div className="contact-container">
        <div className="contact-content">
          <div className="contact-info">
            <img src={contactImg} alt="Contact" className="contact-image" />
            <h2>Contact Us</h2>
            <p>We’d love to hear from you! Reach out for inquiries, feedback, or collaborations.</p>
            <div className="info-block">
              <strong>Email:</strong> support@yourdomain.com
            </div>
            <div className="info-block">
              <strong>Phone:</strong> +94 77 123 4567
            </div>
            <div className="info-block">
              <strong>Address:</strong> No. 123, Purple Street, Colombo, Sri Lanka
            </div>
          </div>

          <form className="email-form">
            <h3>Email Us</h3>
            <input type="text" placeholder="First Name" required />
            <input type="text" placeholder="Last Name" required />
            <input type="email" placeholder="Email" required />
            <textarea rows="5" placeholder="Describe your issue or message..." required></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
