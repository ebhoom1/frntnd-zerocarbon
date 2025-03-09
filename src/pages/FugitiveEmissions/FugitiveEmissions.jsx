import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import api from "../../api/axios";

function FugitiveEmissions() {
  // -------------------------
  // State Variables
  // -------------------------
  const [records, setRecords] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState(null);

  const [formData, setFormData] = useState({
    source: "",
    gasType: "",
    CO2: "",
    CH4: "",
    N2O: "",
    SF6: "",
    GWP_CO2e: "",
    unit: "",
    sourceReference: "",
    reference: "",
  });

  // -------------------------
  // Fetch All Records
  // -------------------------
  const fetchRecords = async () => {
    try {
      const res = await api.get("/api/fugitive-emissions/get");
      setRecords(res.data);
    } catch (err) {
      console.error("Error fetching records:", err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // -------------------------
  // Handlers
  // -------------------------
  const handleOpenDialog = (record = null) => {
    if (record) {
      // Edit mode
      setEditMode(true);
      setSelectedRecordId(record._id);
      setFormData({
        source: record.source ?? "",
        gasType: record.gasType ?? "",
        CO2: record.CO2 ?? "",
        CH4: record.CH4 ?? "",
        N2O: record.N2O ?? "",
        SF6: record.SF6 ?? "",
        GWP_CO2e: record.GWP_CO2e ?? "",
        unit: record.unit ?? "",
        sourceReference: record.sourceReference ?? "",
        reference: record.reference ?? "",
      });
    } else {
      // Add mode
      setEditMode(false);
      setSelectedRecordId(null);
      setFormData({
        source: "",
        gasType: "",
        CO2: "",
        CH4: "",
        N2O: "",
        SF6: "",
        GWP_CO2e: "",
        unit: "",
        sourceReference: "",
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -------------------------
  // Add or Update Record
  // -------------------------
  const handleSave = async () => {
    try {
      if (editMode) {
        await api.put(
          `/api/fugitive-emissions/update/${selectedRecordId}`,
          formData
        );
      } else {
        await api.post("/api/fugitive-emissions/add", formData);
      }
      fetchRecords();
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving record:", error);
    }
  };

  // -------------------------
  // Delete Record
  // -------------------------
  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/fugitive-emissions/delete/${id}`);
      fetchRecords();
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  // -------------------------
  // Render
  // -------------------------
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Fugitive Emissions</Typography>
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
                <TableCell>Source</TableCell>
                <TableCell>Gas Type</TableCell>
                <TableCell>CO2 (kg/unit)</TableCell>
                <TableCell>CH4 (kg/unit)</TableCell>
                <TableCell>N2O (kg/unit)</TableCell>
                <TableCell>SF6 (kg/unit)</TableCell>
                <TableCell>GWP (CO2e)</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record._id}>
                  <TableCell>{record.source}</TableCell>
                  <TableCell>{record.gasType}</TableCell>
                  <TableCell>{record.CO2}</TableCell>
                  <TableCell>{record.CH4}</TableCell>
                  <TableCell>{record.N2O}</TableCell>
                  <TableCell>{record.SF6}</TableCell>
                  <TableCell>{record.GWP_CO2e}</TableCell>
                  <TableCell>{record.unit}</TableCell>
                  <TableCell >
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{mr:1}}
                      onClick={() => handleOpenDialog(record)}
                    >
                      Update
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
                  <TableCell colSpan={9} align="center">
                    No records found
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
          <TextField
            margin="normal"
            name="source"
            label="Source"
            fullWidth
            value={formData.source}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            name="gasType"
            label="Gas Type"
            fullWidth
            value={formData.gasType}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            name="CO2"
            label="CO2 (kg/unit)"
            fullWidth
            value={formData.CO2}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            name="CH4"
            label="CH4 (kg/unit)"
            fullWidth
            value={formData.CH4}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            name="N2O"
            label="N2O (kg/unit)"
            fullWidth
            value={formData.N2O}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            name="SF6"
            label="SF6 (kg/unit)"
            fullWidth
            value={formData.SF6}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            name="GWP_CO2e"
            label="GWP CO2e"
            fullWidth
            value={formData.GWP_CO2e}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            name="unit"
            label="Unit"
            fullWidth
            value={formData.unit}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            name="sourceReference"
            label="Source Reference"
            fullWidth
            value={formData.sourceReference}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            name="reference"
            label="Reference"
            fullWidth
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

export default FugitiveEmissions;
