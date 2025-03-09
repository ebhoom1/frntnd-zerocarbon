// import React from 'react';
// import { BarChart } from '@mui/x-charts/BarChart';
// import { Typography, Box } from "@mui/material";

// const MonthlyConsumptionBarChart = () => {
//   // Monthly Consumption Data
//   const monthlyData = [
//     { month: "Jan", energy: 500, water: 300 },
//     { month: "Feb", energy: 480, water: 290 },
//     { month: "Mar", energy: 520, water: 310 },
//     { month: "Apr", energy: 510, water: 305 },
//     { month: "May", energy: 530, water: 320 },
//     { month: "Jun", energy: 550, water: 330 },
//     { month: "Jul", energy: 570, water: 340 },
//     { month: "Aug", energy: 560, water: 335 },
//     { month: "Sep", energy: 540, water: 325 },
//     { month: "Oct", energy: 530, water: 315 },
//     { month: "Nov", energy: 520, water: 310 },
//     { month: "Dec", energy: 510, water: 300 },
//   ];

//   return (
//     <Box sx={{ width: "100%", textAlign: "left" }}>
//     <Typography variant="h6" color="green" gutterBottom>
//       Carbon Emissions Over Time
//     </Typography>
//       <BarChart

//         xAxis={[{ scaleType: 'band', data: monthlyData.map((item) => item.month) }]}
//         series={[
//           { data: monthlyData.map((item) => item.energy), label: "Energy Consumption", color: "green" },
//           { data: monthlyData.map((item) => item.water), label: "Water Consumption", color: "blue" }
//         ]}
//         width={480}
//         height={250}
//       />
//   </Box>
//   );
// };

// export default MonthlyConsumptionBarChart;


import React from "react";
import { BarChart, Bar, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Typography, Box } from "@mui/material";

const chartData = [
  { month: "January", energy: 186, water: 80 },
  { month: "February", energy: 305, water: 200 },
  { month: "March", energy: 237, water: 120 },
  { month: "April", energy: 73, water: 190 },
  { month: "May", energy: 209, water: 130 },
  { month: "June", energy: 214, water: 140 },
];

const BarChartComponent = () => {
  return (
    <Box sx={{ width: "100%", textAlign: "left", }}>
      <Typography variant="h6" color="green" gutterBottom>
      Monthly Energy & Water Consumption
      </Typography>
        <ResponsiveContainer width="100%" height={250} padding="10px">
          <BarChart data={chartData} >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <Tooltip />
            <Bar dataKey="energy" fill="#125427" radius={4} />
            <Bar dataKey="water" fill="#16a34a" radius={4} />
          </BarChart>
        </ResponsiveContainer>
    </Box>
  );
};

export default BarChartComponent;
