import React, { useState,useEffect  } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { reqAllGender } from "../../api";
import {error} from "../../utils/message"

//determining color for pie chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
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
export default function PortraitGenderChartAll({show}) {

  const[genderData,setGenderData] = useState([{
    gender:"",
    groupNumber:0
  },{
    gender:"",
    groupNumber:0   
  }]);

  useEffect(() => {
      handleAllGenderNumber();
  },[])

  const handleAllGenderNumber=async()=>{
    const response = await reqAllGender();
    if(response.code === 200){
      const tempSec = [{
        gender:"Male",
        genderNumber:response.data[0]
      },{
        gender:"Female",
        genderNumber:response.data[1]
      }
    ]
      setGenderData(tempSec);
    }
    else{
      error(response.msg)
    }
  }
  return (
    <div style={{ display: show }}>
    <h2>Blue one is Male, Green one is Female</h2>
    <h3>All visitors included</h3>
    <PieChart 
    style={{
      paddingTop: "12px",
      paddingLeft: "120px"
    }}
    width={600} height={400}
    >
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
      <Tooltip/>
    </PieChart>
    </div>
  );
}
