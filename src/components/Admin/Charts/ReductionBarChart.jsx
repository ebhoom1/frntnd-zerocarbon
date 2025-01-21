import React from "react";
import { Paper, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import monthlyReductionData from './MonthlyReductionData.json'

const COLORS = ["#66BB6A", "#81C784", "#A5D6A7"];


const ReductionBarChart = ({ companyName }) => {
  return (
    <Paper
    
      sx={{
        borderRadius: 2,
        padding: 3,
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        width: "100%",
      }}
    >
      <Typography
        variant="h7"
        fontWeight="bold"
        sx={{  textAlign: "center" }}
      >
        Monthly Reduction 
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
                {companyName?`${companyName}`:"All Companies"}
              </Typography>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={monthlyReductionData[companyName]}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          barGap={15} // Gap between bar groups
          barCategoryGap={30} // Gap between bar categories
          barSize={8} // Sets the width of each bar
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "#555",
              color: "#fff",
              borderRadius: 10,
              padding: "10px",
            }}
          />
          <Bar dataKey="scope1" fill={COLORS[0]} radius={[10, 10, 0, 0]} />
          <Bar dataKey="scope2" fill={COLORS[1]} radius={[10, 10, 0, 0]} />
          <Bar dataKey="scope3" fill={COLORS[2]} radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default ReductionBarChart;
