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
import s from "./Doughnut.module.css"


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

const RADIAN = Math.PI / 180
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
  const radius = innerRadius + (outerRadius - innerRadius) * 0.2
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  if (value === 0 || percent === 0) {
    return null
  }

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize="12px"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const Doughnut = () => {
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
   <div className={`${s.main}`} style={{ width: "100%", height: 300 }}>
         <ResponsiveContainer>
           <PieChart>
             <Pie
               data={data}
               dataKey="value"
               nameKey="name"
                 paddingAngle={5}
                  cornerRadius="49%"
               innerRadius={75}
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

export default Doughnut;
