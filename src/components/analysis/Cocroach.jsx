import React, { useContext, useEffect, useState } from "react";
import s from "./Cocroach.module.css";
import { useSelector } from "react-redux";

const Cocroach = () => {
  const result = useSelector((state) => state.resultStore);

  const rows = 10;
  const cols = 23;
  const [displayedResult, setDisplayResult] = useState(
    Array.from({ length: rows }, () => Array.from({ length: cols }))
  );

  useEffect(() => {
    console.log("result: ", result);
    buildCocroach(result);
  }, [result]);

  const buildCocroach = (results) => {
    const temp = buildGridColumnWise(results, rows, cols);
    console.log("temp: ", temp);

    setDisplayResult(temp);
  };

  const buildGridColumnWise = (results, rows, cols) => {
    const grid = Array.from({ length: rows }, () => Array(cols).fill(null));

    let index = 0;

    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        if (index >= results.length) return grid;
        if (index == 0 || row == 0) {
          grid[row][col] = results[index++];
        } else if (results[index] == results[index - 1]) {
          grid[row][col] = results[index++];
        } else {
          break;
        }
      }
    }

    return grid;
  };

  const slideBack = () => {

  }

  return (
    <>
      <div className={`d-flex w-100   ${s.main}`}>
        <div
          className="h-50 border border-warning border-3 d-flex justify-content-between h-100 "
          style={{ width: "70vw" }}
        >
          <div className="d-flex  flex-column">
            {displayedResult.map((column, colIndex) => (
              <div className={`d-flex gap-1 `} key={colIndex}>
                {column.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className={`box border border-secondary mb-1 d-flex justify-content-center align-items-center ${
                      rowIndex >= 5 ? "" : ""
                    }`}
                    style={{
                      height: "2.5vw",
                      width: "2.5vw",
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
        <div
          className="border border-success border-2 "
          style={{ width: "30vw" }}
        >
          <div className="d-flex text-center capitalize">
            <div className="border w-100">card</div>
            <div className="border w-100">A</div>
            <div className="border w-100">B</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cocroach;
