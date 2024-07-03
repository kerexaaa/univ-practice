import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from './Chart.module.css'

const LiveChart = ({ data }) => {
  const initialYDomain = [-75, 75];

  return (
    <ResponsiveContainer width={"100%"} height={700}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="phi1"></XAxis>
        <YAxis dataKey="phi2" domain={initialYDomain}></YAxis>
        <Tooltip content={formatTooltip}/>
        <Legend />
        <Line type="monotone" dataKey="phi2" stroke="#8884d8" dot={false} />
        <Line type="monotone" dataKey="u" stroke="#971653" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

const formatTooltip = ({active, payload, label}) => {
  if (active && payload && payload.length) {
    return( 
      <div className={styles.tooltip}>
        <p>&phi; <sub>1</sub> {label}</p>
        <p style={{color: "#8884d8"}}>&phi; <sub>2</sub> {payload[0].value}</p>
        <p style={{color: "#971653"}}>u {payload[1].value}</p>
      </div>
    )
  }
};

export default LiveChart;
