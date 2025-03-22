

import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
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
import axios from "../../api/axios";
import { useSelector } from "react-redux";


const EmissionsReductionSimulator = () => {
  const userId = useSelector((state) => state.auth.user?.id);

  // State for input fields
  const [strategyAdjustments, setStrategyAdjustments] = useState("");
  const [energyConsumption, setEnergyConsumption] = useState("");
  const [fuelUsage, setFuelUsage] = useState("");
  const [buildingEfficiency, setBuildingEfficiency] = useState("");
  const [vehicleFleet, setVehicleFleet] = useState("");
  const [wasteManagement, setWasteManagement] = useState("");
  const [carbonCapture, setCarbonCapture] = useState("");
  const [financialConstraints, setFinancialConstraints] = useState("");
  const [policyChanges, setPolicyChanges] = useState("");

  const [aiResponse, setAiResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log("response:", aiResponse);

  const fetchSimulationData = async () => {
    if (
      !strategyAdjustments ||
      !energyConsumption ||
      !fuelUsage ||
      !buildingEfficiency ||
      !vehicleFleet ||
      !wasteManagement ||
      !carbonCapture ||
      !financialConstraints ||
      !policyChanges
    ) {
      alert("Please fill in all fields before simulating.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/emissions-reduction/simulate", {
        strategyAdjustments,
        energyConsumption,
        fuelUsage,
        buildingEfficiency,
        vehicleFleet,
        wasteManagement,
        carbonCapture,
        financialConstraints,
        policyChanges,
      });

      setAiResponse(response.data.analysedData);

      // Clear input fields after response
      // setStrategyAdjustments("");
      // setEnergyConsumption("");
      // setFuelUsage("");
      // setBuildingEfficiency("");
      // setVehicleFleet("");
      // setWasteManagement("");
      // setCarbonCapture("");
      // setFinancialConstraints("");
      // setPolicyChanges("");
    } catch (error) {
      console.error("Error fetching simulation data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSimulation = async () => {
    try {
      const payload = {
        userId,
        strategyAdjustments,
        energyConsumption,
        fuelUsage,
        buildingEfficiency,
        vehicleFleet,
        wasteManagement,
        carbonCapture,
        financialConstraints,
        policyChanges,
        aiResponse,
      };
      await axios.post("/api/emissions-reduction/save", payload);
      alert("Simulation saved successfully.");
    } catch (err) {
      console.error("Error saving simulation:", err);
      alert("Error saving simulation.");
    }
  };
  return (
    <ThemeProvider theme={lightDecarbonizationTheme}>
      <Box sx={{ p: 4 }}>
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
              Adjust strategies and assess the impact on CO2e reduction and cost
              savings.
            </Typography>
          </Paper>

          <Grid container spacing={4} sx={{ mt: 4, alignItems: "stretch" }}>
            {/* Left Side - Inputs */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={4}
                sx={{
                  p: 4,
                  backgroundColor: "#FFFFFF",
                  borderRadius: "12px",
                  height: "100%",
                }}
              >
                <Typography sx={{ fontSize: "1.2rem", color: "#666", mb: 2 }}>
                  Input Your Data
                </Typography>

                <TextField
                  label="Strategy Adjustments"
                  fullWidth
                  value={strategyAdjustments}
                  onChange={(e) => setStrategyAdjustments(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Annual Energy Consumption (kWh or CO₂e/kWh)"
                  type="number"
                  fullWidth
                  value={energyConsumption}
                  onChange={(e) => setEnergyConsumption(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Fuel Usage (Liters Petrol/Diesel/Natural Gas consumed anually)"
                  type="number"
                  fullWidth
                  value={fuelUsage}
                  onChange={(e) => setFuelUsage(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Building Efficiency Data(HVAC system, lighting, insulation efficiency)"
                  fullWidth
                  value={buildingEfficiency}
                  onChange={(e) => setBuildingEfficiency(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Vehicle Fleet Data (Current number of Petrol/Diesel Vehicles, EV Plans)"
                  fullWidth
                  value={vehicleFleet}
                  onChange={(e) => setVehicleFleet(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Waste Management Practices(Current recycling rate, landfill emissions)"
                  fullWidth
                  value={wasteManagement}
                  onChange={(e) => setWasteManagement(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Carbon Capture/Offset Programs(Planned investments in offsets)"
                   type="number"
                  fullWidth
                  value={carbonCapture}
                  onChange={(e) => setCarbonCapture(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Financial Constraints (Budget for Strategies)"
                  type="number"
                  fullWidth
                  value={financialConstraints}
                  onChange={(e) => setFinancialConstraints(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Expected Policy Changes"
                  fullWidth
                  value={policyChanges}
                  onChange={(e) => setPolicyChanges(e.target.value)}
                  sx={{ mb: 3 }}
                />

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={fetchSimulationData}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Simulate Impact"
                  )}
                </Button>
                <Button sx={{mt:3}} variant="outlined" color="success" fullWidth onClick={handleSaveSimulation} disabled={!aiResponse}>Save Simulation</Button>

              </Paper>
            </Grid>

            {/* Right Side - AI Insights & Cost-Benefit Analysis */}
            <Grid item xs={12} md={6}>
              {aiResponse ? (
                <>
                  {/* Emission Reduction Progress */}
                  <Paper
                    elevation={4}
                    sx={{
                      p: 4,
                      textAlign: "center",
                      backgroundColor: "#FFFFFF",
                      borderRadius: "12px",
                      height: "auto",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    

                    {/* Display Emission Reduction in Tonnes */}
                    <Typography
                      sx={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        color: "#4CAF50",
                        mt: 3,
                      }}
                    >
                      🌍 Estimated CO₂ Reduction:{" "}
                      <strong>{aiResponse?.reduction ?? "N/A"}</strong> tonnes
                    </Typography>

                    {/* Display Financial Savings */}
                    <Typography
                      sx={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        color: "#0288D1",
                        mt: 2,
                      }}
                    >
                      💰 Cost Savings:{" "}
                      <strong>
                        ${aiResponse?.savings?.toLocaleString() ?? "N/A"}
                      </strong>
                    </Typography>

                    {/* Display Investment Requirement */}
                    <Typography
                      sx={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        color: "#D32F2F",
                        mt: 2,
                      }}
                    >
                      🏗️ Investment Needed:{" "}
                      <strong>
                        ${aiResponse?.investment?.toLocaleString() ?? "N/A"}
                      </strong>
                    </Typography>
                  </Paper>

                  {/* Cost-Benefit Analysis */}
                  <Paper
                    elevation={4}
                    sx={{
                      p: 2,
                      textAlign: "center",
                      backgroundColor: "#FFFFFF",
                      borderRadius: "12px",
                      mt: 2,
                      minHeight: "300px",  // Ensures a minimum height
                      height: "auto",       // Allows dynamic resizing
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
                        data={[
                          {
                            category: "Savings",
                            value: aiResponse.savings ?? 0,
                          },
                          {
                            category: "Investment",
                            value: aiResponse.investment ?? 0,
                          },
                        ]}
                        margin={{ left: 20, right: 20 }} // Adjust left margin to create space
                      >
                        <XAxis dataKey="category" />
                        {/* <YAxis /> */}
                        <YAxis tickFormatter={(value) => value.toLocaleString()} />
                        <Tooltip />
                        <Bar dataKey="value" fill={"#4CAF50"} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Paper>
                </>
              ):(<Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "#777",
                  mt: 3,
                }}
              >
                🔍 Enter your data to generate insights and simulate impact.
              </Typography>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default EmissionsReductionSimulator;
