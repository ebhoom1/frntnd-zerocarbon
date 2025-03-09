import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Typography, Box } from "@mui/material";

const CarbonLineChart = () => {
  const carbonData = [
    { month: "Jan", emissions: 400 },
    { month: "Feb", emissions: 350 },
    { month: "Mar", emissions: 300 },
    { month: "Apr", emissions: 280 },
    { month: "May", emissions: 320 },
    { month: "Jun", emissions: 340 },
  ];

  return (
    <Box sx={{ width: "100%", textAlign: "left" }}>
      <Typography variant="h6" color="green" gutterBottom>
        Carbon Emissions Over Time
      </Typography>

      <LineChart
        width={500}
        height={250}
        xAxis={[{ scaleType: "band", data: carbonData.map((d) => d.month) }]}
        series={[{ data: carbonData.map((d) => d.emissions), color: "green" }]}
      />
    </Box>
  );
};

export default CarbonLineChart;
