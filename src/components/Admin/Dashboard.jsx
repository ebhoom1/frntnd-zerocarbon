

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
          // {
          //   title: "Threshold Breaches",
          //   value: keyMetrics?.thresholdBreaches || 0,
          //   color: "#81C784",

          //   // icon: <WorkIcon sx={{ fontSize: "20px" }} />, // Red
          //   icon: (
          //     <img
          //       src={threshold}
          //       alt="Active Clients"
          //       style={{ width: "100%" }}
          //     />
          //   ),
          // },
        ].map((stat, index) => (
          <Grid item xs={12} sm={1.89} key={index}>
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
                width: 210,
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

        <Grid item xs={12} sm={1.8}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 2,
              textAlign: "left",
              background: "linear-gradient(to right, #66BB6A, #A5D6A7)",
              transition: "0.3s",
              height: 100,
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

        <Grid item xs={12}  sm={1.8}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 2,
              textAlign: "left",
              background: "linear-gradient(to right, #66BB6A, #A5D6A7)",
              transition: "0.3s",
              height: 100,
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
          {/* <Grid item xs={12} md={2.2}>
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
          </Grid> */}
        </Grid>

        {/* Reduction Pie Chart Section */}
        <Grid container item xs={12} spacing={1.5}>
          {/* <Grid item xs={12} md={9.3}>
            <ReductionPieChart />
          </Grid> */}
           {/* Latest Submissions Table Section */}
           <Grid item xs={12} md={6}> 
            <TableComponent />
          </Grid>
          {/* Map Component */}
          <Grid item xs={12} md={3.2}>
            <MapComponent />
          </Grid>
        </Grid>
        
      </Grid>
    </Box>
  );
};

export default Dashboard; 
