import React, { useEffect, useState } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import "./preview.css"; 

function Preview({ latexData }) {
  const [latexContent, setLatexContent] = useState("");

  useEffect(() => {
    let tableCode = `
      \\begin{array}{|c|c|c|c|c|}
      \\hline
      \\text{S.No} & \\text{Question} & \\text{CO} & \\text{Bloom} & \\text{Marks} \\\\ \\hline
    `;

    for (const part in latexData) {
      for (const question in latexData[part]) {
        const questionData = latexData[part][question];
        tableCode += `
          ${question} & ${questionData.question || ""} & ${questionData.co || ""} & ${questionData.bloom || ""} & ${questionData.marks || ""} \\\\ \\hline
        `;
      }
    }

    tableCode += `
      \\end{array}
    `;

    setLatexContent(tableCode);
  }, [latexData]);

  return (
    <div className="right-part">
      <div className="latex-preview">
        <InlineMath math={latexContent} />
      </div>
    </div>
  );
}

export default Preview;
