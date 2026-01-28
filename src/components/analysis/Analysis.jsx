import React, { useEffect, useState } from "react";
import ResultData from "./ResultData";
import Result from "../Result";
import Cocroach from "./Cocroach";
import Container from "../layout/Container";
import { useDispatch, useSelector } from "react-redux";
import FooterData from "./FooterData";
import CardTable from "./CardTable";

const Analysis = () => {
  const [resultData, setResultData] = useState(["A"]);
  const result = useSelector((state) => state.resultStore);
  const dispatch = useDispatch();

  return (
    <>
      <Container py={0} px={3} h={"57vh"} noContainer={true} classes={" "}>
        <div className={`h-100 border  w-100 d-flex flex-column gap-2`}>
          {/* 

              

           */}
          <ResultData />
          <div className={`d-flex   gap-1`}>
            <div className="border ">
              <Cocroach />
            </div>
            <div className="w-100 d-flex flex-column gap-1">
              <CardTable />

              <FooterData />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Analysis;
