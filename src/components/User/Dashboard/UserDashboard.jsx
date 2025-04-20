

// import React from "react";
// import { useSelector } from "react-redux";
// import {
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   // CircularProgress,
// } from "@mui/material";
// import {
//   BarChart,
//   Bar,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { Leaf, Bolt, Droplet, Trash2, Users, ShieldCheck } from "lucide-react";
// import LineChart from "./LineChart";
// import Barchart from "./Barchart";
// import CircularProgress from './CircularProgress';
// import PieChart from './PieChart'
// import ActionableInsightsPanel from "./ActionableInsightPanel"; // Import the new component
// import { green } from "@mui/material/colors";

// const sampleData = {
//   kpiMetrics: [
//     { title: "Carbon Footprint", value: "250 kg CO₂e" },
//     { title: "Energy Consumption", value: "1200 kWh" },
//     { title: "Water Usage", value: "500 liters" },
//     { title: "Waste Reduction", value: "30%" },
//     { title: "Employee Diversity", value: "45%" },
//     { title: "Governance Compliance", value: "80%" },
//   ],
 
 
//   pieChartData: [
//     { name: "Diversity", value: 45 },
//     { name: "Inclusion", value: 55 },
//   ],
// };

// const scores = { environmental: 75, social: 85, governance: 80 };

// const UserDashboard = () => {
// const userId=useSelector((state)=>state.auth.user.id)

//   return (
//     <Box sx={{ p: 3, bgcolor: "#f4f8f4" }}>
//            {/* KPI Metrics */}
//       <Grid container rowSpacing={1} columnSpacing={2} sx={{ justifyContent: "center" }}>
//         {sampleData.kpiMetrics.map((metric, index) => {
//           // Icon mapping for each KPI
//           const iconMap = {
//             "Carbon Footprint": <Leaf size={28} color="#4CAF50" />,
//             "Energy Consumption": <Bolt size={28} color="#FFC107" />,
//             "Water Usage": <Droplet size={28} color="#2196F3" />,
//             "Waste Reduction": <Trash2 size={28} color="#FF5722" />,
//             "Employee Diversity": <Users size={28} color="#9C27B0" />,
//             "Governance Compliance": <ShieldCheck size={28} color="#607D8B" />,
//           };

//           return (
//             <Grid item xs={6} sm={4} md={2} key={index}>
//               <Card
//                 sx={{
//                   p: 1,
//                   borderRadius: "20px",
//                   transition: "transform 0.2s ease-in-out",
//                   "&:hover": { transform: "scale(1.03)", boxShadow: 4 },
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   minHeight: "165px", // Ensures equal height
//                 }}
//               >
//                 <CardContent sx={{ textAlign: "center", p: 1, width: "100%" }}>
//                   {/* Icon */}
//                   <Box
//                     sx={{ display: "flex", justifyContent: "center", mb: 1 }}
//                   >
//                     {iconMap[metric.title]}
//                   </Box>

//                   {/* Title */}
//                   <Typography
//                     variant="subtitle1"
//                     sx={{
//                       color: green[800],
//                       fontSize: "0.9rem",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     {metric.title}
//                   </Typography>

//                   {/* Value */}
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       fontWeight: "bold",
//                       fontSize: "1rem",
//                       color: "#333",
//                       mt: 0.5,
//                     }}
//                   >
//                     {metric.value}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           );
//         })}
//       </Grid>

//       {/* Charts Section */}
//       <Grid container rowSpacing={1} columnSpacing={2} sx={{ mt: 1 }}>
//         {/* Line Chart */}
//         <Grid item xs={12} md={6}>
//           <Card sx={{ bgcolor: "white", p: 2, borderRadius: "20px" }}>
//             <LineChart userId={userId}/>
//           </Card>
//         </Grid>

//         {/* Bar Chart */}
//         <Grid item xs={12} md={6}>
//           <Card sx={{ bgcolor: "white", p: 2, borderRadius: "20px" }}>
//             <Barchart userId={userId} />
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Pie Chart */}
//       <Grid container rowSpacing={1} columnSpacing={2} sx={{ mt: 1 }}>
//         <Grid item xs={12} md={6}>
//           <Card sx={{ bgcolor: "white", p: 2, borderRadius: "20px" }}>
//            <PieChart/>
//           </Card>
//         </Grid>

//         {/* Circular Progress */}
//         <Grid item xs={12} md={6}>
//           <Card
//             sx={{
//               bgcolor: "white",
//               p: 2,
//               borderRadius: "20px",
//             }}
//           >
           
//           <CircularProgress scores={scores} />
//           </Card>
//         </Grid>
//       </Grid>
//        {/* Actionable Insights Panel */}
//        <Grid container sx={{ mt: 3 }}>
//         <Grid item xs={12}>
//           <Card sx={{ bgcolor: "white", p: 3, borderRadius: "20px" }}>
//             <Typography variant="h5" color="green" sx={{ mb: 2 }}>
//               Actionable Insights
//             </Typography>
//             <ActionableInsightsPanel />
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default UserDashboard;


import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../../api/axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import {
  Leaf, Bolt, Droplet, Trash2, Users, ShieldCheck
} from "lucide-react";
import LineChart from "./LineChart";
import Barchart from "./Barchart";
import CircularProgress from './CircularProgress';
import PieChart from './PieChart'
import ActionableInsightsPanel from "./ActionableInsightPanel";
import { green } from "@mui/material/colors";

const scores = { environmental: 75, social: 85, governance: 80 };

const UserDashboard = () => {
  const userId = useSelector((state) => state.auth.user.id);
  //ems
  const [emsCarbonEmission, setEmsCarbonEmission] = useState(null);

  const [carbonFootprint, setCarbonFootprint] = useState(0);
const [energyConsumption, setEnergyConsumption] = useState(0);
const [waterUsage, setWaterUsage] = useState(0)
const [wasteGenerated, setWasteGenerated] = useState(0);
const [totalEmployees, setTotalEmployees] = useState(0); 

useEffect(() => {
  const fetchKpiData = async () => {
    try {
      const currentYear = new Date().getFullYear().toString();

      // Fetch carbon footprint
      const carbonRes = await axios.get(`/api/monthly-emissions/${userId}`);
      const carbonData = carbonRes.data.data?.[currentYear] || [];
      const totalCarbon = carbonData.reduce((sum, entry) => sum + entry.emissions, 0);
      setCarbonFootprint(totalCarbon);

      // Fetch energy and water data
      const utilityRes = await axios.get(`/api/monthly-energy-water/${userId}`);
      const utilityData = utilityRes.data.data?.[currentYear] || [];
      const totalEnergy = utilityData.reduce((sum, entry) => sum + entry.energy, 0);
      const totalWater = utilityData.reduce((sum, entry) => sum + entry.water, 0);
      setEnergyConsumption(totalEnergy);
      setWaterUsage(totalWater);

       // ♻️ Fetch waste data
       const wasteRes = await axios.get(`/api/monthly-waste/${userId}`);
       const wasteData = wasteRes.data.data?.[currentYear] || [];
       const totalWaste = wasteData.reduce((sum, entry) => sum + entry.waste, 0);
       setWasteGenerated(totalWaste);

       // 👥 Employees
      const empRes = await axios.get(`/api/employees-stats/${userId}`);
      setTotalEmployees(empRes.data?.data?.totalEmployees || 0); // ✅ Set total
    } catch (err) {
      console.error("Error fetching KPI data:", err);
    }
  };

  fetchKpiData();
}, [userId]);


  const kpiMetrics = [
    { title: "Carbon Footprint", value: `${carbonFootprint.toFixed(2)} kg CO₂e` },
    { title: "Energy Consumption", value: `${energyConsumption.toFixed(2)} kWh` },
    { title: "Water Usage", value: `${waterUsage.toFixed(2)} liters` },
    { title: "Waste Generated", value: `${wasteGenerated.toFixed(2)} Tons` },
    { title: "Total Employee", value: totalEmployees.toString() }, 
    { title: "Governance Compliance", value: "80%" },
  ];

  const pieChartData = [
    { name: "Diversity", value: 45 },
    { name: "Inclusion", value: 55 },
  ];

  const iconMap = {
    "Carbon Footprint": <Leaf size={28} color="#4CAF50" />,
    "Energy Consumption": <Bolt size={28} color="#FFC107" />,
    "Water Usage": <Droplet size={28} color="#2196F3" />,
    "Waste Generated": <Trash2 size={28} color="#FF5722" />,
    "Total Employee": <Users size={28} color="#9C27B0" />,
    "Governance Compliance": <ShieldCheck size={28} color="#607D8B" />,
  };

  return (
    <Box sx={{ p: 3, bgcolor: "#f4f8f4" }}>
      {/* KPI Metrics */}
      <Grid container rowSpacing={1} columnSpacing={2} sx={{ justifyContent: "center" }}>
        {kpiMetrics.map((metric, index) => (
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
                minHeight: "165px",
              }}
            >
              <CardContent sx={{ textAlign: "center", p: 1, width: "100%" }}>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                  {iconMap[metric.title]}
                </Box>
                <Typography
                  variant="subtitle1"
                  sx={{ color: green[800], fontSize: "0.9rem", fontWeight: "bold" }}
                >
                  {metric.title}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", fontSize: "1rem", color: "#333", mt: 0.5 }}
                >
                  {metric.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container rowSpacing={1} columnSpacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: "white", p: 2, borderRadius: "20px" }}>
            <LineChart userId={userId} />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: "white", p: 2, borderRadius: "20px" }}>
            <Barchart userId={userId} />
          </Card>
        </Grid>
      </Grid>

      {/* Pie Chart & Circular Progress */}
      <Grid container rowSpacing={1} columnSpacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: "white", p: 2, borderRadius: "20px" }}>
            <PieChart />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: "white", p: 2, borderRadius: "20px" }}>
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
