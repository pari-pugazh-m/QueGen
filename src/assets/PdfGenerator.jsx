import React, { useState } from "react"; // Import useState from React
import { renderToString } from "react-dom/server";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function PdfGenerator({ latexData, selectedPart, selectedQuestion }) {
  const generateLatexContent = () => {
    const questionData = latexData[selectedPart]?.[selectedQuestion] || {};
    return `\\begin{tabular}{|c|c|c|c|c|}
      \\hline
      S.No & Question & CO & Bloom & Marks \\\\ \\hline
      ${selectedQuestion} & ${questionData.question || ""} & ${questionData.co || ""} & ${questionData.bloom || ""} & ${questionData.marks || ""} \\\\ \\hline
      \\end{tabular}`;
  };

  const latexContent = generateLatexContent(); // Generate LaTeX content

  // Example usage of useState for a download link
  const [pdfDownloadLink, setPdfDownloadLink] = useState(null);

  // Function to handle generating and setting the PDF download link
  const generatePDF = async () => {
    // Get the question data based on selectedPart and selectedQuestion
    const partData = latexData[selectedPart] || [];
    const questionData = partData[selectedQuestion] || {};

    // Generate LaTeX content for the PDF
    const latexContent = `\\begin{tabular}{|c|c|c|c|c|}
    \\hline
    S.No & Question & CO & Bloom & Marks \\\\ \\hline
    ${selectedQuestion} & ${questionData.question || ""} & ${questionData.co || ""} & ${questionData.bloom || ""} & ${questionData.marks || ""} \\\\ \\hline
    \\end{tabular}`;

    // Generate the PDF using html2canvas and jsPDF
    const renderedContent = document.getElementById("rendered-content");
    const canvas = await html2canvas(renderedContent);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 190, 280); // Adjust the position and size as needed

    // Generate a download link for the PDF
    const pdfBlob = pdf.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setPdfDownloadLink(pdfUrl);
  };

  return (
    <div className="pdf-generator">
      <button onClick={generatePDF}>Generate PDF</button>
      {pdfDownloadLink && <a href={pdfDownloadLink} download>Download PDF</a>}
    </div>
  );
}

export default PdfGenerator;

