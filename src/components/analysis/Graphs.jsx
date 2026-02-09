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

const COLORS = ["#198754", "#dc3545", "#FFBB28"];

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

const Graphs = () => {
  const [data, setData] = useState([
    { name: "Andar", value: 400 },
    { name: "Bahar", value: 300 },
  ]);

  const result = useSelector((state) => state.resultStore);

  useEffect(() => {
    console.log("result", result);

    let tempAndarWins = 0;
    let tempBaharWins = 0;
    for (let i in result) {
      if (result[i] == "A") {
        tempAndarWins++;
      } else {
        tempBaharWins++;
      }
    }

    const tempData = [
      { name: "Andar", value: tempAndarWins },
      { name: "Bahar", value: tempBaharWins },
    ];

    setData(tempData);
  }, [result]);

  return (
    <div className="" style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={40}
            outerRadius={80}
            cx="50%"
            cy="50%"
            fill="#8884d8"
            labelLine={false}
            label={renderCustomizedLabel}
            stroke={false}
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

export default Graphs;
