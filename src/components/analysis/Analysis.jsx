import React, { useEffect, useState } from "react";
import ResultData from "./ResultData";
import Result from "../Result";
import Cocroach from "./Cocroach";
import Container from "../layout/Container";
import { useDispatch, useSelector } from "react-redux";
import { addData, deleteAllData, deleteLastData, deleteStates, slice10FromFront } from "../../redux/actions/resultAction";
import { deleteLastDataFromDB, softDeleteAllData } from "../../database/indexedDB";


const Analysis = () => {
    const [resultData, setResultData] = useState(["A"]);
    const result = useSelector(state => state.resultStore)
    const dispatch = useDispatch()

  useEffect(() => {
    const handleKeyDown = (e) => {

       // console.log("resultLength ",result.length)

      const tag = e.target.tagName;

    // 🚫 Ignore when typing in inputs
    if (
      tag === "INPUT" ||
      tag === "TEXTAREA" ||
      e.target.isContentEditable
    ) {
      return;
    }

      if(e.key === "l" || e.key === "L" ){
        dispatch(deleteLastData())
        deleteLastDataFromDB()
        return
      }

       if(e.key === "f" || e.key === "f" ){
        dispatch(slice10FromFront())
        return
      }

      if(e.key === "d" || e.key === "D" ){
        dispatch(deleteAllData())
        dispatch(deleteStates())
        //softDeleteAllData()
        return
      }

      /* 
      if(  e.code === "Numpad7" || e.code === "Numpad9" ){
        if(result.length >= 280 ){

          console.log("resultLength ",result.length)
          dispatch(slice10FromFront())
        }

        } */

      if (!e.getModifierState("NumLock")) return;

     
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);


  return (
    <>
      <Container py={0} px={3} h={"54vh"} noContainer={true} classes={" "}>
        <div className={`h-100  w-100 d-flex flex-column gap-2`}>
          {/* 
           */}
           <ResultData />
          <Cocroach />
      </div>
    </Container>
    </>
  );
};

export default Analysis;
