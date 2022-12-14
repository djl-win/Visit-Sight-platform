import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { reqSevenDaysGender } from "../../api";


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function PortraitGenderChartDays({ show }) {

  const [genderData, setGenderData] = useState([{
    gender: "",
    groupNumber: 0
  }, {
    gender: "",
    groupNumber: 0
  }]);

  useEffect(() => {
    handleSevenDayGender();
  }, [])

  const handleSevenDayGender = async () => {
    const response = await reqSevenDaysGender();
    if (response.code === 200) {
      const tempSec = [{
        gender: "Male",
        genderNumber: response.data[0]
      }, {
        gender: "Female",
        genderNumber: response.data[1]
      }
      ]
      setGenderData(tempSec);
    }
  }
  return (
    <div style={{ display: show }}>
      <h2>Blue one is Male, Green one is Female</h2>
      <h4>Recent seven day of visitors included</h4>
      <PieChart 
      style={{
        paddingLeft: "120px"
      }}
      width={600} height={400}>
        <Pie
          data={genderData}
          cx={400}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={175}
          fill="#8884d8"
          dataKey="genderNumber"
        >
          {genderData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
