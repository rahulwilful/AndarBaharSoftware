import React, { useContext, useEffect, useState } from "react";
import s from "./Cocroach.module.css";
import { useDispatch, useSelector } from "react-redux";
import LiquidGlass from "liquid-glass-react";
import { deleteStates, setStates } from "../../redux/actions/cardAction";

const Cocroach = () => {
  const result = useSelector((state) => state.resultStore);

  const rows = 10;
  const cols = 23;
  const [displayedResult, setDisplayResult] = useState(
    Array.from({ length: rows }, () => Array.from({ length: cols })),
  );

  useEffect(() => {
    //console.log("result: ", result);
    buildCocroach(result);
  }, [result]);

  const buildCocroach = (results) => {
    const temp = buildGridColumnWise(results, rows, cols);
    //console.log("temp: ", temp);

    setDisplayResult(temp);
  };

  const buildGridColumnWise = (results, rows, cols) => {
    let grid = Array.from({ length: rows }, () => Array(cols).fill(null));

    let index = 0;

    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        if (index >= results.length) return grid;
        if (index == 0 || row == 0) {
          grid[row][col] = results[index++];
        } else if (results[index] == results[index - 1]) {
          if (col == cols - 1 && row == rows - 1) {
            grid = slideBack(grid);
            // console.log("slideBack grid : ", grid)
            col = col - 1;
          }
          grid[row][col] = results[index++];
        } else {
          if (col == cols - 1) {
            grid = slideBack(grid);
            // console.log("slideBack grid : ", grid)
            col = col - 1;
          }
          break;
        }
      }
    }

    console.log("final grid: ", grid);

    return grid;
  };

  const slideBack = (grid) => {
    //console.log("slideBack grid:",grid)
    // create fresh grid
    const newGrid = Array.from({ length: rows }, () => Array(cols).fill(null));
    /* let newGrid = grid */

    // shift columns left
    for (let row = 0; row < rows; row++) {
      for (let col = 1; col < cols; col++) {
        newGrid[row][col - 1] = grid[row][col];
      }
    }
    // console.log("newGrid: ",newGrid)

    return newGrid;
  };

  return (
    <>
      <div className={`d-flex  gap-1  `}>
        <div
          className={`   d-flex justify-content-center   ${s.main}`}
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
                    {/*  {row} ${row == "A" ? 'bg-success bg-gradient' : row == "B" ? 'bg-danger bg-gradient' : null} */}
                    <div
                      className="rounded-circle shadow-xs"
                      style={{
                        height: "1.7vw",
                        width: "1.7vw",
                        backgroundColor:
                          row === "A"
                            ? "rgb(4, 122, 45)"
                            : row === "B"
                              ? "rgb(194, 11, 11)"
                              : "transparent",
                      }}
                    ></div>{" "}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cocroach;
