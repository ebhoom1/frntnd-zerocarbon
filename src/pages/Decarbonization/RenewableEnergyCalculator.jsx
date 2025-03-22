import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import axios from "../../api/axios";
import { useSelector } from "react-redux";


const RenewableEnergyCalculator = () => {
  const userId = useSelector((state) => state.auth.user?.id);

  const [energyConsumption, setEnergyConsumption] = useState("");
  const [renewablePercentage, setRenewablePercentage] = useState("");
  const [solarFeasibility, setSolarFeasibility] = useState("");
  const [gridMix, setGridMix] = useState("");
  const [investmentBudget, setInvestmentBudget] = useState("");
  const [govIncentives, setGovIncentives] = useState("");
  const [batteryStorage, setBatteryStorage] = useState("");
  const [siteConstraints, setSiteConstraints] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log("response:", results);
  const calculateImpact = async () => {
    if (
      !energyConsumption ||
      !renewablePercentage ||
      !solarFeasibility ||
      !gridMix ||
      !investmentBudget ||
      !govIncentives ||
      !batteryStorage ||
      !siteConstraints
    ) {
      alert("Please fill in all fields before calculating.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/renewable-energy/calculate", {
        energyConsumption,
        renewablePercentage,
        solarFeasibility,
        gridMix,
        investmentBudget,
        govIncentives,
        batteryStorage,
        siteConstraints,
      });

      setResults(response.data);
      // ✅ Empty all input fields after successful API response
      // setEnergyConsumption("");
      // setRenewablePercentage("");
      // setSolarFeasibility("");
      // setGridMix("");
      // setInvestmentBudget("");
      // setGovIncentives("");
      // setBatteryStorage("");
      // setSiteConstraints("");
    } catch (error) {
      console.error("Error calculating renewable impact:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveResult = async () => {
    
    try {
      const payload = {
        userId,
        energyConsumption,
        renewablePercentage,
        solarFeasibility,
        gridMix,
        investmentBudget,
        govIncentives,
        batteryStorage,
        siteConstraints,
        analysedData: results.analysedData,
      };

      await axios.post("/api/renewable-energy/save", payload);
      alert("Calculation saved successfully.");
    } catch (err) {
      console.error("Error saving renewable calculation:", err);
      alert("Failed to save data.");
    } 
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: "16px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            sx={{ fontSize: "2rem", fontWeight: "bold", color: "#2E7D32" }}
          >
            Renewable Energy Calculator
          </Typography>
          <Typography sx={{ fontSize: "1rem", color: "#666", mt: 1 }}>
            Estimate Scope 2 emission reductions and financial impact from
            renewable energy adoption.
          </Typography>
        </Paper>

        <Grid container spacing={3} sx={{ mt: 1 }}>
          {/* Left Side - Inputs */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={6}
              sx={{
                p: 4,
                borderRadius: "16px",
                boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.6rem",
                  color: "#2E7D32",
                  mb: 2,
                  fontWeight: "bold",
                }}
              >
                Enter Energy Data
              </Typography>

              <TextField
                label="Energy Consumption (kWh)"
                type="number"
                fullWidth
                value={energyConsumption}
                onChange={(e) => setEnergyConsumption(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Renewable Energy Adoption (%)"
                type="number"
                fullWidth
                value={renewablePercentage}
                onChange={(e) => setRenewablePercentage(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Solar/Wind Feasibility"
                type="text"
                fullWidth
                value={solarFeasibility}
                onChange={(e) => setSolarFeasibility(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Grid Energy Mix (Renewables %)"
                type="number"
                fullWidth
                value={gridMix}
                onChange={(e) => setGridMix(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Investment Budget (INR/USD)"
                type="number"
                fullWidth
                value={investmentBudget}
                onChange={(e) => setInvestmentBudget(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Expected Government Incentives"
                type="text"
                fullWidth
                value={govIncentives}
                onChange={(e) => setGovIncentives(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Battery Storage Plans (%)"
                type="number"
                fullWidth
                value={batteryStorage}
                onChange={(e) => setBatteryStorage(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Site Constraints (Land/Roof Availability)"
                type="text"
                fullWidth
                value={siteConstraints}
                onChange={(e) => setSiteConstraints(e.target.value)}
                sx={{ mb: 3 }}
              />

              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#2E7D32",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "white",
                  px: 3,
                  py: 1.2,
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#1B5E20" },
                  transition: "0.3s",
                }}
                onClick={calculateImpact}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Calculate Impact"
                )}
              </Button>
              <Button
      variant="outlined"
      fullWidth
      color="success"
      sx={{ mt: 2 }}
      onClick={handleSaveResult}
      disabled={!results}
    >
    Save Calculation
    </Button>
            </Paper>
          </Grid>

          {/* Right Side - Results */}
          <Grid item xs={12} md={6}>
          {results && results.analysedData ? (
            <Paper
              elevation={6}
              sx={{
                p: 4,
                borderRadius: "16px",
                boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
              }}
            >
             
                <>
                  <Typography
                    sx={{
                      fontSize: "1.6rem",
                      color: "#2E7D32",
                      mb: 2,
                      fontWeight: "bold",
                    }}
                  >
                    Estimated Impact
                  </Typography>

                  <Typography sx={{ fontSize: "1rem", color: "#444", mb: 2 }}>
                    🌿 <strong>Impact on Scope 2 Emissions:</strong>{" "}
                    {results.analysedData.scope2Impact}
                  </Typography>

                  <Typography sx={{ fontSize: "1rem", color: "#444", mb: 2 }}>
                    🌞 <strong>Local Renewable Options:</strong>{" "}
                    {results.analysedData.renewableOptions}
                  </Typography>

                  <Typography sx={{ fontSize: "1rem", color: "#444", mb: 2 }}>
                    ⏳ <strong>Payback Period:</strong>{" "}
                    {results.analysedData.paybackPeriod}
                  </Typography>
                </>
              
            </Paper>
            ) : (
              // Default message when no results
              <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#777",
                mt: 3,
              }}
              >
                ⚡ Calculate your renewable energy potential and make
                data-driven decisions.{" "}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default RenewableEnergyCalculator;
