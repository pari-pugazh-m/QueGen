import React, { useState, useEffect } from "react";
import Pageno from "../pageno/pageno";
import Input from "../input/input";
import Preview from "../preview/preview";
import "./splitscreen.css";

function Splitscreen({ selectedPart, selectedQuestion }) {
  const [tableData, setTableData] = useState([]);

  const updateTableData = (data) => {
    // Update the table data with the new row
    setTableData((prevTableData) => [...prevTableData, ...data]);
  };

  return (
    <div className="splitscreen">
      <div className="left">
        <Pageno selectedPart={selectedPart} selectedQuestion={selectedQuestion} />
        <Input
          selectedPart={selectedPart}
          selectedQuestion={selectedQuestion}
          updateTableData={updateTableData} // Use the correct function name
        />
      </div>
      <div className="right">
        <Preview
          tableData={tableData} // Pass the updated table data to the Preview component
        />
      </div>
    </div>
  );
}

export default Splitscreen;
