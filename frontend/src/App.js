// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Chatbot from './Components/Chatbot';
import Login from './Pages/login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import UserProfile from './Pages/UserProfile';
import ResumeBuilder from './Pages/ResumeBuilder';
import EducationForm from './Pages/Forms/EducationForm';
import EducationForm2 from './Pages/Forms/EducationForm2';
import EducationForm3 from './Pages/Forms/EducationForm3';
import EducationForm4 from './Pages/Forms/EducationForm4';

import ProgressForm from './Components/ProgressBar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/resume" element={<ResumeBuilder />} />
        <Route path="/form" element={<EducationForm />} />
        <Route path="/form2" element={<EducationForm2 />} />
        <Route path="/form3" element={<EducationForm3 />} />
         <Route path="/form4" element={<EducationForm4 />} />
    
        <Route path="/progress-bar" element={< ProgressForm />} />
      </Routes>
    </>
  );
}

export default App;
