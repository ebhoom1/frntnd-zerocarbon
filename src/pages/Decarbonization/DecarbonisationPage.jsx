import React, { useState, useRef } from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  ThemeProvider,
} from "@mui/material";
import { lightDecarbonizationTheme } from "../../Theme/decarbonizationTheme";
import KeyMetrics from "./KeyMetrics";
import DecarbonisationRoadmap from "./DecarbonisationRoadmap";
import EmissionsReductionSimulator from "./EmissionsReductionSimulator";
import Scope3Explorer from "./Scope3Explorer";
import RenewableEnergyCalculator from "./RenewableEnergyCalculator";
import WasteManagementDashboard from "./WasteManagementDashboard";

const DecarbonisationPage = () => {
  const nextSectionRef = useRef(null);
  const theme = lightDecarbonizationTheme;


  const handleScrollToNext = () => {
    if (nextSectionRef.current) {
      nextSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

 

  return (
    <ThemeProvider theme={theme}>
        <Box
        sx={{
          height: "100vh",
          width: "100vw",
          // backgroundColor: theme.palette.background.default,
        }}
      >
       
        {/* Hero Section */}
        {/* Hero Section */}
        <Box
          sx={{
            width: "100%",
            height: { xs: "400px", sm: "500px", md: "650px" },
            color: "#198754",
            backgroundImage: "url('/d-herosection.webp')", // Replace with actual image path
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: { xs: "20px", sm: "50px" },
          }}
        >
          {/* Content Wrapper with Transparent Clipping Background */}
          <Box
            sx={{
              position: "relative",
              padding: "40px",
              // backgroundColor: "rgba(255, 255, 255, 0.6)", // Semi-transparent overlay
              backgroundColor: "rgba(253, 247, 227, 0.6)",
              // clipPath: "polygon(0% 0%, 100% 0%, 100% 80%, 50% 100%, 0% 80%)",
              clipPath:
                "polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)",
              backdropFilter: "blur(5px)", // Adds a subtle blur effect
              borderRadius: "20px",
              maxWidth: "700px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // Centers text and button
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: {
                  xs: "1.5rem",
                  sm: "2.125rem",
                  md: "3rem",
                },
                fontFamily: "'Montserrat', sans-serif",
                color: "#399918",
              }}
              fontWeight="bold"
              gutterBottom
            >
              Your Path to Net Zero Emissions
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                maxWidth: "600px",
                fontSize: { xs: "16px", sm: "18px" },
                color: "#4b5563",
              }}
            >
              Discover how your organization can achieve decarbonization with
              personalized roadmaps, actionable insights, and real-time
              monitoring.
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  width: { xs: "100%", sm: "auto" },
                }}
                onClick={handleScrollToNext}
              >
                Get Started with Your Decarbonisation Plan
              </Button>
            </Box>
          </Box>
        </Box>

        {/*hero section end*/}

        <Grid container spacing={3} sx={{ mt: 4 }} ref={nextSectionRef}>
          <Grid item xs={12}>
            <KeyMetrics />
          </Grid>
          <Grid item xs={12}>
            <DecarbonisationRoadmap />
          </Grid>
          <Grid item xs={12}>
            <EmissionsReductionSimulator />
          </Grid>
          {/* <Grid item xs={12}>
            <Scope3Explorer />
          </Grid> */}
          <Grid item xs={12}>
            <RenewableEnergyCalculator />
          </Grid>
          {/* <Grid item xs={12}>
            <WasteManagementDashboard />
          </Grid> */}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default DecarbonisationPage;

