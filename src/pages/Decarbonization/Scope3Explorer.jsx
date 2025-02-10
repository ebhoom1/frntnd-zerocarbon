import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, Select, Grid } from "@mui/material";

const Scope3Explorer = () => {
  const [supplier, setSupplier] = useState("");
  const [category, setCategory] = useState("");
  const [emissionFactor, setEmissionFactor] = useState("");
  const [suppliersData, setSuppliersData] = useState([
    { supplier: "ABC Manufacturing", category: "Purchased Goods & Services", emissionFactor: "500" },
    { supplier: "XYZ Logistics", category: "Transportation & Distribution", emissionFactor: "300" },
    { supplier: "Green Energy Ltd.", category: "Fuel- & Energy-Related Activities", emissionFactor: "200" }
]);

  const categories = [
    "Purchased Goods & Services",
    "Capital Goods",
    "Fuel- & Energy-Related Activities",
    "Transportation & Distribution",
    "Waste Generated in Operations",
    "Business Travel",
    "Employee Commuting",
    "Use of Sold Products",
    "End-of-Life Treatment of Sold Products"
  ];

  const handleAddSupplier = () => {
    if (supplier && category && emissionFactor) {
      setSuppliersData([...suppliersData, { supplier, category, emissionFactor }]);
      setSupplier("");
      setCategory("");
      setEmissionFactor("");
    }
  };

  return (
    <Box sx={{  p: 4 }}>
      <Container maxWidth="lg">
        <Paper elevation={4} sx={{ p: 4, textAlign: "center", backgroundColor: "#FFFFFF", borderRadius: "12px", mb: 4 }}>
          <Typography sx={{ fontSize: "1.8rem", fontWeight: "bold", color: "#388E3C" }}>Scope 3 Explorer</Typography>
          <Typography sx={{ fontSize: "1rem", color: "#666" }}>
            Track and analyze supplier emissions, identify high-impact categories, and explore reduction opportunities.
          </Typography>
        </Paper>

        <Grid container spacing={4}>
          {/* Left Side - Input Fields */}
          <Grid item xs={12} md={6}>
            <Paper elevation={4} sx={{ p: 4, backgroundColor: "#FFFFFF", borderRadius: "12px" }}>
              <Typography sx={{ fontSize: "1.8rem", color: "#388E3C", mb: 2 }}>Add Supplier Emissions</Typography>
              <TextField
                label="Supplier Name"
                variant="outlined"
                fullWidth
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                displayEmpty
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              >
                <MenuItem value="" disabled>Select Emission Category</MenuItem>
                {categories.map((cat, index) => (
                  <MenuItem key={index} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
              <TextField
                label="Emission Factor (kg CO2e)"
                variant="outlined"
                fullWidth
                type="number"
                value={emissionFactor}
                onChange={(e) => setEmissionFactor(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="primary" onClick={handleAddSupplier}>
                Add Supplier
              </Button>
            </Paper>
          </Grid>

          {/* Right Side - Table */}
          <Grid item xs={12} md={6}>
            <Paper elevation={4} sx={{ p: 4, backgroundColor: "#FFFFFF", borderRadius: "12px" }}>
              <Typography sx={{ fontSize: "1.5rem", color: "#388E3C", mb: 2 }}>Supplier Emission Data</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Supplier</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Emission Factor (kg CO2e)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {suppliersData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.supplier}</TableCell>
                        <TableCell>{row.category}</TableCell>
                        <TableCell>{row.emissionFactor}</TableCell>
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

export default Scope3Explorer;
