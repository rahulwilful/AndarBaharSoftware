import React from "react";
import ResultData from "./ResultData";
import Result from "../Result";
import Cocroach from "./Cocroach";
import Container from "../layout/Container";

const Analysis = () => {
  return (
    <>
      <Container py={0} px={3} h={"54vh"} noContainer={true} classes={" "}>
        <div className={`h-100  w-100 d-flex flex-column gap-2`}>
          <ResultData
            results={["A", "B", "A", "A", "B", "A", "B", "B", "A", "A"]}
          />
          <Cocroach />
        </div>
      </Container>
    </>
  );
};

export default Analysis;
