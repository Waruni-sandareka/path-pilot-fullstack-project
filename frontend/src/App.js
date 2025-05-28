import React from 'react';
import Navbar from './Components/Navbar';
import ChatBot from './Components/Chatbot';

function App() {
  console.log("App component loaded"); // Add this

  return (
    <div>
      <Navbar />
      <ChatBot />
    </div>
  );
}

export default App;
