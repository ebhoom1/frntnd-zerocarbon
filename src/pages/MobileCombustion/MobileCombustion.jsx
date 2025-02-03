import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import CustomAlert from "../../components/Alert/Sweetalert";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

function MobileCombustion() {
  // -------------------------
  // State
  // -------------------------
  const [records, setRecords] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [alert, setAlert] = useState(null); // State for alert messages

  // Form fields for add/update
  const [formData, setFormData] = useState({
    vehicleType: "",
    fuelType: "",
    NCV: "",
    CO2: "",
    CH4: "",
    N2O: "",
    CO2e: "",
    unit: "",
    source: "",
    reference: "",
  });

  // -------------------------
  // Fetch Data on Mount
  // -------------------------
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/mobile-combustion/get");
      // response structure: { message: "data get successfully", records: [...] }
      setRecords(res.data.records);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  // -------------------------
  // Handlers
  // -------------------------
  const handleOpenDialog = (record = null) => {
    if (record) {
      // Edit mode
      setEditMode(true);
      setSelectedRecordId(record._id);
      // Populate form with existing data
      setFormData({
        vehicleType: record.vehicleType || "",
        fuelType: record.fuelType || "",
        NCV: record.NCV || "",
        CO2: record.CO2 || "",
        CH4: record.CH4 || "",
        N2O: record.N2O || "",
        CO2e: record.CO2e || "",
        unit: record.unit || "",
        source: record.source || "",
        reference: record.reference || "",
      });
    } else {
      // Add mode
      setEditMode(false);
      setSelectedRecordId(null);
      // Reset form
      setFormData({
        vehicleType: "",
        fuelType: "",
        NCV: "",
        CO2: "",
        CH4: "",
        N2O: "",
        CO2e: "",
        unit: "",
        source: "",
        reference: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // -------------------------
  // Add or Update
  // -------------------------
  const handleSave = async () => {
    try {
      if (editMode) {
        await axios.put(
          `/api/mobile-combustion/update/${selectedRecordId}`,
          formData
        );
        setAlert({
          type: "success",
          title: "Updated",
          text: "Record updated successfully!",
        });
      } else {
        await axios.post("/api/mobile-combustion/add", formData);
        setAlert({
          type: "success",
          title: "Added",
          text: "New record added successfully!",
        });
      }
      fetchData();
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving record:", error);
      setAlert({
        type: "error",
        title: "Save Error",
        text: "Failed to save the record.",
      });
    }
  };

  // -------------------------
  // Delete
  // -------------------------
  const handleDelete = async (id) => {
    setAlert({
      type: "warning",
      title: "Are you sure?",
      text: "This action cannot be undone.",
      showCancel: true,
      confirmButtonText: "Yes, delete it!",
      onConfirm: async () => {
        try {
          await axios.delete(`/api/mobile-combustion/delete/${id}`);
          setAlert({
            type: "success",
            title: "Deleted",
            text: "Record deleted successfully!",
          });
          fetchData();
        } catch (error) {
          console.error("Error deleting record:", error);
          setAlert({
            type: "error",
            title: "Delete Error",
            text: "Failed to delete the record.",
          });
        }
      },
    });
  };

  // -------------------------
  // Render
  // -------------------------
  return (
    <>
      {/* Custom Alert Component */}
      <CustomAlert alert={alert} setAlert={setAlert} />

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Mobile Combustion Data</Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 4 }}>
        <Button variant="contained" onClick={() => handleOpenDialog(null)}>
          Add New Record
        </Button>

        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Vehicle Type</TableCell>
                <TableCell>Fuel Type</TableCell>
                <TableCell>NCV (MJ/kg)</TableCell>
                <TableCell>CO2 (kg/T)</TableCell>
                <TableCell>CH4 (kg/T)</TableCell>
                <TableCell>N2O (kg/T)</TableCell>
                <TableCell>CO2e (kg/T)</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Reference</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {records.map((record) => (
                <TableRow key={record._id}>
                  <TableCell>{record.vehicleType}</TableCell>
                  <TableCell>{record.fuelType}</TableCell>
                  <TableCell>{record.NCV}</TableCell>
                  <TableCell>{record.CO2}</TableCell>
                  <TableCell>{record.CH4}</TableCell>
                  <TableCell>{record.N2O}</TableCell>
                  <TableCell>{record.CO2e}</TableCell>
                  <TableCell>{record.unit}</TableCell>
                  <TableCell>{record.source}</TableCell>
                  <TableCell>{record.reference}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleOpenDialog(record)}
                      sx={{ mb: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(record._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {records.length === 0 && (
                <TableRow>
                  <TableCell colSpan={11} align="center">
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Dialog for Add/Edit */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{editMode ? "Edit Record" : "Add New Record"}</DialogTitle>
        <DialogContent>
          {/* We’ll use Material-UI TextFields for each property */}
          <TextField
            label="Vehicle Type"
            name="vehicleType"
            fullWidth
            margin="normal"
            value={formData.vehicleType}
            onChange={handleChange}
          />
          <TextField
            label="Fuel Type"
            name="fuelType"
            fullWidth
            margin="normal"
            value={formData.fuelType}
            onChange={handleChange}
          />
          <TextField
            label="NCV"
            name="NCV"
            type="number"
            fullWidth
            margin="normal"
            value={formData.NCV}
            onChange={handleChange}
          />
          <TextField
            label="CO2"
            name="CO2"
            type="number"
            fullWidth
            margin="normal"
            value={formData.CO2}
            onChange={handleChange}
          />
          <TextField
            label="CH4"
            name="CH4"
            type="number"
            fullWidth
            margin="normal"
            value={formData.CH4}
            onChange={handleChange}
          />
          <TextField
            label="N2O"
            name="N2O"
            type="number"
            fullWidth
            margin="normal"
            value={formData.N2O}
            onChange={handleChange}
          />
          <TextField
            label="CO2e"
            name="CO2e"
            type="number"
            fullWidth
            margin="normal"
            value={formData.CO2e}
            onChange={handleChange}
          />
          <TextField
            label="Unit"
            name="unit"
            fullWidth
            margin="normal"
            value={formData.unit}
            onChange={handleChange}
          />
          <TextField
            label="Source"
            name="source"
            fullWidth
            margin="normal"
            value={formData.source}
            onChange={handleChange}
          />
          <TextField
            label="Reference"
            name="reference"
            fullWidth
            margin="normal"
            value={formData.reference}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {editMode ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MobileCombustion;
