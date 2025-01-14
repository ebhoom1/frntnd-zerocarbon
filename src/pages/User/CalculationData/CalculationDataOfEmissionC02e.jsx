import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Container,
  MenuItem,
} from "@mui/material";
import axios from "../../../api/axios";
import { useSelector } from "react-redux";

const AddCalculationDataForm = () => {
  const userId = useSelector((state) => state.auth.user?.id);
  console.log(userId);

  const [formData, setFormData] = useState({
    scopeDetails: "",
    combustionType: "",
    standards: "",
    activity: "",
    fuel: "",
    unit: "",
    userId: userId,
    source: "",
    reference: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      unit: name === "standards" ? (value === "IPCC" ? "KgL" : "litre") : prevData.unit,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    try {
      const response = await axios.post("/api/calculation-data", formData);

      setMessage(response.data.message);
      alert(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={2} p={2} boxShadow={3} borderRadius={2} bgcolor="white">
        <Typography variant="h5" gutterBottom>
          Add Calculation Data
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Scope Details Dropdown */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Scope Details"
                name="scopeDetails"
                value={formData.scopeDetails}
                onChange={handleChange}
                required
              >
                <MenuItem value="scope1">Scope 1</MenuItem>
                <MenuItem value="scope2">Scope 2</MenuItem>
                <MenuItem value="scope3">Scope 3</MenuItem>
              </TextField>
            </Grid>

            {/* Standards Dropdown */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Standards"
                name="standards"
                value={formData.standards}
                onChange={handleChange}
                required
              >
                <MenuItem value="IPCC">IPCC</MenuItem>
                <MenuItem value="DEFRA">DEFRA</MenuItem>
              </TextField>
            </Grid>

            {[
              { label: "Combustion Type", name: "combustionType" },
              { label: "Activity", name: "activity" },
              { label: "Fuel", name: "fuel" },
              { label: "Source", name: "source" },
              { label: "Reference", name: "reference" },
            ].map((field) => (
              <Grid item xs={12} key={field.name}>
                <TextField
                  fullWidth
                  label={field.label}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                />
              </Grid>
            ))}

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default AddCalculationDataForm;
