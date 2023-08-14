import React from "react";
import "./navbar.css";

function Navbar({ selectedPart, onPartChange, onQuestionChange }) {
  const handlePartClick = (part) => {
    onPartChange(part);
    onQuestionChange(1); 
  };

  const handleQuestionClick = (questionNumber) => {
    onQuestionChange(questionNumber);
  };

 

  return (
    <div className="container">
      <div className="navbar part">
        <button onClick={() => handlePartClick("A")}>A</button>
        <button onClick={() => handlePartClick("B")}>B</button>
      </div>
      <div className="line"></div>
      <div className="navbar qno">
        <button onClick={() => handleQuestionClick(1)}>1</button>
        <button onClick={() => handleQuestionClick(2)}>2</button>
        <button onClick={() => handleQuestionClick(3)}>3</button>
        <button onClick={() => handleQuestionClick(4)}>4</button>
        {/* Add more question buttons here */}
      </div>
    </div>
  );
}

export default Navbar;
