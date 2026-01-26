  import React, { useContext, useEffect, useState } from "react";
  import s from "./Cocroach.module.css";
  import { useDispatch, useSelector } from "react-redux";
import LiquidGlass from "liquid-glass-react";
import { deleteStates, setStates } from "../../redux/actions/cardAction";

  const CardTable = () => {
    const values = Array.from({ length: 11 }, (_, i) => i); // 0 to 10
    const dispatch = useDispatch()

    const tempCardState = [{ name: "0", value: 0, andarWins: 0, baharWins: 0 },
    { name: "A", value: 1, andarWins: 0, baharWins: 0 },
    { name: "2", value: 2, andarWins: 0, baharWins: 0 },
    { name: "3", value: 3, andarWins: 0, baharWins: 0 },
    { name: "4", value: 4, andarWins: 0, baharWins: 0 },
    { name: "5", value: 5, andarWins: 0, baharWins: 0 },
    { name: "6", value: 6, andarWins: 0, baharWins: 0 },
    { name: "7", value: 7, andarWins: 0, baharWins: 0 },
    { name: "8", value: 8, andarWins: 0, baharWins: 0 },
    { name: "9", value: 9, andarWins: 0, baharWins: 0 },
    { name: "10", value: 10, andarWins: 0, baharWins: 0 },
    { name: "J", value: 11, andarWins: 0, baharWins: 0 },
    { name: "Q", value: 12, andarWins: 0, baharWins: 0 },
    { name: "K", value: 13, andarWins: 0, baharWins: 0 }]

     const [cardStates,setCardStates] = useState(tempCardState)

    const databaseData = useSelector((state) => state.databaseStore) 

    useEffect(() => {
      //console.log("cardState: ", cardStates)
    }, [cardStates])

    useEffect(()=>{
     // console.log("databaseData 👉", databaseData || null);
      let tempState = tempCardState.map(item => ({ ...item }));
      if(databaseData.length <= 0){
        for(let i in tempState){
          tempState[i].andarWins = 0;
          tempState[i].baharWins = 0
        }
        setCardStates(tempState)
        dispatch(deleteStates())
        return
      } 


      for(let i in databaseData){
        if(databaseData[i].jokerCard && databaseData[i].winner == 'A'){
          tempState[databaseData[i]?.jokerValue].andarWins = tempState[databaseData[i]?.jokerValue].andarWins + 1
         }

          if(databaseData[i].jokerCard && databaseData[i].winner == 'B'){
          tempState[databaseData[i]?.jokerValue].baharWins = tempState[databaseData[i]?.jokerValue].baharWins + 1
         }
      }

     // console.log("tempState: ",tempState)

      setCardStates(tempState)
      dispatch(setStates(tempState))

    },[databaseData])

     


    return (
      <div className=" h-100 w-100 fs-5">
        <table className=" w-100 text-center h-100  "   >

          <colgroup>
            <col style={{ width: "40%" }} />
            <col style={{ width: "30%" }} />
            <col style={{ width: "30%" }} />
          </colgroup>

          <thead className="border border-secondary">
            <tr className="capitalize">
              <th>Card</th>
              <th>A</th>
              <th>B</th>
            </tr>
          </thead>
          <tbody>
            {cardStates.map((card, i) => (
              <tr key={i} className={`${card.name == 0 ? 'd-none' : ''}`}>
                <td className="border border-secondary">{card.name}</td>
                <td className="border border-secondary">{card.andarWins}</td>
                <td className="border border-secondary">{card.baharWins}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };


  const Cocroach = () => {
    const result = useSelector((state) => state.resultStore);

    const rows = 10;
    const cols = 23;
    const [displayedResult, setDisplayResult] = useState(
      Array.from({ length: rows }, () => Array.from({ length: cols }))
    );

    useEffect(() => {
      //console.log("result: ", result);
      buildCocroach(result);
      
    }, [result]);

    const buildCocroach = (results) => {
      const temp = buildGridColumnWise(results, rows, cols);
      console.log("temp: ", temp);

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
            if (col == cols - 1 && row == rows-1) {
              grid = slideBack(grid)
             // console.log("slideBack grid : ", grid)
              col = col - 1
            }
            grid[row][col] = results[index++];
          } else {
            if (col == cols - 1) {
              grid = slideBack(grid)
             // console.log("slideBack grid : ", grid)
              col = col - 1
            }
            break;
          }
        }
      }

      console.log("final grid: ", grid)

      return grid;
    };

    const slideBack = (grid) => {

      console.log("slideBack grid:",grid)
      // create fresh grid
      const newGrid = Array.from({ length: rows }, () =>
        Array(cols).fill(null)
      );
      /* let newGrid = grid */

      // shift columns left
      for (let row = 0; row < rows; row++) {
        for (let col = 1; col < cols; col++) {
          newGrid[row][col - 1] = grid[row][col];
        }
      }
      console.log("newGrid: ",newGrid)

      return newGrid;
    };

    return (
      <>
      
        <div className={`d-flex w-100 gap-1 `}>
          <div
            className={`h-50   d-flex justify-content-center h-100  ${s.main}`}
            style={{ width: "70vw" }}
          >
            <div className="d-flex  flex-column">
              {displayedResult.map((column, colIndex) => (
                <div className={`d-flex gap-1 `} key={colIndex}>
                  {column.map((row, rowIndex) => (
                    <div
                      key={rowIndex}
                      className={`box border border-secondary mb-1 d-flex justify-content-center align-items-center ${rowIndex >= 5 ? "" : ""
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
            className=" h-100 "
            style={{ width: "30vw" }}
          >
            <div className="d-flex text-center   h-100 capitalize">
              <CardTable />
             
            </div>
          </div>
        </div>
      </>
    );
  };

  export default Cocroach;
