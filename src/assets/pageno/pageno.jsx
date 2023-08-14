import React from "react";
import "./pageno.css";

function Pageno({ selectedPart, selectedQuestion }) {

  return (
    <div className="navbox">
      <h1>{`Part ${selectedPart} - ${selectedQuestion}`}</h1>
    </div>
  );
}

export default Pageno;
