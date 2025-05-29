// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';

import Chatbot from './Components/Chatbot';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </>
  );
}

export default App;
