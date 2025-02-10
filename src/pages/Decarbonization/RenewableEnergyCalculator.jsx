import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box, Paper, Grid } from "@mui/material";

const RenewableEnergyCalculator = () => {
  const [energyConsumption, setEnergyConsumption] = useState(50000); // in kWh
  const [renewablePercentage, setRenewablePercentage] = useState(40); // default %
  const [results, setResults] = useState(null);

  const sampleOutput = {
    scope2Reduction: (energyConsumption * (renewablePercentage / 100) * 0.000233).toFixed(2), // CO2e reduction in tonnes
    costSavings: ((energyConsumption * (renewablePercentage / 100)) * 0.12).toFixed(2), // Sample cost savings
    paybackPeriod: (5 - renewablePercentage * 0.05).toFixed(1), // Estimated payback period in years
  };

  const calculateImpact = () => {
    setResults(sampleOutput);
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
      <Container maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            textAlign: "center",
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography sx={{ fontSize: "2.2rem", fontWeight: "bold", color: "#2E7D32" }}>
            Renewable Energy Calculator
          </Typography>
          <Typography sx={{ fontSize: "1rem", color: "#666", mt: 1 }}>
            Estimate your Scope 2 emission reductions and financial impact by adopting renewable energy.
          </Typography>
        </Paper>

        <Grid container spacing={4} sx={{ mt: 1 }}>
          {/* Left Side - Inputs */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={6}
              sx={{
                p: 4,
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography sx={{ fontSize: "1.6rem", color: "#2E7D32", mb: 2, fontWeight: "bold" }}>
                Enter Energy Data
              </Typography>
              <TextField
                label="Current Energy Consumption (kWh)"
                variant="outlined"
                fullWidth
                type="number"
                value={energyConsumption}
                onChange={(e) => setEnergyConsumption(e.target.value)}
                sx={{ mb: 3 }}
              />
              <TextField
                label="Renewable Energy Adoption (%)"
                variant="outlined"
                fullWidth
                type="number"
                value={renewablePercentage}
                onChange={(e) => setRenewablePercentage(e.target.value)}
                sx={{ mb: 3 }}
              />
              <Button
                variant="contained"
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
              >
                Calculate Impact
              </Button>
            </Paper>
          </Grid>

          {/* Right Side - Results */}
          <Grid item xs={12} md={6}>
            {results && (
              <Paper
                elevation={6}
                sx={{
                  p: 4,
                  backgroundColor: "#FFFFFF",
                  borderRadius: "16px",
                  boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography sx={{ fontSize: "1.6rem", color: "#2E7D32", mb: 2, fontWeight: "bold" }}>
                  Estimated Impact
                </Typography>
                <Typography sx={{ fontSize: "1rem", color: "#444", mb: 2 }}>
                  🌿 <strong>Scope 2 Emission Reduction:</strong> {results.scope2Reduction} tonnes CO2e
                </Typography>
                <Typography sx={{ fontSize: "1rem", color: "#444", mb: 2 }}>
                  💰 <strong>Estimated Cost Savings:</strong> ${results.costSavings}
                </Typography>
                <Typography sx={{ fontSize: "1rem", color: "#444" }}>
                  ⏳ <strong>Payback Period:</strong> {results.paybackPeriod} years
                </Typography>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default RenewableEnergyCalculator;
