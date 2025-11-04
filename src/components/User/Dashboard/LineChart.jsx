


// import React, { useEffect, useState } from "react";
// import { LineChart } from "@mui/x-charts/LineChart";
// import {
//   Typography,
//   Box,
//   IconButton,
//   MenuItem,
//   Select,
//   FormControl,
//   Tooltip,
// } from "@mui/material";
// import { ArrowForward, ArrowBack } from "@mui/icons-material";
// import axios from "../../../api/axios";

// // All months
// const monthLabels = [
//   "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
// ];

// // Format Y-axis values smartly
// const formatYAxisValue = (value) => {
//   if (value >= 10000000) {
//     return `${(value / 10000000).toFixed(2)} Cr`;
//   } else if (value >= 100000) {
//     return `${(value / 100000).toFixed(2)} L`;
//   } else {
//     return value.toLocaleString("en-IN"); // Indian number format
//   }
// };

// const CarbonLineChart = ({ userId }) => {
//   const [carbonDataByYear, setCarbonDataByYear] = useState({});
//   const [selectedYear, setSelectedYear] = useState("");
//   const [showNext, setShowNext] = useState(false);

//   useEffect(() => {
//     const fetchCarbonData = async () => {
//       try {
//         const res = await axios.get(`/api/monthly-emissions/${userId}`);
//         const yearData = res.data.data || {};
//         setCarbonDataByYear(yearData);
// // console.log(yearData);
//         const years = Object.keys(yearData).sort();
//         if (years.length > 0) {
//           setSelectedYear(years[years.length - 1]);
//         }
//       } catch (err) {
//         console.error("Error fetching carbon emissions:", err);
//       }
//     };

//     fetchCarbonData();
//   }, [userId]);

//   const currentYearData = carbonDataByYear[selectedYear] || [];

//   // Map from "Mar-2025" -> Mar: emissions
//   const emissionsMap = Object.fromEntries(
//     currentYearData.map((entry) => {
//       const [month] = entry.month.split("-");
//       return [month, entry.emissions];
//     })
//   );

//   // Final 12-month dataset with zeros if data missing
//   const completeYearData = monthLabels.map((month) => ({
//     month,
//     emissions: emissionsMap[month] || 0,
//   }));

//   // console.log("Complete Year Data:", completeYearData);


//   const visibleData = showNext
//     ? completeYearData.slice(6)
//     : completeYearData.slice(0, 6);

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         textAlign: "center",
//         position: "relative",
        
//       }}
//     >
//       {/* Title + Year Selector */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           px: 2,
//           mb: 1,
//         }}
//       >
//         <Typography variant="h6" color="green">
//           Carbon Emissions Over Time
//         </Typography>

//         <FormControl size="small">
//           <Select
//             value={selectedYear}
//             onChange={(e) => setSelectedYear(e.target.value)}
//             displayEmpty
//             sx={{ bgcolor: "white", borderRadius: 1 }}
//           >
//             {Object.keys(carbonDataByYear)
//               .sort()
//               .map((year) => (
//                 <MenuItem key={year} value={year}>
//                   {year}
//                 </MenuItem>
//               ))}
//           </Select>
//         </FormControl>
//       </Box>

//       {/* Line Chart */}
//       <LineChart
//         width={500} 
//         height={250}
//         xAxis={[{ scaleType: "band", data: visibleData.map((d) => d.month) }]}
//         yAxis={[{
//           valueFormatter: formatYAxisValue,
//         }]}
//         series={[
//           {
//             data: visibleData.map((d) => d.emissions),
//             color: "green",
//             // valueFormatter: (v) => `${v.toLocaleString("en-IN")} kg CO₂e`
//             valueFormatter: (v) =>
//   typeof v === "number" && !isNaN(v)
//     ? `${v.toLocaleString("en-IN")} kg CO₂e`
//     : "0 kg CO₂e"

//           },
//         ]}
//       />

//       {/* Arrows */}
//       <IconButton
//         sx={{ position: "absolute", left: 10, top: "50%" }}
//         onClick={() => setShowNext(false)}
//         disabled={!showNext}
//       >
//         <ArrowBack />
//       </IconButton>

//       <IconButton
//         sx={{ position: "absolute", right: 10, top: "50%" }}
//         onClick={() => setShowNext(true)}
//         disabled={showNext}
//       >
//         <ArrowForward />
//       </IconButton>
//     </Box>
//   );
// };

// export default CarbonLineChart;

import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import {
  Typography,
  Box,
  IconButton,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import { ArrowForward, ArrowBack } from "@mui/icons-material";
import axios from "../../../api/axios";

// All months
const monthLabels = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

// Format Y-axis values smartly
const formatYAxisValue = (value) => {
  if (value >= 10000000) return `${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `${(value / 100000).toFixed(2)} L`;
  return value.toLocaleString("en-IN");
};

const CarbonLineChart = ({ userId }) => {
  const [carbonDataByYear, setCarbonDataByYear] = useState({});
  const [selectedYear, setSelectedYear] = useState("");

  // 🔹 Default to the half that contains *today's* month (Jul–Dec => right half)
  const [showNext, setShowNext] = useState(() => new Date().getMonth() >= 6);

  useEffect(() => {
    const fetchCarbonData = async () => {
      try {
        const res = await axios.get(`/api/monthly-emissions/${userId}`);
        const yearData = res?.data?.data || {};
        setCarbonDataByYear(yearData);

        const years = Object.keys(yearData).sort();
        if (years.length > 0) {
          const currentYear = String(new Date().getFullYear());
          const hasCurrentYear = years.includes(currentYear);

          // 🔹 Prefer current year if present; else fall back to latest
          setSelectedYear(hasCurrentYear ? currentYear : years[years.length - 1]);

          // 🔹 Only force the half based on *today* when showing the current year
          if (hasCurrentYear) {
            setShowNext(new Date().getMonth() >= 6);
          }
        }
      } catch (err) {
        console.error("Error fetching carbon emissions:", err);
      }
    };

    fetchCarbonData();
  }, [userId]);

  const currentYearData = carbonDataByYear[selectedYear] || [];

  // Map from "Mar-2025" -> Mar: emissions
  const emissionsMap = Object.fromEntries(
    currentYearData.map((entry) => {
      const [month] = String(entry.month || "").split("-");
      return [month, entry.emissions];
    })
  );

  // Final 12-month dataset with zeros if data missing
  const completeYearData = monthLabels.map((month) => ({
    month,
    emissions: emissionsMap[month] || 0,
  }));

  const visibleData = showNext
    ? completeYearData.slice(6)
    : completeYearData.slice(0, 6);

  return (
    <Box sx={{ width: "100%", textAlign: "center", position: "relative" }}>
      {/* Title + Year Selector */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          mb: 1,
        }}
      >
        <Typography variant="h6" color="green">
          Carbon Emissions Over Time
        </Typography>

        <FormControl size="small">
          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            displayEmpty
            sx={{ bgcolor: "white", borderRadius: 1, minWidth: 100 }}
          >
            {Object.keys(carbonDataByYear).sort().map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Line Chart */}
      <LineChart
        width={500}
        height={250}
        xAxis={[{ scaleType: "band", data: visibleData.map((d) => d.month) }]}
        yAxis={[{ valueFormatter: formatYAxisValue }]}
        series={[
          {
            data: visibleData.map((d) => d.emissions),
            color: "green",
            valueFormatter: (v) =>
              typeof v === "number" && !isNaN(v)
                ? `${v.toLocaleString("en-IN")} kg CO₂e`
                : "0 kg CO₂e",
          },
        ]}
      />

      {/* Arrows */}
      <IconButton
        sx={{ position: "absolute", left: 10, top: "50%" }}
        onClick={() => setShowNext(false)}
        disabled={!showNext}
      >
        <ArrowBack />
      </IconButton>

      <IconButton
        sx={{ position: "absolute", right: 10, top: "50%" }}
        onClick={() => setShowNext(true)}
        disabled={showNext}
      >
        <ArrowForward />
      </IconButton>
    </Box>
  );
};

export default CarbonLineChart;
