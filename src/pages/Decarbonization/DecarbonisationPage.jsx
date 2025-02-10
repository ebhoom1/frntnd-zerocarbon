import React, { useState, useRef } from "react";
import { Container, Typography, Button, Grid, Box, ThemeProvider } from "@mui/material";
import { lightDecarbonizationTheme, darkDecarbonizationTheme } from "../../Theme/decarbonizationTheme";
import KeyMetrics from './KeyMetrics';
import DecarbonisationRoadmap from "./DecarbonisationRoadmap";
import EmissionsReductionSimulator from "./EmissionsReductionSimulator";
import Scope3Explorer from './Scope3Explorer';
import RenewableEnergyCalculator from './RenewableEnergyCalculator';
import WasteManagementDashboard from './WasteManagementDashboard';

const DecarbonisationPage = () => {
  const nextSectionRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? darkDecarbonizationTheme : lightDecarbonizationTheme;
  
  // Dynamically choose background image based on theme mode
  const backgroundImage = darkMode 
    ? "url('/d-darkherosection.webp')" 
    : "url('/d-herosection.webp')";

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
          backgroundColor: theme.palette.background.default 
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: { xs: "400px", sm: "500px", md: "650px" }, // Fixed height
          backgroundColor: theme.palette.background.default,
            backgroundImage: backgroundImage,
            backgroundSize: { xs: "cover", sm: "cover" ,md:"cover",lg:"contain"}, // Cover for mobile, contain for larger screens
            backgroundRepeat: "no-repeat",
            backgroundPosition: { xs: "center", sm: "right" }, // Center on mobile, right on larger screens
            color: "#198754",
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", sm: "flex-start" }, // Center align on mobile
            justifyContent: "center",
            textAlign: { xs: "center", sm: "left" }, // Center text for mobile
            padding: { xs: "20px", sm: "50px" }, // Adjust padding for different screens
          }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom >
            Your Path to Net Zero Emissions
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ maxWidth: "600px", fontSize: { xs: "16px", sm: "18px" } }}>
            Discover how your organization can achieve decarbonization with personalized roadmaps, actionable insights, and real-time monitoring.
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ padding: "10px 20px", fontSize: "16px", width: { xs: "100%", sm: "auto" } }}  
              onClick={handleScrollToNext}
            >
              Get Started with Your Decarbonisation Plan
            </Button>
          </Box>
        </Box> 

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
          <Grid item xs={12}>
            <Scope3Explorer /> 
          </Grid>
          <Grid item xs={12}>
            <RenewableEnergyCalculator/> 
          </Grid>
          <Grid item xs={12}>
            <WasteManagementDashboard/> 
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default DecarbonisationPage;
