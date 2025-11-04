// import React from "react";
// import { BarChart, Bar, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from "recharts";
// import { Typography, Box } from "@mui/material";

// const chartData = [
//   { month: "January", energy: 186, water: 80 },
//   { month: "February", energy: 305, water: 200 },
//   { month: "March", energy: 237, water: 120 },
//   { month: "April", energy: 73, water: 190 },
//   { month: "May", energy: 209, water: 130 },
//   { month: "June", energy: 214, water: 140 },
// ];

// const BarChartComponent = () => {
//   return (
//     <Box sx={{ width: "100%", textAlign: "left", }}>
//       <Typography variant="h6" color="green" gutterBottom>
//       Monthly Energy & Water Consumption
//       </Typography>
//         <ResponsiveContainer width="100%" height={250} padding="10px">
//           <BarChart data={chartData} >
//             <CartesianGrid vertical={false} strokeDasharray="3 3" />
//             <XAxis
//               dataKey="month"
//               tickLine={false}
//               tickMargin={10}
//               axisLine={false}
//               tickFormatter={(value) => value.slice(0, 3)}
//             />
//             <Tooltip />
//             <Bar dataKey="energy" fill="#125427" radius={4} />
//             <Bar dataKey="water" fill="#16a34a" radius={4} />
//           </BarChart>
//         </ResponsiveContainer>
//     </Box>
//   );
// };

// export default BarChartComponent;


import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import {
  Typography,
  Box,
  IconButton,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import axios from "../../../api/axios";

// Full list of month abbreviations
const monthLabels = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const BarChartComponent = ({ userId }) => {
  const [dataByYear, setDataByYear] = useState({});
  const [selectedYear, setSelectedYear] = useState("");
  // const [showNext, setShowNext] = useState(false);
  const [showNext, setShowNext] = useState(new Date().getMonth() >= 6);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/monthly-energy-water/${userId}`);
        console.log("barchart response user:",res)
        const yearData = res.data.data || {};
        setDataByYear(yearData);
console.log(yearData);
        const years = Object.keys(yearData).sort();
        // if (years.length > 0) {
        //   setSelectedYear(years[years.length - 1]);
        // }
        const currentYear = String(new Date().getFullYear());
if (years.length > 0) {
  setSelectedYear(years.includes(currentYear) ? currentYear : years[years.length - 1]);
}
      } catch (err) {
        console.error("Error fetching chart data:", err);
      }
    };

    fetchData();
  }, [userId]);

  const currentYearData = dataByYear[selectedYear] || [];

  const dataMap = Object.fromEntries(
    currentYearData.map((entry) => {
      const [month] = entry.month.split("-");
      return [month, { energy: entry.energy, water: entry.water }];
    })
  );

  const fullData = monthLabels.map((month) => ({
    month,
    energy: dataMap[month]?.energy || 0,
    water: dataMap[month]?.water || 0,
  }));

  const visibleData = showNext ? fullData.slice(6) : fullData.slice(0, 6);

  return (
    <Box sx={{ width: "100%", textAlign: "left", position: "relative" }}>
      {/* Header and Year Selector */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
        <Typography variant="h6" color="green">
          Monthly Energy & Water Consumption
        </Typography>

        <FormControl size="small">
          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            displayEmpty
            sx={{ bgcolor: "white", borderRadius: 1 }}
          >
            {Object.keys(dataByYear).sort().map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={250} padding="10px">
  <BarChart data={visibleData} >
    <CartesianGrid vertical={false} strokeDasharray="3 3" />
    
    <XAxis
      dataKey="month"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
    />
    
    {/* Hide Y-axes for cleaner UI */}
    <YAxis yAxisId="left" orientation="left" hide />
    <YAxis yAxisId="right" orientation="right" hide />
    
    <Tooltip
      formatter={(value, name) =>
        name === "energy"
          ? [`Energy:${value} kWh`]
          : [`Water:${value} L/m³`]
      }
    />

    <Bar
      yAxisId="left"
      dataKey="energy"
      fill="#125427"
      radius={4}
      name="energy"
    />
    
    <Bar
      yAxisId="right"
      dataKey="water"
      fill="#16a34a"
      radius={4}
      name="water"
    />
  </BarChart>
</ResponsiveContainer>



      {/* Arrows */}
      <IconButton
        sx={{ position: "absolute", left: 4, top: "50%" }}
        onClick={() => setShowNext(false)}
        disabled={!showNext}
      >
        <ArrowBack />
      </IconButton>

      <IconButton
        sx={{ position: "absolute", right: 4, top: "50%" }}
        onClick={() => setShowNext(true)}
        disabled={showNext}
      >
        <ArrowForward />
      </IconButton>
    </Box>
  );
};

export default BarChartComponent;
