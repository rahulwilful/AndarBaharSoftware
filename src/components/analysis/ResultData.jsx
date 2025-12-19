import React, { useEffect, useState } from "react";
import s from "./ResultData.module.css";
import { useSelector } from "react-redux";

const ResultData = ({ results }) => {
  // Ensure only the last 10 results are displayed

  const result = useSelector((state) => state.resultStore);

  const rows = 10;
  const cols = 28;
  const [displayedResult, setDisplayResult] = useState(
    Array.from({ length: rows }, () => Array.from({ length: cols }))
  );
  let tempResult = Array.from(
    Array.from({ length: rows }, () => Array.from({ length: cols }))
  );

  useEffect(() => {
    manageResult();
  }, [result]);

  const manageResult = () => {
    console.log("result: ",result)
    const tempResult = buildGridColumnWise(result, rows, cols);
    setDisplayResult(tempResult);
  };

  const buildGridColumnWise = (results, rows, cols) => {
  const grid = Array.from({ length: rows }, () =>
    Array(cols).fill(null)
  );

  let index = 0;

  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      if (index >= results.length) return grid;
      grid[row][col] = results[index++];
    }
  }

  return grid;
};


  return (
    <div
      className={`w-100 main mb-1 overflow-hidden d-flex justify-content-center ${s.main} overflow-scrol`}
    >
      <div className="d-flex  flex-column">
        {displayedResult.map((column, colIndex) => (
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
