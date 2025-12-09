import React, { useState } from "react";
import s from "./ResultData.module.css";

const ResultData = ({ results }) => {
  // Ensure only the last 10 results are displayed
  const displayedResults = results.slice(-10);
  const [sample, setSample] = useState(
    Array.from({ length: 10 }, () =>
      Array.from({ length: 28 }, () => (Math.random() < 0.5 ? "A" : "B"))
    )
  );

  return (
    <div className={`w-100 main mb-1 overflow-hidden d-flex justify-content-center ${s.main}`}>
      <div className="d-flex  flex-column">
        {sample.map((column, colIndex) => (
          <div className="d-flex gap-1" key={colIndex}>
            {column.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="box border border-secondary mb-1 d-flex justify-content-center align-items-center"
                style={{
                  height: "3vw",
                  width: "3vw",
                  fontSize: "2vw",
                  fontWeight: "bold",
                  color: row === "A" ? "green" : "red",
                }}
              >
                {row}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultData;
