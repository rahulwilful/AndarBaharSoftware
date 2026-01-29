import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useSelector } from "react-redux";
import s from "./Doughnut.module.css";

const COLORS = [
  "#198754", // Green
  "#dc3545", // Red
  "#FFBB28", // Yellow
  "#0d6efd", // Blue
  "#6f42c1", // Purple
  "#fd7e14", // Orange
  "#20c997", // Teal
  "#d63384", // Pink
  "#6c757d", // Gray
  "#17a2b8", // Cyan
  "#28a745", // Lighter Green
  "#c92a2a", // Dark Red
  "#ffc107", // Amber
  "#495057"  // Dark Gray
];

const BarGraphComponent = () => {
  const tempCardState = [
    { name: "0", value: 0, andarWins: 0, baharWins: 0, totalWin: 0 },
    { name: "A", value: 1, andarWins: 0, baharWins: 0, totalWin: 0 },
    { name: "2", value: 2, andarWins: 0, baharWins: 0, totalWin: 0 },
    { name: "3", value: 3, andarWins: 0, baharWins: 0, totalWin: 0 },
    { name: "4", value: 4, andarWins: 0, baharWins: 0, totalWin: 0 },
    { name: "5", value: 5, andarWins: 0, baharWins: 0, totalWin: 0 },
    { name: "6", value: 6, andarWins: 0, baharWins: 0, totalWin: 0 },
    { name: "7", value: 7, andarWins: 0, baharWins: 0, totalWin: 0 },
    { name: "8", value: 8, andarWins: 0, baharWins: 0, totalWin: 0 },
    { name: "9", value: 9, andarWins: 0, baharWins: 0, totalWin: 0 },
    { name: "10", value: 10, andarWins: 0, baharWins: 0, totalWin: 0 },
    { name: "J", value: 11, andarWins: 0, baharWins: 0, totalWin: 0 },
    { name: "Q", value: 12, andarWins: 0, baharWins: 0, totalWin: 0 },
    { name: "K", value: 13, andarWins: 0, baharWins: 0, totalWin: 0 },
  ];

  const [data, setData] = useState(tempCardState);
  const databaseData = useSelector((state) => state.databaseStore);

  useEffect(() => {
    let tempState = tempCardState.map((item) => ({ ...item }));
    if (databaseData.length <= 0) {
      for (let i in tempState) {
        tempState[i].totalWin = 0;
      }
      return;
    }

    for (let i in databaseData) {
      if (databaseData[i].jokerCard && databaseData[i].winner === "A") {
        tempState[databaseData[i]?.jokerValue].totalWin += 1;
      }
      if (databaseData[i].jokerCard && databaseData[i].winner === "B") {
        tempState[databaseData[i]?.jokerValue].totalWin += 1;
      }
    }
    tempState = tempState.slice(1, 14);
    setData(tempState);
  }, [databaseData]);

  return (
    <div className={`${s.main}`} style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis
          tick={{ fontSize: 17, fill: "white" }}
          dataKey="name" />
          <YAxis
          tick={{ fontSize: 17, fill: "white" }}
          />
          <Tooltip />
          <Bar
           radius={[7, 7, 7, 7]}
          barSize={12}
          dataKey="totalWin" name="">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarGraphComponent;
