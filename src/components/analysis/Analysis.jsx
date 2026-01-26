import React, { useEffect, useState } from "react";
import ResultData from "./ResultData";
import Result from "../Result";
import Cocroach from "./Cocroach";
import Container from "../layout/Container";
import { useDispatch, useSelector } from "react-redux";
import FooterData from "./FooterData";



const Analysis = () => {
    const [resultData, setResultData] = useState(["A"]);
    const result = useSelector(state => state.resultStore)
    const dispatch = useDispatch()




  return (
    <>
      <Container py={0} px={3} h={"54vh"} noContainer={true} classes={" "}>
        <div className={`h-100  w-100 d-flex flex-column gap-2`}>
          {/* 

              

           */}
           <ResultData />
          <Cocroach />
          <FooterData />

      </div>
    </Container>
    </>
  );
};

export default Analysis;
