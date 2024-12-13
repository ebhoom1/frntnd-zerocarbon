import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

const CategoryFilter = ({ onFilter, onReset }) => {
  const [filters, setFilters] = useState({
    categoryName: "",
    activityName: "",
    fuelName: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    onFilter(filters);
  };

  const handleResetFilters = () => {
    setFilters({ categoryName: "", activityName: "", fuelName: "" });
    onReset();
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
      <TextField
        label="Category Name"
        name="categoryName"
        value={filters.categoryName}
        onChange={handleFilterChange}
        variant="outlined"
      />
      <TextField
        label="Activity Name"
        name="activityName"
        value={filters.activityName}
        onChange={handleFilterChange}
        variant="outlined"
      />
      <TextField
        label="Fuel Name"
        name="fuelName"
        value={filters.fuelName}
        onChange={handleFilterChange}
        variant="outlined"
      />
      <Button variant="contained" color="primary" onClick={handleApplyFilters}>
        Apply Filters
      </Button>
      <Button variant="outlined" color="secondary" onClick={handleResetFilters}>
        Reset Filters
      </Button>
    </Box>
  );
};

export default CategoryFilter;
