import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "../../api/axios";

const FilterByChemicalName = ({ onFilter }) => {
  const [chemicalName, setChemicalName] = useState("");
  const [error, setError] = useState("");
console.log("chemical name:",chemicalName);
  const handleFilter = () => {
    if (!chemicalName.trim()) {
      setError("Chemical name is required");
      return;
    }

    axios
      .get(`/api/gwp/chemical/${chemicalName}`)
      .then((response) => {
        onFilter(response.data); // Pass the filtered data to the parent component
        setError("");
      })
      .catch((error) => {
        console.log(error)
        setError(
          error.response?.data?.message ||
            "Failed to fetch GWP data by chemical name"
        );
      });
  };

  return (
    <Box sx={{ marginBottom: 4, mt: 10 }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          maxWidth: "600px", // Set a maximum width for the filter bar
          width: "100%", // Ensure it adjusts to the screen size
          padding: "10px 20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <TextField
          label="Chemical Name"
          variant="outlined"
          value={chemicalName}
          onChange={(e) => setChemicalName(e.target.value)}
          sx={{
            flex: 1,
            marginRight: "10px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleFilter}
          sx={{
            padding: "10px 20px",
            borderRadius: "20px",
            textTransform: "none",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Filter
        </Button>
      </Box>
      {error && (
        <Typography
          variant="body2"
          color="error"
          sx={{
            marginTop: "8px",
            fontWeight: "bold",
            color: "#f44336",
          }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default FilterByChemicalName;
