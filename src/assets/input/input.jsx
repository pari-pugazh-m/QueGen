import React, { useState, useEffect } from "react";
import "./input.css";

function Input({ selectedPart, selectedQuestion, updateTableData }) { // Rename the prop to updateTableData
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    if (!inputValues[selectedPart]?.[selectedQuestion]) {
      setInputValues((prevInputValues) => ({
        ...prevInputValues,
        [selectedPart]: {
          ...prevInputValues[selectedPart],
          [selectedQuestion]: {
            bloom: "",
            co: "",
            marks: "",
            question: "",
          },
        },
      }));
    } else {
      setInputValues((prevInputValues) => ({
        ...prevInputValues,
        [selectedPart]: {
          ...prevInputValues[selectedPart],
          [selectedQuestion]: {
            ...prevInputValues[selectedPart]?.[selectedQuestion],
          },
        },
      }));
    }
  }, [selectedPart, selectedQuestion]);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    let updatedValue = value;
  
    if (name === "co") {
      // Restrict 'co' to a single digit number
      updatedValue = value.replace(/[^0-9]/g, '').substr(0, 1);
    } else if (name === "marks") {
      // Restrict 'marks' to a number between 0 and 100
      updatedValue = value.replace(/[^0-9]/g, '').substr(0, 3);
      if (updatedValue > 100) {
        updatedValue = "100";
      }
    } else if (name === "bloom") {
      // Restrict 'bloom' to a word with max length of 2
      updatedValue = value.substr(0, 2);
    }
  
    const updatedInputValues = {
      ...inputValues,
      [selectedPart]: {
        ...inputValues[selectedPart],
        [selectedQuestion]: {
          ...inputValues[selectedPart]?.[selectedQuestion],
          [name]: updatedValue,
        },
      },
    };
  
    setInputValues(updatedInputValues);
  };
  
  
  const handleSubmit = (event) => {
    event.preventDefault();

    // Construct the table data using the input values
    const tableRow = [
      selectedQuestion,
      inputValues[selectedPart]?.[selectedQuestion]?.question || "",
      inputValues[selectedPart]?.[selectedQuestion]?.co || "",
      inputValues[selectedPart]?.[selectedQuestion]?.bloom || "",
      inputValues[selectedPart]?.[selectedQuestion]?.marks || ""
    ];

    // Call the updateTableData function to store the table data
    updateTableData([tableRow]);
  };


  return (
    <div className="input">
      <form  onSubmit={handleSubmit}>
        <div className="form-row inline-row">
          <label>Bloom</label>
          <input
            type="text"
            className="small-input"
            name="bloom"
            value={inputValues[selectedPart]?.[selectedQuestion]?.bloom || ""}
            onChange={handleInputChange}
          />
          <label>CO</label>
          <input
            type="text"
            className="small-input"
            name="co"
            value={inputValues[selectedPart]?.[selectedQuestion]?.co || ""}
            onChange={handleInputChange}
          />
          <label>Marks</label>
          <input
            type="text"
            className="small-input"
            name="marks"
            value={inputValues[selectedPart]?.[selectedQuestion]?.marks || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label className="textarea-label">Question:</label>
          <textarea
            name="question"
            placeholder="Question"
            rows="7"
            value={inputValues[selectedPart]?.[selectedQuestion]?.question || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label className="upload-label">Upload Picture</label>
          <input type="file" accept="image/*" />
        </div>
        <div className="form-row">
          <button className="button-submit" type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Input;
