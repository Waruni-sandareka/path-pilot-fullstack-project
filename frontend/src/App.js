// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Chatbot from './Components/Chatbot';
import Login from './Pages/login';
import Register from './Pages/Register';
import Trends from './Pages/Trends';
import Dashboard from './Pages/Dashboard';
import UserProfile from './Pages/UserProfile';
import ResumeBuilder from './Pages/ResumeBuilder';
import EducationForm from './Pages/Forms/EducationForm';
import EducationForm2 from './Pages/Forms/EducationForm2';
import EducationForm3 from './Pages/Forms/EducationForm3';
import EducationForm4 from './Pages/Forms/EducationForm4';
import Services from './Pages/Services';
import ProgressForm from './Components/ProgressBar';
import ContactUs from './Pages/ContactUs';
import About from './Pages/About';
import CVUpload from './Pages/JobRolePredictor';
import AcademicRecords from './Pages/AcademicRecords';
import HelpPage from './Pages/Help';

function App() {
  return (
    <>
      <Navbar />
      <div className="page-content">
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
         <Route path="/trends" element={<Trends />} />
         <Route path="/services" element={<Services />} />
         <Route path="/contactus" element={<ContactUs/>}/>
         <Route path="/about" element={<About/>}/>
        <Route path="/progress-bar" element={< ProgressForm />} />
        <Route path="/cvupload" element = {<CVUpload/>}/>
        <Route path="/academicrecords" element = {<AcademicRecords/>}/>
        <Route path="/help" element = {<HelpPage/>}/>
       
      </Routes></div>
    </>
    
  );
}

export default App;
