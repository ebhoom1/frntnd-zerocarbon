// import React, { useEffect } from "react";
// import { Box, Grid, Paper, Typography, Avatar } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDashboardMetrics } from "../../../redux/features/dashboard/DashboardSlice";
// import PieChart from "../UserDashboardCharts/PieChart";
// import ReductionPieChart from "../UserDashboardCharts/ReductionPieChart";
// import LatestNotifications from "../UserDashboardCharts/LatestNotificationUser";
// import MapComponent from "../UserDashboardCharts/MapComponentUser";
// import TableComponent from "../../Admin/Charts/TableComponent";
// import ActiveClients from "../../../assets/images/businessman.svg";
// import pendingsubmissions from "../../../assets/images/clock.svg";
// import validatedemissions from "../../../assets/images/check.svg";
// import threshold from "../../../assets/images/threshold.svg";
// import TrendingDownIcon from "@mui/icons-material/TrendingDown";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import HeatMap from "./HeatMap";
// // import TotalEmission from './TotalEmission';

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const { metrics } = useSelector((state) => state.dashboard);
//   const { keyMetrics, widgets } = metrics;

//   useEffect(() => {
//     dispatch(fetchDashboardMetrics());
//   }, [dispatch]);

//   const notifications = [
//     { title: "System Update Completed", timestamp: "2024-12-20 10:00 AM" },
//     { title: "New User Registered", timestamp: "2024-12-19 03:45 PM" },
//     { title: "Data Backup Successful", timestamp: "2024-12-18 08:20 AM" },
//   ];

//   return (
//     <Box
//       sx={{
//         // backgroundColor: "#f4f6f9",
//         minHeight: "100vh",
//         width: "100vw",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       <Grid container spacing={2}>
//         {/* Four Boxes Section */}
//         {[
//           {
//             title: "Pending Submissions",
//             value: keyMetrics?.pendingSubmissions || 0,
//             color: "#81C784",

//             icon: (
//               <img
//                 src={pendingsubmissions}
//                 alt="Active Clients"
//                 style={{ width: "100%" }}
//               />
//             ),
//           },

//           {
//             title: "Threshold Breaches",
//             value: keyMetrics?.thresholdBreaches || 0,
//             color: "#81C784",

//             // icon: <WorkIcon sx={{ fontSize: "20px" }} />, // Red
//             icon: (
//               <img
//                 src={threshold}
//                 alt="Active Clients"
//                 style={{ width: "100%" }}
//               />
//             ),
//           },
//         ].map((stat, index) => (
//           <Grid item xs={12} sm={1.83} key={index}>
//             <Paper
//               elevation={0}
//               sx={{
//                 borderRadius: 2,
//                 // padding: 2,
//                 textAlign: "left",
//                 backgroundColor: stat.bgColor || "#fff",
//                 backgroundImage: stat.gradient || "none",
//                 transition: "0.3s",
//                 height: 105,
//                 width: 200,
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 "&:hover": {
//                   transform: "translateY(-8px)",
//                   boxShadow: "0 16px 24px rgba(0,0,0,0.2)",
//                 },
//               }}
//             >
//               <Avatar
//                 sx={{
//                   bgcolor: stat.color,
//                   color: "#fff",
//                   width: 32,
//                   height: 32,
//                   mb: 1,
//                 }}
//               >
//                 {stat.icon}
//               </Avatar>
//               <Typography
//                 variant="subtitle2"
//                 sx={{ fontWeight: "bold", color: "#333", fontSize: "14px" }}
//               >
//                 {stat.title}
//               </Typography>
//               <Typography
//                 variant="h6"
//                 sx={{ fontWeight: "bold", color: "#000", fontSize: "16px" }}
//               >
//                 {stat.value}
//               </Typography>
//             </Paper>
//           </Grid>
//         ))}

//         <Grid item xs={12} sm={2}>
//           <Paper
//             elevation={0}
//             sx={{
//               borderRadius: 2,
//               textAlign: "left",
//               background: "linear-gradient(to right, #66BB6A, #A5D6A7)",
//               transition: "0.3s",
//               height: 100,
//               width: 220,
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//               "&:hover": {
//                 transform: "translateY(-8px)",
//                 boxShadow: "0 16px 24px rgba(0,0,0,0.2)",
//               },
//             }}
//           >
//             <Typography
//               variant="subtitle2"
//               sx={{ fontWeight: "bold", color: "#fff", fontSize: "14px" }}
//             >
//               Engagement Rate
//             </Typography>
//             <Typography
//               variant="h5"
//               sx={{
//                 fontWeight: "bold",
//                 color: "#fff",
//                 fontSize: "18px",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "4px",
//               }}
//             >
//               80.000
//             </Typography>
//             <Typography
//               variant="body2"
//               sx={{
//                 fontWeight: "bold",
//                 color: "#fff",
//                 fontSize: "14px",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "4px",
//               }}
//             >
//               +20%
//               <TrendingUpIcon sx={{ fontSize: "28px", color: "#fff" }} />
//             </Typography>
//           </Paper>
//         </Grid>

//         <Grid item xs={12} sm={2}>
//           <Paper
//             elevation={0}
//             sx={{
//               borderRadius: 2,
//               textAlign: "left",
//               background: "linear-gradient(to right, #66BB6A, #A5D6A7)",
//               transition: "0.3s",
//               height: 100,
//               width: 220,
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//               "&:hover": {
//                 transform: "translateY(-8px)",
//                 boxShadow: "0 16px 24px rgba(0,0,0,0.2)",
//               },
//             }}
//           >
//             <Typography
//               variant="subtitle2"
//               sx={{ fontWeight: "bold", color: "#fff", fontSize: "14px" }}
//             >
//               Carbon Credits
//             </Typography>
//             <Typography
//               variant="h5"
//               sx={{
//                 fontWeight: "bold",
//                 color: "#fff",
//                 fontSize: "18px",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "4px",
//               }}
//             >
//               40.000
//             </Typography>
//             <Typography
//               variant="body2"
//               sx={{
//                 fontWeight: "bold",
//                 color: "#fff",
//                 fontSize: "14px",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "4px",
//               }}
//             >
//               -10%
//               <TrendingDownIcon sx={{ fontSize: "28px", color: "#fff" }} />
//             </Typography>
//           </Paper>
//         </Grid>

//         <Grid container item xs={12} spacing={1.5} alignItems="stretch">
//           {/* Pie Chart Scope Company Section */}
//           <Grid item xs={12} md={9.3}>
//             <Box
//               sx={{
//                 height: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//               }}
//             >
//               <PieChart />
//             </Box>
//           </Grid>

//           {/* Latest Notifications Section */}
//           <Grid item xs={12} md={2.2}>
//             <Box
//               sx={{
//                 height: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//               }}
//             >
//               <LatestNotifications notifications={notifications} />
//             </Box>
//           </Grid>
//         </Grid>

//         {/* Reduction Pie Chart Section */}
//         <Grid container item xs={12} spacing={1.5}>
//           <Grid item xs={12} md={9.3}>

//               <ReductionPieChart />
//           </Grid>
//           {/* Map Component */}
//           <Grid item xs={12} md={2.5}>
//             <MapComponent />
//           </Grid>
//         </Grid>
//         {/* heat map Section */}
//         <Grid container item xs={12} spacing={2}>
//           <Grid item xs={12} md={6}>
//             <HeatMap />
//           </Grid>
//         </Grid>
//         <Grid container item xs={12} spacing={2}>
//           <Grid item xs={12} md={6}>
//             {/* <TotalEmission /> */}
//           </Grid>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Dashboard;

import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  // CircularProgress,
} from "@mui/material";
import {
  BarChart,
  Bar,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Leaf, Bolt, Droplet, Trash2, Users, ShieldCheck } from "lucide-react";
import LineChart from "./LineChart";
import Barchart from "./Barchart";
import CircularProgress from './CircularProgress';
import PieChart from './PieChart'
import ActionableInsightsPanel from "./ActionableInsightPanel"; // Import the new component
import { green } from "@mui/material/colors";

const sampleData = {
  kpiMetrics: [
    { title: "Carbon Footprint", value: "250 kg CO₂e" },
    { title: "Energy Consumption", value: "1200 kWh" },
    { title: "Water Usage", value: "500 liters" },
    { title: "Waste Reduction", value: "30%" },
    { title: "Employee Diversity", value: "45%" },
    { title: "Governance Compliance", value: "80%" },
  ],
  lineChartData: [
    { month: "Jan", emissions: 40 },
    { month: "Feb", emissions: 30 },
    { month: "Mar", emissions: 20 },
    { month: "Apr", emissions: 27 },
  ],
  barChartData: [
    { name: "Energy", value: 1200 },
    { name: "Water", value: 500 },
  ],
  pieChartData: [
    { name: "Diversity", value: 45 },
    { name: "Inclusion", value: 55 },
  ],
};

const scores = { environmental: 75, social: 85, governance: 80 };

const UserDashboard = () => {
  return (
    <Box sx={{ p: 3, bgcolor: "#f4f8f4" }}>
           {/* KPI Metrics */}
      <Grid container rowSpacing={1} columnSpacing={2} sx={{ justifyContent: "center" }}>
        {sampleData.kpiMetrics.map((metric, index) => {
          // Icon mapping for each KPI
          const iconMap = {
            "Carbon Footprint": <Leaf size={28} color="#4CAF50" />,
            "Energy Consumption": <Bolt size={28} color="#FFC107" />,
            "Water Usage": <Droplet size={28} color="#2196F3" />,
            "Waste Reduction": <Trash2 size={28} color="#FF5722" />,
            "Employee Diversity": <Users size={28} color="#9C27B0" />,
            "Governance Compliance": <ShieldCheck size={28} color="#607D8B" />,
          };

          return (
            <Grid item xs={6} sm={4} md={2} key={index}>
              <Card
                sx={{
                  p: 1,
                  borderRadius: "20px",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": { transform: "scale(1.03)", boxShadow: 4 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  minHeight: "165px", // Ensures equal height
                }}
              >
                <CardContent sx={{ textAlign: "center", p: 1, width: "100%" }}>
                  {/* Icon */}
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mb: 1 }}
                  >
                    {iconMap[metric.title]}
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: green[800],
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                    }}
                  >
                    {metric.title}
                  </Typography>

                  {/* Value */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1rem",
                      color: "#333",
                      mt: 0.5,
                    }}
                  >
                    {metric.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Charts Section */}
      <Grid container rowSpacing={1} columnSpacing={2} sx={{ mt: 1 }}>
        {/* Line Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: "white", p: 2, borderRadius: "20px" }}>
            <LineChart />
          </Card>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: "white", p: 2, borderRadius: "20px" }}>
            <Barchart />
          </Card>
        </Grid>
      </Grid>

      {/* Pie Chart */}
      <Grid container rowSpacing={1} columnSpacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: "white", p: 2, borderRadius: "20px" }}>
           <PieChart/>
          </Card>
        </Grid>

        {/* Circular Progress */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              bgcolor: "white",
              p: 2,
              borderRadius: "20px",
            }}
          >
           
          <CircularProgress scores={scores} />
          </Card>
        </Grid>
      </Grid>
       {/* Actionable Insights Panel */}
       <Grid container sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <Card sx={{ bgcolor: "white", p: 3, borderRadius: "20px" }}>
            <Typography variant="h5" color="green" sx={{ mb: 2 }}>
              Actionable Insights
            </Typography>
            <ActionableInsightsPanel />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDashboard;
