import React, { useState } from 'react';
import './App.css';
import Titlebar from './assets/general/titlebar.jsx';
import Navbar from './assets/navbar/navbar.jsx';
import Splitscreen from './assets/general/splitscreen.jsx'; 


function App() {
  const [selectedPart, setSelectedPart] = useState("A");
  const [selectedQuestion, setSelectedQuestion] = useState(1);

  const handlePartChange = (part) => {
    setSelectedPart(part);
    setSelectedQuestion(1); 
  };

  const handleQuestionChange = (questionNumber) => {
    setSelectedQuestion(questionNumber);
  };

  return (
    <div className="app">
      <Titlebar />
      <Navbar
        selectedPart={selectedPart}
        onPartChange={handlePartChange}
        onQuestionChange={handleQuestionChange}
      />
      <Splitscreen selectedPart={selectedPart} selectedQuestion={selectedQuestion} />
      
    </div>
  );
}

export default App;
