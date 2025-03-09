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
import api from "../../api/axios";

function EndOfLifeTreatment() {
  // -------------------------
  // State Variables
  // -------------------------
  const [records, setRecords] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState(null);

  const [formData, setFormData] = useState({
    productService: "",
    category: "",
    endOfLifeTreatment: "",
    CO2: "",
    CH4: "",
    N2O: "",
    CO2e: "",
    unit: "",
    source: "",
  });

  // -------------------------
  // Fetch All Records
  // -------------------------
  const fetchRecords = async () => {
    try {
      const res = await api.get("/api/end-of-life-treatment/get");
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
        productService: record.productService ?? "",
        category: record.category ?? "",
        endOfLifeTreatment: record.endOfLifeTreatment ?? "",
        CO2: record.CO2 ?? "",
        CH4: record.CH4 ?? "",
        N2O: record.N2O ?? "",
        CO2e: record.CO2e ?? "",
        unit: record.unit ?? "",
        source: record.source ?? "",
      });
    } else {
      // Add mode
      setEditMode(false);
      setSelectedRecordId(null);
      setFormData({
        productService: "",
        category: "",
        endOfLifeTreatment: "",
        CO2: "",
        CH4: "",
        N2O: "",
        CO2e: "",
        unit: "",
        source: "",
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
          `/api/end-of-life-treatment/update/${selectedRecordId}`,
          formData
        );
      } else {
        const res=await api.post("/api/end-of-life-treatment/add", formData);
        console.log(res.data);

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
      await api.delete(`/api/end-of-life-treatment/delete/${id}`);
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
          <Typography variant="h6">End-of-Life Treatment</Typography>
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
                <TableCell>Product/Service</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>End-of-Life Treatment</TableCell>
                <TableCell>CO2 (kg/unit)</TableCell>
                <TableCell>CH4 (kg/unit)</TableCell>
                <TableCell>N2O (kg/unit)</TableCell>
                <TableCell>CO2e (kg/unit)</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record._id}>
                  <TableCell>{record.productService}</TableCell>
                  <TableCell>{record.category}</TableCell>
                  <TableCell>{record.endOfLifeTreatment}</TableCell>
                  <TableCell>{record.CO2}</TableCell>
                  <TableCell>{record.CH4}</TableCell>
                  <TableCell>{record.N2O}</TableCell>
                  <TableCell>{record.CO2e}</TableCell>
                  <TableCell>{record.unit}</TableCell>
                  <TableCell>{record.source}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ mb: 1 }}
                      onClick={() => handleOpenDialog(record)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => handleDelete(record._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {records.length === 0 && (
                <TableRow>
                  <TableCell colSpan={10} align="center">
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
            name="productService"
            label="Product/Service"
            fullWidth
            value={formData.productService}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            name="category"
            label="Category"
            fullWidth
            value={formData.category}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            name="endOfLifeTreatment"
            label="End-of-Life Treatment (e.g., Landfill, Incineration, Recycling)"
            fullWidth
            value={formData.endOfLifeTreatment}
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
            name="CO2e"
            label="CO2e (kg/unit)"
            fullWidth
            value={formData.CO2e}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            name="unit"
            label="Unit (e.g., kg/T)"
            fullWidth
            value={formData.unit}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            name="source"
            label="Source"
            fullWidth
            value={formData.source}
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

export default EndOfLifeTreatment;
