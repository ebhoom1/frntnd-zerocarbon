// import React, { useState } from "react";
// import { Box, Grid, Paper, Typography } from "@mui/material";
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
// import MonthlyEmissionsBarChart from "./MonthlyEmissionsBarChart";
// import companyEmissionsData from "./CompanyEmissionDta.json";

// // Colors for charts
// const COMPANY_COLORS = ["#66BB6A", "#81C784", "#A5D6A7"];
// const SCOPE_COLORS = ["#66BB6A", "#81C784", "#A5D6A7"];

// // Data for the Company Pie Chart
// const companyData = [
//   { name: "Company A", value: 200, color: COMPANY_COLORS[0] },
//   { name: "Company B", value: 300, color: COMPANY_COLORS[1] },
//   { name: "Company C", value: 100, color: COMPANY_COLORS[2] },
// ];

// // Scope data based on the company selected
// const scopeData = {
//   "Company A": [
//     { name: "Scope 1", value: 100, color: SCOPE_COLORS[0] },
//     { name: "Scope 2", value: 70, color: SCOPE_COLORS[1] },
//     { name: "Scope 3", value: 30, color: SCOPE_COLORS[2] },
//   ],
//   "Company B": [
//     { name: "Scope 1", value: 200, color: SCOPE_COLORS[0] },
//     { name: "Scope 2", value: 100, color: SCOPE_COLORS[1] },
//     { name: "Scope 3", value: 50, color: SCOPE_COLORS[2] },
//   ],
//   "Company C": [
//     { name: "Scope 1", value: 50, color: SCOPE_COLORS[0] },
//     { name: "Scope 2", value: 30, color: SCOPE_COLORS[1] },
//     { name: "Scope 3", value: 20, color: SCOPE_COLORS[2] },
//   ],
// };



// const PieChartScopeCompany = () => {
//   const [selectedCompany, setSelectedCompany] = useState(null);

//   // Dynamically update scope chart data based on the selected company
//   const scopeChartData =
//     selectedCompany && scopeData[selectedCompany]
//       ? scopeData[selectedCompany]
//       : Object.keys(scopeData).flatMap((key) => scopeData[key]);


//   return (
//     <Box
//       sx={{
//         backgroundColor: "#f4f6f9",
//         display: "flex",
//         justifyContent: "center",
//       }}
//     >
//       <Grid container>
//         {/* Pie Charts and Bar Chart in the Same Row */}
//         <Grid container spacing={1.5}  alignItems="stretch">
//           {/* Company Pie Chart */}
//           <Grid item xs={12} md={3} >
//             <Paper
//               elevation={3}
//               sx={{
//                 borderRadius: 2,
//                 padding: 2,
//                 backgroundColor: "#fff",
//                 height: 350,
//                 boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
//               }}
//             >
//               <Typography variant="h6" fontWeight="bold" align="center">
//                 Companies
//               </Typography>
//               <Typography variant="body2" color="textSecondary" align="center">
//                 Click a company to view its scope details
//               </Typography>
//               <ResponsiveContainer width="100%" height={200}>
//                 <PieChart>
//                   <Pie
//                     data={companyData}
//                     dataKey="value"
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={40}
//                     outerRadius={70}
//                     paddingAngle={5}
//                     onClick={(entry) => setSelectedCompany(entry.name)}
//                   >
//                     {companyData.map((entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={entry.color}
//                         stroke="#fff"
//                         strokeWidth={2}
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "black",
//                       borderRadius: 8,
//                       padding: "5px 10px",
//                       fontSize: "12px",
//                       boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
//                     }}
//                     itemStyle={{ color: "white", fontWeight: "bold" }}
//                     formatter={(value, name) => [`${value}`, `${name}`]}
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//               {/* <Box>
//                 {COMPANY_LEGEND.map((item, index) => (
//                   <Box
//                     key={index}
//                     sx={{ display: "flex", alignItems: "center" }}
//                   >
//                     <Box
//                       sx={{
//                         width: 12,
//                         height: 12,
//                         backgroundColor: item.color,
//                         borderRadius: "50%",
//                         mr: 1,
//                       }}
//                     ></Box>
//                     <Typography variant="body2">{item.label}</Typography>
//                   </Box>
//                 ))}
//               </Box> */}
//             </Paper>
//           </Grid>

//           {/* Scope Pie Chart */}
//           <Grid item xs={12} md={3} >
//             <Paper
//               elevation={3}
//               sx={{
//                 borderRadius: 2,
//                 padding: 2,
//                 backgroundColor: "#fff",
//                 height: 350,
//                 width:"100%",
//                 boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                
//               }}
//             >
//               <Typography variant="h6" fontWeight="bold" align="center">
//                 Scopes
//               </Typography>
//               <Typography variant="body2" color="textSecondary" align="center">
//                 Emission details for {selectedCompany || "All Companies"}
//               </Typography>
//               <Box sx={{ position: "relative", marginTop: "10px" }}>
//                 <ResponsiveContainer width="100%" height={210}>
//                   <PieChart width={400} height={400}>
//                     {/* Loop through first three layers of `scopeChartData` */}
//                     {scopeChartData.slice(0, 3).map((data, index) => (
//                       <Pie
//                         key={index}
//                         data={[data]}
//                         dataKey="value"
//                         cx="50%"
//                         cy="50%"
//                         innerRadius={36 + index * 16} // Adjust inner radius
//                         outerRadius={48 + index * 16} // Adjust outer radius
//                         startAngle={85}
//                         endAngle={350}
//                         cornerRadius={5}
//                         onMouseEnter={(e) => {
//                           if (e) {
//                             const { name, value } = e.payload;
//                             // Show tooltip logic here
//                             console.log(
//                               `Hovered on ${name} with value ${value}`
//                             );
//                           }
//                         }}
//                         onMouseLeave={() => {
//                           // Hide tooltip logic here
//                           console.log("Mouse left");
//                         }}
//                       >
//                         <Cell fill={data.color} />
//                       </Pie>
//                     ))}
//                     <Tooltip
//                       contentStyle={{
//                         backgroundColor: "black",
//                         borderRadius: 8,
//                         padding: "5px 10px",
//                         fontSize: "12px",
//                         boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
//                       }}
//                       itemStyle={{ color: "white", fontWeight: "bold" }}
//                       formatter={(value, name) => [`${value}`, `${name}`]}
//                     />
//                   </PieChart>
//                 </ResponsiveContainer>
//                 {/* Total Emissions - Positioned outside the chart */}
//                 <Box
//                   sx={{
//                     position: "absolute",
//                     top: "25%", // Adjust based on placement
//                     left: "68%", // Adjust to align between start and end angle
//                     transform: "translate(-50%, -50%)", // Center align
//                     textAlign: "center",
//                   }}
//                 >
//                   <Typography variant="h5" fontWeight="bold">
//                     {scopeChartData
//                       .slice(0, 3)
//                       .reduce((acc, curr) => acc + curr.value, 0)}
//                   </Typography>
//                   <Typography variant="caption" color="textSecondary">
//                     Total Emissions
//                   </Typography>
//                 </Box>
//               </Box>
//             </Paper>
//           </Grid>

//           {/* Monthly Emissions Bar Chart */}
//           <Grid item xs={12} md={6} >
//             <MonthlyEmissionsBarChart
//               data={companyEmissionsData[selectedCompany || "All Companies"]}
//               companyName={selectedCompany || "All Companies"}
//             />
//           </Grid>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default PieChartScopeCompany;


import React, { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import MonthlyEmissionsBarChart from "./MonthlyEmissionsBarChart";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyScopeEmissions } from "../../../redux/features/dashboard/adminDashboardSlice";

// Colors
const COMPANY_COLORS = ["#66BB6A", "#81C784", "#A5D6A7", "#FFCC80", "#90CAF9"];
const SCOPE_COLORS = ["#66BB6A", "#81C784", "#A5D6A7"];

const PieChartScopeCompany = () => {
  const dispatch = useDispatch();
  const { data: companyScopeData = {}, loading, error } = useSelector((state) => state.companyScope);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    dispatch(fetchCompanyScopeEmissions());
  }, [dispatch]);
  
  // Set default selectedCompany after data loads
  useEffect(() => {
    const companies = Object.keys(companyScopeData);
    if (companies.length > 0 && !selectedCompany) {
      setSelectedCompany(companies[0]); // Automatically select first company
    }
  }, [companyScopeData]);
  
  // Build company pie chart data from scopeTotals
  const companies = Object.keys(companyScopeData);
  const companyData = companies.map((name, i) => {
    const scopeTotals = companyScopeData[name]?.scopeTotals || {};
    const total = Object.values(scopeTotals).reduce((a, b) => a + b, 0);
    return {
      name,
      value: total,
      color: COMPANY_COLORS[i % COMPANY_COLORS.length],
    };
  });

  // Build scope chart based on selected company
  const scopeChartData = selectedCompany && companyScopeData[selectedCompany]
    ? Object.entries(companyScopeData[selectedCompany].scopeTotals || {}).map(([scope, value], i) => ({
        name: scope,
        value,
        color: SCOPE_COLORS[i % SCOPE_COLORS.length],
      }))
    : [];

  const selectedBarData =
    selectedCompany && companyScopeData[selectedCompany]?.monthlyByScope
      ? Object.entries(companyScopeData[selectedCompany].monthlyByScope).map(([month, values]) => ({
          month,
          ...values,
        }))
      : [];

  return (
    <Box sx={{ backgroundColor: "#f4f6f9", display: "flex", justifyContent: "center" }}>
      <Grid container>
        <Grid container spacing={1.5} alignItems="stretch">
          {/* Company Pie Chart */}
          <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ borderRadius: 2, padding: 2, backgroundColor: "#fff", height: 350 }}>
              <Typography variant="h6" fontWeight="bold" align="center">
                Companies
              </Typography>
              <Typography variant="body2" color="textSecondary" align="center">
                Click a company to view its scope details
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={companyData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    onClick={(entry) => setSelectedCompany(entry.name)}
                  >
                    {companyData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "black",
                      borderRadius: 8,
                      padding: "5px 10px",
                      fontSize: "12px",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    }}
                    itemStyle={{ color: "white", fontWeight: "bold" }}
                    formatter={(value, name) => [`${value}`, `${name}`]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Scope Pie Chart */}
          <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ borderRadius: 2, padding: 2, backgroundColor: "#fff", height: 350 }}>
              <Typography variant="h6" fontWeight="bold" align="center">
                Scopes
              </Typography>
              <Typography variant="body2" color="textSecondary" align="center">
                Emission details for {selectedCompany || "All Companies"}
              </Typography>
              <Box sx={{ position: "relative", marginTop: "10px" }}>
                <ResponsiveContainer width="100%" height={210}>
                  <PieChart>
                    {scopeChartData.map((data, index) => (
                      <Pie
                        key={index}
                        data={[data]}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={36 + index * 16}
                        outerRadius={48 + index * 16}
                        startAngle={85}
                        endAngle={350}
                        cornerRadius={5}
                      >
                        <Cell fill={data.color} />
                      </Pie>
                    ))}
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "black",
                        borderRadius: 8,
                        padding: "5px 10px",
                        fontSize: "12px",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                      }}
                      itemStyle={{ color: "white", fontWeight: "bold" }}
                      formatter={(value, name) => [`${value}`, `${name}`]}
                    />
                  </PieChart>
                </ResponsiveContainer>

                {/* Total Emissions Text */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "25%",
                    left: "73%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{fontSize:"14px"}} fontWeight="bold">
                    {scopeChartData.reduce((acc, curr) => acc + curr.value, 0).toFixed(2)}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Total Emissions
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Bar Chart */}
          <Grid item xs={12} md={6}>
            <MonthlyEmissionsBarChart
              data={selectedBarData}
              companyName={selectedCompany || "All Companies"}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PieChartScopeCompany;
