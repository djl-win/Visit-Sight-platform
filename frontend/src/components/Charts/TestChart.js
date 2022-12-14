/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */

import React, { PureComponent } from 'react';
import Stack from '@mui/material/Stack';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList
} from "recharts";

class CustomizedLabel extends PureComponent {

  render() {
    const { x, y, value } = this.props;

    return (
      <text x={x} y={y} dy={-4} fill="BLACK" fontSize={15} textAnchor="middle" >
        {value}
      </text>
    );
  }
}

class CustomizedAxisTick extends PureComponent {
  render() {
    const { x, y, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fontSize={15} fill="BLACK" transform="rotate(-15)">
          {payload.value}
        </text>
      </g>
    );
  }
}

const TestChart = ({ show,chartData }) => {
    return (
      <Stack
        spacing={-3}
      >
        <div style={{
          display: show ,
          fontFamily: 'Inter',
          fontStyle: 'italic',
          fontWeight: '400',
          fontSize: '28px',
          lineHeight: '34px',
          color: '#000000',
          marginRight: "200px"
        }}>Seven Days Visitors</div>
        <div>
          <LineChart
            style={{ display: show }}
            width={800}
            height={550}
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis stroke='BLACK' dataKey="date" height={60} tick={<CustomizedAxisTick />} />
            <YAxis stroke='BLACK' />
            <Tooltip />

            <Legend />
            <Line type="monotone" dataKey="visitorNumber" stroke="#8884d8" activeDot={{ r: 8 }}>
              <LabelList content={<CustomizedLabel />} />
            </Line>
          </LineChart>
        </div>
      </Stack>
    );
}
export default TestChart;