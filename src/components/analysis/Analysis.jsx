import React, { useEffect, useState } from "react";
import ResultData from "./ResultData";
import Result from "../Result";
import Cocroach from "./Cocroach";
import Container from "../layout/Container";
import { useDispatch, useSelector } from "react-redux";
import FooterData from "./FooterData";
import CardTable from "./CardTable";
import Graphs from "./Graphs";
import Doughnut from "../graphs/Doughnut";
import PieChart from "../graphs/PieChartGraph";
import PieChartGraph from "../graphs/PieChartGraph";
import BarGraphComponent from "../graphs/BarGraphComponent";

const Analysis = () => {
  const [resultData, setResultData] = useState(["A"]);
  const result = useSelector((state) => state.resultStore);
  const dispatch = useDispatch();

  return (
    <>
      <Container py={0} px={3} h={"57vh"} noContainer={true} classes={" "}>
        <div className={`h-100   w-100 d-flex flex-column gap-2`}>
          <ResultData />
          <div className={`d-flex   gap-1`}>
            <div className="d-flex flex-column gap-2 ">
              <Cocroach />
              <div className="d-flex gap-1">
                <div className="" style={{ width: "40%" }}>
                  <Doughnut />
                </div>
                <div className="" style={{ width: "60%" }}>
                  <BarGraphComponent />
                </div>
              </div>
            </div>
            <div className="w-100 d-flex flex-column justify-content-between">
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
