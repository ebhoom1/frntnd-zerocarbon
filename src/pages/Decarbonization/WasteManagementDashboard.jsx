import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const WasteManagementDashboard = () => {
  const [wasteType, setWasteType] = useState("");
  const [wasteAmount, setWasteAmount] = useState("");
  const [recyclingRate, setRecyclingRate] = useState("");
  const [wasteData, setWasteData] = useState([
    { type: "Plastic", amount: "500", recyclingRate: "40%", carbonEmission: "1.2" },
    { type: "Paper", amount: "300", recyclingRate: "70%", carbonEmission: "0.8" },
    { type: "Organic", amount: "700", recyclingRate: "60%", carbonEmission: "1.5" }
  ]);

  const handleAddWaste = () => {
    if (wasteType && wasteAmount && recyclingRate) {
      setWasteData([...wasteData, { type: wasteType, amount: wasteAmount, recyclingRate: recyclingRate + "%", carbonEmission: (wasteAmount * 0.002).toFixed(2) }]);
      setWasteType("");
      setWasteAmount("");
      setRecyclingRate("");
    }
  };

  return (
    <Box sx={{  p: 4 }}>
      <Container maxWidth="lg">
        <Paper elevation={4} sx={{ p: 4, textAlign: "center", backgroundColor: "#FFFFFF", borderRadius: "12px" }}>
          <Typography sx={{ fontSize: "2rem", fontWeight: "bold", color: "#388E3C" }}>Waste Management </Typography>
          <Typography sx={{ fontSize: "1rem", color: "#666" }}>
            Monitor waste metrics, carbon emissions, and AI-driven recommendations for cost savings and sustainability.
          </Typography>
        </Paper>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={4} sx={{ p: 4, backgroundColor: "#FFFFFF", borderRadius: "12px" }}>
              <Typography sx={{ fontSize: "1.5rem", color: "#388E3C", mb: 2 }}>Add Waste Data</Typography>
              <TextField label="Waste Type" variant="outlined" fullWidth value={wasteType} onChange={(e) => setWasteType(e.target.value)} sx={{ mb: 2 }} />
              <TextField label="Amount (kg)" variant="outlined" fullWidth type="number" value={wasteAmount} onChange={(e) => setWasteAmount(e.target.value)} sx={{ mb: 2 }} />
              <TextField label="Recycling Rate (%)" variant="outlined" fullWidth type="number" value={recyclingRate} onChange={(e) => setRecyclingRate(e.target.value)} sx={{ mb: 2 }} />
              <Button variant="contained" color="primary" onClick={handleAddWaste}>Add Waste Data</Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={4} sx={{ p: 4, backgroundColor: "#FFFFFF", borderRadius: "12px" }}>
              <Typography sx={{ fontSize: "1.5rem", color: "#388E3C", mb: 2 }}>Waste Data Overview</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Waste Type</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Amount (kg)</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Recycling Rate</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Carbon Emission (tons)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {wasteData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.type}</TableCell>
                        <TableCell>{row.amount}</TableCell>
                        <TableCell>{row.recyclingRate}</TableCell>
                        <TableCell>{row.carbonEmission}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>

       
      </Container>
    </Box>
  );
};

export default WasteManagementDashboard;
