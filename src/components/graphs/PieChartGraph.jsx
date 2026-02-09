import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import { useDispatch, useSelector } from "react-redux";
import LiquidGlass from "liquid-glass-react";
import { deleteStates, setStates } from "../../redux/actions/cardAction";
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
  "#495057", // Dark Gray
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  value,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  if (value === 0 || percent === 0) {
    return null;
  }

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize="12px"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieChartGraph = () => {
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

  const [data, setData] = useState([
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
  ]);

  const result = useSelector((state) => state.resultStore);
  const databaseData = useSelector((state) => state.databaseStore);

  useEffect(() => {
    console.log("databaseData", databaseData);

    let tempState = tempCardState.map((item) => ({ ...item }));
    if (databaseData.length <= 0) {
      for (let i in tempState) {
        tempState[i].totalWin = 0;
        tempState[i].totalWin = 0;
      }

      return;
    }

    for (let i in databaseData) {
      if (databaseData[i].jokerCard && databaseData[i].winner == "A") {
        tempState[databaseData[i]?.jokerValue].totalWin =
          tempState[databaseData[i]?.jokerValue].totalWin + 1;
      }

      if (databaseData[i].jokerCard && databaseData[i].winner == "B") {
        tempState[databaseData[i]?.jokerValue].totalWin =
          tempState[databaseData[i]?.jokerValue].totalWin + 1;
      }
    }
    tempState = tempState.slice(1, 13);
    console.log("pieData: ", tempState);

    setData(tempState);

    // console.log("tempState: ",tempState)
  }, [databaseData]);

  return (
    <div className={`${s.main}`} style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="totalWin"
            nameKey="name"
            innerRadius={55}
            outerRadius={110}
            cx="50%"
            cy="50%"
            fill="#8884d8"
            stroke={false}
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartGraph;
