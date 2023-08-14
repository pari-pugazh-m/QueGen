import React, { useState } from "react";
import Pageno from "../pageno/pageno";
import Input from "../input/input.jsx";
import Preview from "../preview/preview"; // Make sure the path is correct
import "./splitscreen.css";

function Splitscreen({ selectedPart, selectedQuestion }) {
  const [latexData, setLatexData] = useState("");

  const updateLatexData = (data) => {
    setLatexData(data);
  };

  return (
    <div className="splitscreen">
      <div className="left">
        <Pageno selectedPart={selectedPart} selectedQuestion={selectedQuestion} />
        <Input
          selectedPart={selectedPart}
          selectedQuestion={selectedQuestion}
          updateLatexData={updateLatexData}
        />
      </div>
      <div className="right">
        <Preview latexData={latexData} selectedPart={selectedPart} selectedQuestion={selectedQuestion}/>
      </div>
    </div>
  );
}

export default Splitscreen;
