import React from "react";
import {  Typography, Box } from "@mui/material";
import { green } from "@mui/material/colors";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const PieChartSec = () => {
    const sampleData = {
       
        pieChartData: [
          { name: "Diversity", value: 45 },
          { name: "Inclusion", value: 55 },
        ],
      };
  return (
    <Box sx={{ width: "100%", textAlign: "left" }}>
      <Typography variant="h6" color="green" gutterBottom>
        Social Impact:Diversity & Inclusion 
      </Typography>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={sampleData.pieChartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
          >
            {sampleData.pieChartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === 0 ? green[300] : green[700]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PieChartSec;
