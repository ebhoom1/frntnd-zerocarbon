import React, { useEffect } from "react";
import { Box, Grid, Paper, Typography, Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardMetrics } from "../../../redux/features/dashboard/DashboardSlice";
import PieChart from "../UserDashboardCharts/PieChart";
import ReductionPieChart from "../UserDashboardCharts/ReductionPieChart";
import LatestNotifications from "../../Admin/Charts/LatestNotifications";
import MapComponent from "../../Admin/Charts/MapComponent";
import TableComponent from "../../Admin/Charts/TableComponent";
import ActiveClients from "../../../assets/images/businessman.svg";
import pendingsubmissions from "../../../assets/images/clock.svg";
import validatedemissions from "../../../assets/images/check.svg";
import threshold from "../../../assets/images/threshold.svg";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import HeatMap from './HeatMap';

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
      <Grid container spacing={3}>
        {/* Four Boxes Section */}
        {[
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
              <PieChart />
            </Box>
          </Grid>

          {/* Latest Notifications Section */}
        </Grid>

        {/* Reduction Pie Chart Section */}
        <Grid container item xs={12} md={9.3}>
          
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <ReductionPieChart />
          </Box>
        </Grid>
        {/* Latest Submissions Table Section */}
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} md={6}> 
 <HeatMap /> 
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
