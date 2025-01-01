// import React, { useEffect } from "react";
// import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
// import PeopleIcon from "@mui/icons-material/People";
// import GroupsIcon from "@mui/icons-material/Groups";
// import WorkIcon from "@mui/icons-material/Work";
// import { Box, Grid, Paper, Typography, Chip, Avatar } from "@mui/material";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   ZAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   ScatterChart,
//   Scatter,
// } from "recharts";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDashboardMetrics } from "../../redux/features/dashboard/DashboardSlice";

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const { metrics, loading, error } = useSelector((state) => state.dashboard);

//   const {
//     totalSubmissions,
//     pendingActions,
//     submissionBreakdown,
//     recentActivity,
//   } = metrics;

//   //barchart
//   const processRecentActivityData = (recentActivity) => {
//     const activityCounts = recentActivity.reduce((acc, activity) => {
//       const sector = activity.industrySector;
//       acc[sector] = (acc[sector] || 0) + 1;
//       return acc;
//     }, {});

//     // Convert to chart-friendly format
//     return Object.keys(activityCounts).map((sector) => ({
//       industrySector: sector,
//       count: activityCounts[sector],
//     }));
//   };

//   const barChart = processRecentActivityData(recentActivity);

//   //piechart
//   const chartData = submissionBreakdown.map((item, index) => ({
//     name: item._id, // Name for the sector
//     value: item.count, // Count for the sector
//     color: ["#4a90e2", "#50e3c2", "#f8e71c", "#f5a623", "#d0021b", "#9013fe"][
//       index % 6
//     ],
//   }));
//   const totalCount = chartData.reduce((acc, item) => acc + item.value, 0);

//   //bubblechart
//   const bubbles = [
//     { value: 30, size: 100, color: "#81C784", x: "95%", y: "30%" }, // Light shade of Green
//     { value: 25, size: 70, color: "#4CAF50", x: "95%", y: "55%" }, // Regular Green (#4CAF50)
//     { value: 10, size: 60, color: "#388E3C", x: "60%", y: "40%" }, // Dark shade of Green
//     { value: 5, size: 40, color: "#2C6B2F", x: "55%", y: "20%" }, // Darker shade of Green
//   ];

//   const regions = [
//     { name: "United States", flag: "🇺🇸", carbon: "30 Units" },
//     { name: "Germany", flag: "🇩🇪", carbon: "25 Units" },
//     { name: "Australia", flag: "🇦🇺", carbon: "10 Units" },
//     { name: "France", flag: "🇫🇷", carbon: "5 Units" },
//   ];

//   useEffect(() => {
//     dispatch(fetchDashboardMetrics());
//     if (error && error.response) {
//       console.log(error.response.data.message);
//     } else if (error) {
//       console.log(error);
//     }
//   }, [dispatch]);

//   console.log(
//     "pendingActions:",
//     pendingActions,
//     "submissionBreakdown:",
//     submissionBreakdown,
//     "recentActivity:",
//     recentActivity
//   );
//   return (
//     <Box
//       sx={{
//         // bgcolor: "#f8f9fc",
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: "row",
//         gap: 3,
//         flexGrow: 1,
//         width: "100%",
//       }}
//     >
//       <Box
//         sx={{ display: "flex", flexDirection: "column", width: "55%", gap: 29 }}
//       >
//         <Grid
//           container
//           spacing={3}
//           sx={{
//             // flexWrap: "wrap",
//             height: 200,
//           }}
//         >
//           {[
//             {
//               title: "Total Carbon Reduction",
//               value: "$612,917",
//               change: "+2.0%",
//               color: "#4caf50",
//               icon: (
//                 <MonetizationOnIcon
//                   fontSize="large"
//                   sx={{ color: "#4caf50" }}
//                 />
//               ),
//             },
//             {
//               title: "pending Actions",
//               value: pendingActions,
//               change: "+1.8%",
//               color: "#2196f3",
//               icon: <PeopleIcon fontSize="large" sx={{ color: "#2196f3" }} />,
//             },
//             {
//               title: "Total Submissions",
//               value: totalSubmissions,
//               change: "-2.0%",
//               color: "#f44336",
//               icon: <GroupsIcon fontSize="large" sx={{ color: "#f44336" }} />,
//             },
//             {
//               title: "Renewable Projects",
//               value: "12,987",
//               change: "+2.5%",
//               color: "#9c27b0",
//               icon: <WorkIcon fontSize="large" sx={{ color: "#9c27b0" }} />,
//             },
//           ].map((stat, index) => (
//             <Grid item xs={12} sm={6} md={6} key={index}>
//               <Paper
//                 elevation={0}
//                 sx={{
//                   boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//                   p: 2,
//                   borderRadius: 5,
//                   textAlign: "center",
//                   height: 180,
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   justifyContent: "space-around",
//                 }}
//               >
//                 {/* Align icon and stat.change */}

//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     gap: 15, // Add space between icon and text
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       width: 30,
//                       height: 30,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       backgroundColor: "#f0f4f7",
//                       borderRadius: "50%",
//                     }}
//                   >
//                     {stat.icon}
//                   </Box>
//                   <Typography
//                     variant="subtitle2"
//                     sx={{
//                       color: "#7ed321",
//                       fontWeight: "bold",
//                       display: "inline-block",
//                       backgroundColor: "#e7f8e9",
//                       padding: "2px 8px",
//                       borderRadius: 10,
//                     }}
//                   >
//                     {stat.change}
//                   </Typography>
//                 </Box>
//                 <Box sx={{}}>
//                   <Typography variant="body1" fontWeight="bold">
//                     {stat.title}
//                   </Typography>
//                   <Typography variant="h5" fontWeight="bold">
//                     {stat.value}
//                   </Typography>
//                 </Box>
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>

//         {/* bar Chart */}
//         <Box
//           sx={{
//             backgroundColor: "#fff",
//             padding: 2,
//             borderRadius: 5,
//             boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//             maxWidth: 600,
//             height: 400,
//             // marginTop:15
//           }}
//         >
//           {/* Header */}
//           <Typography variant="h6" fontWeight="bold" mb={1}>
//             Recent Activity
//           </Typography>
//           <Typography variant="body2" color="textSecondary" mb={2}>
//             List of recently reviewed submissions or updated entries.{" "}
//           </Typography>

//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={barChart}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="industrySector" tick={{ fontSize: 12 }} />
//               <YAxis tickFormatter={(value) => `${value}`} />
//               <Tooltip formatter={(value) => `${value} Activities`} />
//               <Bar
//                 dataKey="count"
//                 fill="#4caf50"
//                 name="Activity Count"
//                 barSize={18}
//                 radius={[10, 10, 10, 10]}
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         </Box>
//       </Box>

//       <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
//         <Box
//           sx={{
//             flexGrow: 1,
//             backgroundColor: "#fff",
//             padding: 3,
//             borderRadius: 5,
//             boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",

//             maxWidth: 400,
//             minHeight: 580,
//           }}
//         >
//           {/* Header */}
//           <Typography variant="h6" fontWeight="bold">
//             Submission Breakdown
//           </Typography>
//           <Typography variant="body2" color="textSecondary">
//             Track submissions by industry sector
//           </Typography>

//           {/* Multi-layered 3/4 Pie Chart */}
//           <Box sx={{ position: "relative", height: 300 }}>
//             <ResponsiveContainer>
//               <PieChart width={400} height={400}>
//                 {/* Loop through `chartData` for each Pie layer */}
//                 {chartData.map((data, index) => (
//                   <Pie
//                     key={index}
//                     data={[data]}
//                     dataKey="value"
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={46 + index * 16} // Adjust inner radius
//                     outerRadius={58 + index * 16} // Adjust outer radius
//                     startAngle={85}
//                     endAngle={350}
//                     cornerRadius={5}
//                   >
//                     <Cell fill={data.color} />
//                   </Pie>
//                 ))}
//               </PieChart>
//               ;
//             </ResponsiveContainer>

//             {/* Total Sales - Positioned outside the chart */}
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: "25%", // Adjust based on placement
//                 left: "68%", // Adjust to align between start and end angle
//                 transform: "translate(-50%, -50%)", // Center align
//                 textAlign: "center",
//               }}
//             >
//               <Typography variant="h5" fontWeight="bold">
//                 9,829
//               </Typography>
//               <Typography variant="caption" color="textSecondary">
//                 Products Sales
//               </Typography>
//               <Typography
//                 variant="subtitle2"
//                 sx={{
//                   color: "#7ed321",
//                   fontWeight: "bold",
//                   mt: 0.5,
//                   display: "inline-block",
//                   backgroundColor: "#e7f8e9",
//                   padding: "2px 8px",
//                   borderRadius: 10,
//                 }}
//               >
//                 +5.34%
//               </Typography>
//             </Box>
//           </Box>

//           {/* Legend */}
//           <Grid container spacing={0} mt={2}>
//             {chartData.map((item, index) => (
//               <Grid item xs={12} key={index} display="flex" alignItems="center">
//                 <Box
//                   sx={{
//                     width: 12,
//                     height: 12,
//                     backgroundColor: item.color,
//                     borderRadius: "50%",
//                     mr: 1,
//                   }}
//                 />
//                 <Typography variant="body2" flex={1}>
//                   {item.name}
//                 </Typography>
//                 <Typography variant="body2" fontWeight="bold" mr={1}>
//                   {item.value}
//                 </Typography>
//                 <Chip
//                   // label={`${item.value}%`}
//                   label={`${((item.value / totalCount) * 100).toFixed(2)}%`} // Calculate percentage dynamically
//                   size="small"
//                   sx={{
//                     color: item.value > 0 ? "#7ed321" : "#d0021b",
//                     backgroundColor: item.value > 0 ? "#e7f8e9" : "#fbe9e9",
//                     fontWeight: "bold",
//                   }}
//                 />
//               </Grid>
//             ))}
//           </Grid>
//         </Box>

//         <Box
//           sx={{
//             backgroundColor: "#fff",
//             padding: 2,
//             borderRadius: 5,
//             boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//             width: "100%",
//             maxWidth: 350,
//           }}
//         >
//           {/* Header */}
//           <Typography variant="h6" fontWeight="bold" mb={1}>
//             Customer Growth
//           </Typography>
//           <Typography variant="body2" color="textSecondary" mb={2}>
//             Track customer by locations
//           </Typography>

//           {/* Container for Bubble Chart and Region List */}
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "flex-start",
//               width: "100%",
//             }}
//           >
//             {/* Bubble Chart */}
//             <Box
//               sx={{
//                 position: "relative",
//                 height: 200,
//                 width: 200,
//                 marginRight: 2,
//               }}
//             >
//               {bubbles.map((bubble, index) => (
//                 <Box
//                   key={index}
//                   sx={{
//                     position: "absolute",
//                     width: bubble.size,
//                     height: bubble.size,
//                     backgroundColor: bubble.color,
//                     borderRadius: "50%",
//                     top: bubble.y,
//                     left: bubble.x,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: "#fff",
//                     fontWeight: "bold",
//                     fontSize: 16,
//                     transform: "translate(-50%, -50%)",
//                   }}
//                 >
//                   {bubble.value}
//                 </Box>
//               ))}
//             </Box>

//             {/* Region List */}
//             <Grid container spacing={1} sx={{ maxWidth: 180 }}>
//               {regions.map((region, index) => (
//                 <Grid
//                   item
//                   xs={12}
//                   key={index}
//                   display="flex"
//                   alignItems="center"
//                 >
//                   <Avatar
//                     sx={{
//                       width: 20,
//                       height: 20,
//                       fontSize: 14,
//                       backgroundColor: "transparent",
//                       marginLeft: 6,
//                     }}
//                   >
//                     {region.flag}
//                   </Avatar>
//                   <Typography variant="body2" flex={1}>
//                     {region.name}
//                   </Typography>
//                   <Typography variant="body2" fontWeight="bold">
//                     {region.value}
//                   </Typography>
//                 </Grid>
//               ))}
//             </Grid>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;

import React, { useEffect } from "react";
import { Box, Grid, Paper, Typography, Avatar } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PeopleIcon from "@mui/icons-material/People";
import GroupsIcon from "@mui/icons-material/Groups";
import WorkIcon from "@mui/icons-material/Work";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardMetrics } from "../../redux/features/dashboard/DashboardSlice";
import PieChartScopeCompany from "./Charts/PieChartScopeCompany";
import ReductionPieChart from "./Charts/ReductionPiechart";
import LatestNotifications from "./Charts/LatestNotifications";
import MapComponent from "./Charts/MapComponent";
import TableComponent from "./Charts/TableComponent";
import ActiveClients from "../../../src/assets/images/businessman.svg";
import pendingsubmissions from "../../../src/assets/images/clock.svg";
import validatedemissions from "../../../src/assets/images/check.svg";
import threshold from "../../../src/assets/images/threshold.svg";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { metrics } = useSelector((state) => state.dashboard);
  const { keyMetrics, widgets } = metrics;

  useEffect(() => {
    dispatch(fetchDashboardMetrics());
  }, [dispatch]);

  const notifications = [
    { title: "System Update Completed", timestamp: "2024-12-20 10:00 AM" },
    { title: "New User Registered", timestamp: "2024-12-19 03:45 PM" },
    { title: "Data Backup Successful", timestamp: "2024-12-18 08:20 AM" },
  ];

  return (
    <Box
      sx={{
        // backgroundColor: "#f4f6f9",
        minHeight: "100vh",
        width: "100vw",     
        display: "flex",
        flexDirection: "column",
        
      }}
    >
      <Grid container spacing={1.5}>
        {/* Four Boxes Section */}
        {[
          {
            title: "Active Clients",
            value: keyMetrics?.totalActiveClients || 0,
            color: "#81C784",

            // icon: <PeopleIcon sx={{ fontSize: "20px" }} />, // Green
            icon: (
              <img
                src={ActiveClients}
                alt="Active Clients"
                style={{ width: "100%" }}
              />
            ),
          },
          {
            title: "Pending Submissions",
            value: keyMetrics?.pendingSubmissions || 0,
            color: "#81C784",

            icon: (
              <img
                src={pendingsubmissions}
                alt="Active Clients"
                style={{ width: "100%" }}
              />
            ),
          },
          {
            title: "Validated Emissions",
            value: keyMetrics?.validatedReports || 0,
            color: "#81C784",

            // icon: <MonetizationOnIcon sx={{ fontSize: "20px" }} />, // Blue
            icon: (
              <img
                src={validatedemissions}
                alt="Active Clients"
                style={{ width: "100%" }}
              />
            ),
          },
          {
            title: "Threshold Breaches",
            value: keyMetrics?.thresholdBreaches || 0,
            color: "#81C784",

            // icon: <WorkIcon sx={{ fontSize: "20px" }} />, // Red
            icon: (
              <img
                src={threshold}
                alt="Active Clients"
                style={{ width: "100%" }}
              />
            ),
          },
        ].map((stat, index) => (
          <Grid item xs={12} sm={1.83} key={index}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 2,
                // padding: 2,
                textAlign: "left",
                backgroundColor: stat.bgColor || "#fff",
                backgroundImage: stat.gradient || "none",
                transition: "0.3s",
                height: 105,
                width: 200,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 16px 24px rgba(0,0,0,0.2)",
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: stat.color,
                  color: "#fff",
                  width: 32,
                  height: 32,
                  mb: 1,
                }}
              >
                {stat.icon}
              </Avatar>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold", color: "#333", fontSize: "14px" }}
              >
                {stat.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#000", fontSize: "16px" }}
              >
                {stat.value}
              </Typography>
            </Paper>
          </Grid>
        ))}

        <Grid item xs={12} sm={2}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 2,
              textAlign: "left",
              background: "linear-gradient(to right, #66BB6A, #A5D6A7)",
              transition: "0.3s",
              height: 100,
              width: 220,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 16px 24px rgba(0,0,0,0.2)",
              },
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: "bold", color: "#fff", fontSize: "14px" }}
            >
              Engagement Rate
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#fff",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              80.000
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: "#fff",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              +20%
              <TrendingUpIcon sx={{ fontSize: "28px", color: "#fff" }} />
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={2}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 2,
              textAlign: "left",
              background: "linear-gradient(to right, #66BB6A, #A5D6A7)",
              transition: "0.3s",
              height: 100,
              width: 220,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 16px 24px rgba(0,0,0,0.2)",
              },
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: "bold", color: "#fff", fontSize: "14px" }}
            >
              Carbon Credits
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#fff",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              40.000
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: "#fff",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              -10%
              <TrendingDownIcon sx={{ fontSize: "28px", color: "#fff" }} />
            </Typography>
          </Paper>
        </Grid>

        <Grid container item xs={12} spacing={1.5} alignItems="stretch">
          {/* Pie Chart Scope Company Section */}
          <Grid item xs={12} md={9.3}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <PieChartScopeCompany />
            </Box>
          </Grid>

          {/* Latest Notifications Section */}
          <Grid item xs={12} md={2.2}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <LatestNotifications notifications={notifications} />
            </Box>
          </Grid>
        </Grid>

        {/* Reduction Pie Chart Section */}
        <Grid container item xs={12} spacing={1.5}>
          <Grid item xs={12} md={9.3}>
            <ReductionPieChart />
          </Grid>
          {/* Map Component */}
          <Grid item xs={12} md={2.5}>
            <MapComponent />
          </Grid>
        </Grid>
        {/* Latest Submissions Table Section */}
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} md={11.8}> 
            <TableComponent />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 
