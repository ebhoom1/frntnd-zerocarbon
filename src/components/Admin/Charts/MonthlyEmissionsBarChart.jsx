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

const COLORS = ["#A5D6A7", "#81C784","#66BB6A" ]; // Green, Orange, Blue

const MonthlyEmissionsBarChart = ({ data, companyName }) => {
  return (
    <Paper
      elevation={0}
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
        Monthly Emissions Trends
      </Typography>
      
      <Typography variant="body2" color="textSecondary" align="center">
                {companyName?`${companyName}`:"All Companies"}
              </Typography>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
          barCategoryGap="30%"
          barGap={5}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
            interval={0}
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey="scope3" stackId="a" fill={COLORS[2]} />
          <Bar dataKey="scope2" stackId="a" fill={COLORS[1]} />
          <Bar dataKey="scope1" stackId="a" fill={COLORS[0]} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default MonthlyEmissionsBarChart;
