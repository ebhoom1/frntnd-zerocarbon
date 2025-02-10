import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Slider,
  Box,
  Paper,
  Button,
  CircularProgress,
  Grid,
} from "@mui/material";
import { lightDecarbonizationTheme } from "../../Theme/decarbonizationTheme";
import { ThemeProvider } from "@mui/material/styles";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const EmissionsReductionSimulator = () => {
  // State for reduction strategies
  const [renewableEnergy, setRenewableEnergy] = useState(20);
  const [electricVehicles, setElectricVehicles] = useState(10);
  const [energyEfficiency, setEnergyEfficiency] = useState(15);
  const [aiResponse, setAiResponse] = useState(null);

  // Placeholder for AI-generated response
  const sampleResponse = {
    reduction: (
      renewableEnergy * 0.05 +
      electricVehicles * 0.03 +
      energyEfficiency * 0.02
    ).toFixed(2),
    savings: (
      renewableEnergy * 50 +
      electricVehicles * 30 +
      energyEfficiency * 20
    ).toFixed(2),
    investment: (
      renewableEnergy * 40 +
      electricVehicles * 50 +
      energyEfficiency * 30
    ).toFixed(2),
  };

  // Function to simulate API call
  const fetchSimulationData = async () => {
    try {
      setAiResponse(sampleResponse); // Use sample data for now
    } catch (error) {
      console.error("Error fetching simulation data:", error);
      setAiResponse({ reduction: "0", savings: "0", investment: "0" });
    }
  };

  useEffect(() => {
    fetchSimulationData();
  }, [renewableEnergy, electricVehicles, energyEfficiency]);

  const costBenefitData = [
    { category: "Savings", value: aiResponse?.savings, color: "#4CAF50" },
    { category: "Investment", value: aiResponse?.investment, color: "#FF9800" },
  ];

  return (
    <ThemeProvider theme={lightDecarbonizationTheme}>
      <Box sx={{  p: 4 }}>
        <Container maxWidth="lg">
          {/* Header */}
          <Paper
            elevation={4}
            sx={{
              p: 4,
              textAlign: "center",
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
            }}
          >
            <Typography
              sx={{ fontSize: "2rem", fontWeight: "bold", color: "#388E3C" }}
            >
              Emissions Reduction Simulator
            </Typography>
            <Typography sx={{ fontSize: "1rem", color: "#666" }}>
              Adjust your strategies and see the real-time impact on CO2e
              reductions and cost savings.
            </Typography>
          </Paper>

          <Grid container spacing={4} sx={{ mt: 4, alignItems: "stretch" }}>
            {/* Left Side - Sliders */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={4}
                sx={{
                  p: 4,
                  backgroundColor: "#FFFFFF",
                  borderRadius: "12px",
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Typography sx={{ fontSize: "1.2rem", color: "#666" }}>
                  Renewable Energy Adoption: {renewableEnergy}%
                </Typography>
                <Slider
                  value={renewableEnergy}
                  onChange={(e, newValue) => setRenewableEnergy(newValue)}
                  min={0}
                  max={100}
                  step={5}
                  sx={{ color: "#4CAF50" }}
                />

                <Typography sx={{ fontSize: "1.2rem", color: "#666", mt: 3 }}>
                  Electric Vehicle Adoption: {electricVehicles}%
                </Typography>
                <Slider
                  value={electricVehicles}
                  onChange={(e, newValue) => setElectricVehicles(newValue)}
                  min={0}
                  max={100}
                  step={5}
                  sx={{ color: "#4CAF50" }}
                />

                <Typography sx={{ fontSize: "1.2rem", color: "#666", mt: 3 }}>
                  Energy Efficiency Improvements: {energyEfficiency}%
                </Typography>
                <Slider
                  value={energyEfficiency}
                  onChange={(e, newValue) => setEnergyEfficiency(newValue)}
                  min={0}
                  max={100}
                  step={5}
                  sx={{ color: "#4CAF50" }}
                />

                {/* Background Image */}
                <Box
                  component="img"
                  src="/simulator-bg.webp"
                  alt="Simulator Background"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: "100%",
                    opacity: 0.9,
                    display: { xs: "none", sm: "none", md: "none", lg: "block" }, // Hide on smaller screens
                  }}
                />
              </Paper>
            </Grid>

            {/* Right Side - AI Insights & Cost-Benefit Analysis */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={4}
                sx={{
                  p: 4,
                  textAlign: "center",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "12px",
                  height: "48%",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#388E3C",
                  }}
                >
                  Emission Reduction Progress
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 3,
                    position: "relative",
                  }}
                >
                  <CircularProgress
                    variant="determinate"
                    value={100}
                    size={100}
                    thickness={6}
                    sx={{ color: "#ddd", position: "absolute" }}
                  />
                  <CircularProgress
                    variant="determinate"
                    value={aiResponse?.reduction}
                    size={100}
                    thickness={6}
                    sx={{ color: "#4CAF50" }}
                  />
                </Box>
                <Typography
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: "#4CAF50",
                    mt: 2,
                  }}
                >
                  Estimated CO2e Reduction: {aiResponse?.reduction} tonnes
                </Typography>
              </Paper>

              <Paper
                elevation={4}
                sx={{
                  p: 4,
                  textAlign: "center",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "12px",
                  mt: 2,
                  height: "48%",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#388E3C",
                  }}
                >
                  Cost-Benefit Analysis
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={costBenefitData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill={costBenefitData[0].color} />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default EmissionsReductionSimulator;
