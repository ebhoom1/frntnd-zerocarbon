

import React, { useState, useEffect } from "react";
import {
  Select,
  FormControl,
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
import CustomAlert from "../../../src/components/Alert/Sweetalert";

const FuelCombustion = () => {
  const [alert, setAlert] = useState(null);

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
    source: "",
    reference: "IPCC",
  });

  const [assessmentType, setAssessmentType] = useState("AR6");
  const [fuelCombustionData, setFuelCombustionData] = useState([]);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleAssessmentTypeChange = (e) => {
    setAssessmentType(e.target.value);
    fetchFuelCombustionData();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/fuelCombustion/add", formData);
      setAlert({
        type: "success",
        title: "Success",
        text: response.data.message,
      });
      fetchFuelCombustionData();
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
        source: "",
        reference: "IPCC",
      });
    } catch (error) {
      setAlert({
        type: "error",
        title: "Error",
        text: error.response?.data?.message || "Submission failed!",
      });
    }
  };

  const fetchFuelCombustionData = async () => {
    try {
      const response = await axios.get("/api/fuelCombustion/all");
      const filteredData = response.data.data.map((item) => {
        const assessment = item.assessments.find(
          (assess) => assess.assessmentType === assessmentType
        );
        return { ...item, selectedAssessment: assessment || {} };
      });
      setFuelCombustionData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const handleUpdate = async (updatedData) => {
  //   try {
  //     const response= await axios.put(`/api/fuelCombustion/update/${updatedData._id}`, updatedData);
  //     console.log("update response:",response.data.error)
  //     fetchFuelCombustionData();
  //     alert("Fuel Combustion data updated successfully!");
  //   } catch (error) {
  //     alert("Error updating data: " + error.message);
  //   }
  // };

  const handleUpdate = async (updatedData) => {
    try {
      console.log("Update Payload:", updatedData);
      const response = await axios.put(
        `/api/fuelCombustion/update/${updatedData.id}`,
        updatedData
      );
      console.log("Update Response:", response.data.message);
      fetchFuelCombustionData();
      setAlert({
        type: "success",
        title: "Updated",
        text: response.data.message,
      });
    } catch (error) {
      console.error(
        "Error updating data:",
        error.response?.data || error.message
      );
      setAlert({
        type: "error",
        title: "Error",
        text: error.response?.data?.message || "Update failed!",
      });
    }
  };

  const handleDelete = async (data) => {
    setAlert({
      type: "warning",
      title: "Delete",
      text: "Are you sure you want to delete this record?",
      showCancel: true,
      confirmButtonText: "Yes, delete it!",
      onConfirm: async () => {
        try {
          await axios.delete(`/api/fuelCombustion/${data._id}`);
          setAlert({
            type: "success",
            title: "Deleted",
            text: "Fuel Combustion data deleted successfully!",
          });
          fetchFuelCombustionData();
        } catch (error) {
          setAlert({
            type: "error",
            title: "Error",
            text: error.response?.data?.message || "Deletion failed!",
          });
        }
      },
    });
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
  }, [assessmentType]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Fuel Combustion Management
      </Typography>
      {alert && <CustomAlert alert={alert} setAlert={setAlert} />}

      {/* Form */}
      <Box component="form" sx={{ mb: 4 }} onSubmit={handleSubmit}>
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
          <ActivityInput
            name="activity"
            value={formData.activity}
            onChange={handleChange}
          />
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

      <FilterFuelCombustion onFilter={handleFilter} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                "&:not(:last-child) td, &:not(:last-child) th": { border: 0 },
                height: "10px", // Set the height of the row
                "& td, & th": {
                  padding: "5px", // Reduce padding inside cells
                },
              }}
            >
              <TableCell colSpan={4}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <span style={{ fontWeight: "bold" }}>Assessment Type:</span>
                  <Select
                    value={assessmentType}
                    onChange={handleAssessmentTypeChange}
                    variant="standard"
                    disableUnderline
                    sx={{
                      "& .MuiSelect-select": {
                        padding: "0 8px",
                        background: "none",
                        border: "none",
                        outline: "none",
                        fontSize: "1rem",
                      },
                    }}
                  >
                    <MenuItem value="AR5">AR5</MenuItem>
                    <MenuItem value="AR6">AR6</MenuItem>
                  </Select>
                </Box>
              </TableCell>
              <TableCell colSpan={22}></TableCell>
            </TableRow>
            <TableRow
              sx={{
                "& td, & th": {
                  paddingTop: "5px", // Reduce padding inside cells
                },
                height: "20px", // Set the height of the row
              }}
            >
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
                <TableCell>
                  {row.selectedAssessment?.CO2_KgT || "N/A"}
                </TableCell>
                <TableCell>
                  {row.selectedAssessment?.CH4_KgT || "N/A"}
                </TableCell>
                <TableCell>
                  {row.selectedAssessment?.N2O_KgT || "N/A"}
                </TableCell>
                <TableCell>{row.selectedAssessment?.CO2e || "N/A"}</TableCell>
                <TableCell>{row.fuelDensityLiter || "N/A"}</TableCell>
                <TableCell>{row.fuelDensityM3 || "N/A"}</TableCell>
                <TableCell>
                  {row.selectedAssessment?.CO2_KgL || "N/A"}
                </TableCell>
                <TableCell>
                  {row.selectedAssessment?.CO2_Kgm3 || "N/A"}
                </TableCell>
                <TableCell>
                  {row.selectedAssessment?.CH4_KgL || "N/A"}
                </TableCell>
                <TableCell>
                  {row.selectedAssessment?.CH4_Kgm3 || "N/A"}
                </TableCell>
                <TableCell>
                  {row.selectedAssessment?.N2O_KgL || "N/A"}
                </TableCell>
                <TableCell>
                  {row.selectedAssessment?.N2O_Kgm3 || "N/A"}
                </TableCell>
                <TableCell>
                  {row.selectedAssessment?.CO2e_KgL || "N/A"}
                </TableCell>
                <TableCell>
                  {row.selectedAssessment?.CO2e_Kgm3 || "N/A"}
                </TableCell>
                {/* <TableCell>{row.source}</TableCell> */}
                <TableCell sx={{ minWidth: 250 }}>{row.source}</TableCell>
                <TableCell>{row.reference}</TableCell>
                <TableCell>{assessmentType}</TableCell>
                <TableCell>
                  {new Date(row.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
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
