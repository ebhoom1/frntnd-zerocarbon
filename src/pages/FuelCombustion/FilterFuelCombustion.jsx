import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "../../api/axios";

const FilterFuelCombustion = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    category: "",
    activity: "",
    fuel: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilter = () => {
    axios
      .get("/api/fuelCombustion/filter", { params: filters })
      .then((response) => {
        onFilter(response.data.data); // Pass the filtered data to the parent component
        setError("");
      })
      .catch((error) => {
        setError(
          error.response?.data?.message ||
            "Failed to fetch filtered Fuel Combustion data"
        );
      });
  };

  return (
    <Box
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    background: "#f7f9fc",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    marginBottom: 4,
    mt: 4,
    gap: 2, // Ensures consistent spacing
  }}
>
  {/* Input Fields Section */}
  <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      gap: 2, // Adjusts spacing between inputs
      flexGrow: 1, // Makes inputs take up available space
    }}
  >
    <TextField
      label="Category"
      name="category"
      value={filters.category}
      onChange={handleChange}
      variant="outlined"
      size="small"
      sx={{
        flex: 1,
        minWidth: "180px", // Ensures responsiveness
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px", // Adds a modern rounded look
        },
      }}
    />
    <TextField
      label="Activity"
      name="activity"
      value={filters.activity}
      onChange={handleChange}
      variant="outlined"
      size="small"
      sx={{
        flex: 1,
        minWidth: "180px",
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
        },
      }}
    />
    <TextField
      label="Fuel"
      name="fuel"
      value={filters.fuel}
      onChange={handleChange}
      variant="outlined"
      size="small"
      sx={{
        flex: 1,
        minWidth: "180px",
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
        },
      }}
    />
  </Box>

  {/* Button Section */}
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
    }}
  >
    <Button
      variant="contained"
      color="primary"
      onClick={handleFilter}
      sx={{
        padding: "8px 24px",
        borderRadius: "8px",
        textTransform: "none",
        fontSize: "14px",
        fontWeight: "bold",
        boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
        
      }}
    >
      Apply Filters
    </Button>
  </Box>

  {/* Error Section */}
  {error && (
    <Typography
      variant="body2"
      color="error"
      sx={{
        width: "100%", // Ensures error spans full width
        textAlign: "center",
        marginTop: "8px",
        fontWeight: "bold",
      }}
    >
      {error}
    </Typography>
  )}
</Box>

  );
};

export default FilterFuelCombustion;
