// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import AboutUS from "./Pages/AboutUS";

import Chatbot from './Components/Chatbot';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/about" element={<AboutUS />} />
        
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </>
  );
}

export default App;
