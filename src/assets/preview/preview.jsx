import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import './preview.css';
import jsPDF from 'jspdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Preview({ tableData }) {
  console.log('Received tableData:', tableData);
  const [pdfBlob, setPdfBlob] = useState(null);

  useEffect(() => {
    // Create a new PDF document
    const doc = new jsPDF('p', 'pt', 'a4'); // Specify 'a4' as page format

    // Add the table to the PDF
    generatePdfTable(doc, tableData);

    // Get the PDF blob
    const pdfOutput = doc.output('blob');
    setPdfBlob(pdfOutput);

    // Save the PDF as "output.pdf"
    doc.save('output.pdf');
  }, [tableData]);

  function generatePdfTable(doc, data) {
    const header = ['S.No', 'Question', 'Bloom', 'CO', 'Mark'];
    const table = [header, ...data];

    doc.setFont('times', 'normal');
    doc.setFontSize(12);

    // Calculate column widths and row heights
    const columnWidths = [40, 240, 40, 40, 40];
    const rowHeight = 18; // Adjust this value as needed

    // Calculate total table width
    const totalTableWidth = columnWidths.reduce((total, width) => total + width, 0);

    // Calculate starting x position for center alignment
    const startX = (doc.internal.pageSize.width - totalTableWidth) / 2;

    // Set initial x and y positions
    let x = startX;
    let y = 50;

    // Loop through rows and columns to add cells
    table.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        doc.rect(x, y, columnWidths[colIndex], rowHeight, 'S'); // Draw cell border
        doc.text(x + 5, y + 12, String(cell)); // Convert cell to string and add text with padding

        x += columnWidths[colIndex];
      });

      x = startX;
      y += rowHeight;
    });
  }

  return (
    <div className="right-part">
      <div className="pdf-preview">
        {pdfBlob && (
          <Document file={pdfBlob} loading="Loading PDF...">
            <Page pageNumber={1} />
          </Document>
        )}
      </div>
    </div>
  );
}

export default Preview;
