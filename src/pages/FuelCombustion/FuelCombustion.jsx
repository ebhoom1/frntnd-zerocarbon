
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  MenuItem,
} from "@mui/material";
import axios from "../../api/axios";
import UpdateFuelCombustionDialog from "./UpdateFuelCombustionDialog";
import FilterFuelCombustion from "./FilterFuelCombustion";
import ActivityInput from "./ActivityInput";
import FuelInput from "./FuelInput"; // For the Fuel dropdown/input


const FuelCombustion = () => {
  const [formData, setFormData] = useState({
    category: "1.A - Fuel Combustion Activities",
    activity: "",
    fuel: "",
    NCV: "",
    CO2: "",
    CH4: "",
    N2O: "",
    unit: "Kg/TJ",
    fuelDensityLiter: "",
    fuelDensityM3: "",
    CO2Formula: "CO2",
    CH4Formula: "CH4",
    N2OFormula: "N2O",
    CO2AssessmentType: "",
    CH4AssessmentType: "",
    N2OAssessmentType: "",
    source: "",
    reference: "IPCC",
  });

  const [fuelCombustionData, setFuelCombustionData] = useState([]);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleChange = (name, value) => {
  //   setFormData((prevState) => ({ ...prevState, [name]: value }));
  // };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("fuelcombustion FormData:",formData);
      const response = await axios.post("/api/fuelCombustion/add", formData); // Replace with your API endpoint
      alert(response.data.message);
      fetchFuelCombustionData(); // Fetch updated data after submission
      setFormData({
        category: "1.A - Fuel Combustion Activities",
        activity: "",
        fuel: formData.fuel,
        NCV: "",
        CO2: "",
        CH4: "",
        N2O: "",
        unit: "Kg/TJ",
        fuelDensityLiter: "",
        fuelDensityM3: "",
        CO2Formula: "CO2",
        CH4Formula: "CH4",
        N2OFormula: "N2O",
        CO2AssessmentType: "",
        CH4AssessmentType: "",
        N2OAssessmentType: "",
        source: "",
        reference: "IPCC",
      }); // Reset form
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  // Fetch data from the API
  const fetchFuelCombustionData = async () => {
    try {
      const response = await axios.get("/api/fuelCombustion/all"); // Replace with your API endpoint
      setFuelCombustionData(response.data.data);
      console.log("fuelcombustion data:",response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      await axios.put(`/api/fuelCombustion/update/${updatedData._id}`, updatedData); // Update endpoint
      console.log("updated data:",updatedData);
      fetchFuelCombustionData(); // Refresh data
      alert("Fuel Combustion data updated successfully!");
    } catch (error) {
      alert("Error updating data: " + error.message);
    }
  };

  const handleDelete = async (data) => {
    try {
      if (window.confirm(`Are you sure you want to delete the record for ${data.category}?`)) {
        await axios.delete(`/api/fuelCombustion/${data._id}`); // Replace with your delete endpoint
        alert("Fuel Combustion data deleted successfully!");
        fetchFuelCombustionData(); // Refresh the table data
      }
    } catch (error) {
      alert("Error deleting data: " + error.message);
    }
  };
  

  const handleOpenUpdateDialog = (data) => {
    setSelectedData(data);
    setUpdateDialogOpen(true);
  };

  const handleCloseUpdateDialog = () => {
    setUpdateDialogOpen(false);
    setSelectedData(null);
  };

  const handleFilter = (filteredData) => {
    setFuelCombustionData(filteredData);
  };

  useEffect(() => {
    fetchFuelCombustionData();
  }, []);


  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Fuel Combustion Management
      </Typography>

      {/* Form */}
      <Box component="form" sx={{ mb: 4 }} onSubmit={handleSubmit}>
        {/* <Typography variant="h6" gutterBottom>
          Add Fuel Combustion Data
        </Typography> */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
            mb: 2,
          }}
        >
          <TextField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
          {/* <TextField
            label="Activity"
            name="activity"
            value={formData.activity}
            onChange={handleChange}
            required
          /> */}

          <ActivityInput
          name="activity"
          value={formData.activity}
          // onChange={(value) => handleChange("activity", value)}
          onChange={handleChange}
        />
          {/* <TextField
            label="Fuel"
            name="fuel"
            value={formData.fuel}
            onChange={handleChange}
            required
          /> */}
          <FuelInput
            name="fuel"
            value={formData.fuel}
            onChange={handleChange}
          />
          <TextField
            label="NCV"
            name="NCV"
            value={formData.NCV}
            onChange={handleChange}
            type="number"
            required
          />
          <TextField
            label="CO2"
            name="CO2"
            value={formData.CO2}
            onChange={handleChange}
            type="number"
            required
          />
          <TextField
            label="CH4"
            name="CH4"
            value={formData.CH4}
            onChange={handleChange}
            type="number"
            required
          />
          <TextField
            label="N2O"
            name="N2O"
            value={formData.N2O}
            onChange={handleChange}
            type="number"
            required
          />
          <TextField
            label="Fuel Density (Kg/L)"
            name="fuelDensityLiter"
            value={formData.fuelDensityLiter}
            onChange={handleChange}
            type="number"
          />
          <TextField
            label="Fuel Density (Kg/m³)"
            name="fuelDensityM3"
            value={formData.fuelDensityM3}
            onChange={handleChange}
            type="number"
          />
          <TextField
            label="CO2 Formula"
            name="CO2Formula"
            value={formData.CO2Formula}
            onChange={handleChange}
          />
          <TextField
            label="CH4 Formula"
            name="CH4Formula"
            value={formData.CH4Formula}
            onChange={handleChange}
          />
          <TextField
            label="N2O Formula"
            name="N2OFormula"
            value={formData.N2OFormula}
            onChange={handleChange}
          />
          {/* <TextField
            label="CO2 Assessment Type"
            name="CO2AssessmentType"
            value={formData.CO2AssessmentType}
            onChange={handleChange}
            required
          />
          <TextField
            label="CH4 Assessment Type"
            name="CH4AssessmentType"
            value={formData.CH4AssessmentType}
            onChange={handleChange}
            required
          />
          <TextField
            label="N2O Assessment Type"
            name="N2OAssessmentType"
            value={formData.N2OAssessmentType}
            onChange={handleChange}
            required
          /> */}

<TextField
  select
  label="CO2 Assessment Type"
  name="CO2AssessmentType"
  value={formData.CO2AssessmentType}
  onChange={handleChange}
  required
>
  <MenuItem value="AR5">AR5</MenuItem>
  <MenuItem value="AR6">AR6</MenuItem>
</TextField>
<TextField
  select
  label="CH4 Assessment Type"
  name="CH4AssessmentType"
  value={formData.CH4AssessmentType}
  onChange={handleChange}
  required
>
  <MenuItem value="AR5">AR5</MenuItem>
  <MenuItem value="AR6">AR6</MenuItem>
</TextField>
<TextField
  select
  label="N2O Assessment Type"
  name="N2OAssessmentType"
  value={formData.N2OAssessmentType}
  onChange={handleChange}
  required
>
  <MenuItem value="AR5">AR5</MenuItem>
  <MenuItem value="AR6">AR6</MenuItem>
</TextField>

          <TextField
            label="Source"
            name="source"
            value={formData.source}
            onChange={handleChange}
            required
          />
          <TextField
            label="Reference"
            name="reference"
            value={formData.reference}
            onChange={handleChange}
          />
        </Box>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
 {/* Filter Component */}
 <FilterFuelCombustion onFilter={handleFilter} />
      {/* Data Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Activity</TableCell>
              <TableCell>Fuel</TableCell>
              <TableCell>NCV</TableCell>
              <TableCell>CO2</TableCell>
              <TableCell>CH4</TableCell>
              <TableCell>N2O</TableCell>
              <TableCell>CO2_KgT</TableCell>
              <TableCell>CH4_KgT</TableCell>
              <TableCell>N2O_KgT</TableCell>
              <TableCell>CO2e_KgT</TableCell>
              <TableCell>Fuel Density (Kg/L)</TableCell>
              <TableCell>Fuel Density (Kg/m³)</TableCell>
              <TableCell>CO2_KgL</TableCell>
              <TableCell>CO2_Kgm3</TableCell>
              <TableCell>CH4_KgL</TableCell>
              <TableCell>CH4_Kgm3</TableCell>
              <TableCell>N2O_KgL</TableCell>
              <TableCell>N2O_Kgm3</TableCell>
              <TableCell>CO2e_KgL</TableCell>
              <TableCell>CO2e_Kgm3</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Reference</TableCell>
              <TableCell>Assessment Type</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fuelCombustionData.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.activity}</TableCell>
                <TableCell>{row.fuel}</TableCell>
                <TableCell>{row.NCV}</TableCell>
                <TableCell>{row.CO2}</TableCell>
                <TableCell>{row.CH4}</TableCell>
                <TableCell>{row.N2O}</TableCell>
                <TableCell>{row.CO2_KgT || "N/A"}</TableCell>
                <TableCell>{row.CH4_KgT || "N/A"}</TableCell>
                <TableCell>{row.N2O_KgT || "N/A"}</TableCell>
                <TableCell>{row.CO2e || "N/A"}</TableCell>
                <TableCell>{row.fuelDensityLiter || "N/A"}</TableCell>
                <TableCell>{row.fuelDensityM3 || "N/A"}</TableCell>
                <TableCell>{row.CO2_KgL || "N/A"}</TableCell>
                <TableCell>{row.CO2_Kgm3 || "N/A"}</TableCell>
                <TableCell>{row.CH4_KgL || "N/A"}</TableCell>
                <TableCell>{row.CH4_Kgm3 || "N/A"}</TableCell>
                <TableCell>{row.N2O_KgL || "N/A"}</TableCell>
                <TableCell>{row.N2O_Kgm3 || "N/A"}</TableCell>
                <TableCell>{row.CO2e_KgL || "N/A"}</TableCell>
                <TableCell>{row.CO2e_Kgm3 || "N/A"}</TableCell>
                <TableCell>{row.source}</TableCell>
                <TableCell>{row.reference}</TableCell>
                <TableCell>{row.assessmentType}</TableCell>
                <TableCell>{new Date(row.createdAt).toLocaleString()}</TableCell>
                <TableCell>
  <Box sx={{ display: 'flex', gap: 1 }}>
    <Button
      variant="outlined"
      onClick={() => handleOpenUpdateDialog(row)}
    >
      Update
    </Button>
    <Button
      variant="outlined"
      color="error"
      onClick={() => handleDelete(row)}
    >
      Delete
    </Button>
  </Box>
</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Update Dialog */}
      {selectedData && (
        <UpdateFuelCombustionDialog
          open={updateDialogOpen}
          handleClose={handleCloseUpdateDialog}
          data={selectedData}
          handleUpdate={handleUpdate}
        />
      )}
    </Box>
  );
};

export default FuelCombustion;
