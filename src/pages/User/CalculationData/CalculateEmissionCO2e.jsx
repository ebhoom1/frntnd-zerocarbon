
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import axios from "../../../api/axios";
import generateEmissionReport from "./EmissionReport"; // Import the report generator

const EmissionManager = () => {
  const userId = useSelector((state) => state.auth.user?.id);
  const companyName = useSelector((state) => state.auth.user?.companyName);

  const [emissionData, setEmissionData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    periodOfDate: "monthly",
    startDate: "",
    consumedData: 0,
    assessmentType: "AR6", 
    uncertaintyLevelConsumedData: 0,
    uncertaintyLevelEmissionFactor: 0,
    comments: "",
    fuelSupplier: "",
    document: null,
  });
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [editing, setEditing] = useState(false);

  // Fetch data by userId
  const fetchEmissionData = async () => {
    try {
      const response = await axios.get(`/api/calculate-emission/${userId}`);
      setEmissionData(response.data.data);
    } catch (error) {
      console.error("Error fetching emission data:", error);
    }
  };

  useEffect(() => {
    fetchEmissionData();
  }, [userId]);

  // Handle input changes in the form
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        document: file,
      }));
      setUploadedFileName(file.name);
    }
  };

  // Remove uploaded file
  const removeFile = () => {
    setFormData((prev) => ({
      ...prev,
      document: null,
    }));
    setUploadedFileName(null);
  };

  // Open dialog for adding/editing
  const openAddEditDialog = (data = null) => {
    setEditing(!!data);
    setFormData(
      data
        ? {
            ...data,
            document: null,
          }
        : {
            periodOfDate: "monthly",
            startDate: "",
            consumedData: 0,
            assessmentType: "AR6",
            uncertaintyLevelConsumedData: 0,
            uncertaintyLevelEmissionFactor: 0,
            comments: "",
            fuelSupplier: "",
            document: null,
          }
    );
    setUploadedFileName(null);
    setOpenDialog(true);
  };

  // Handle save or update
  const handleSaveOrUpdate = async () => {
    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "document" || formData[key]) {
        payload.append(key, formData[key]);
      }
    });

    if (uploadedFileName && !formData.document) {
      payload.append("document", uploadedFileName);
    }

    payload.append("userId", userId);

    try {
      if (editing) {
        await axios.put(`/api/calculate-emission/${userId}`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(`/api/calculate-emission`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      fetchEmissionData();
      setOpenDialog(false);
    } catch (error) {
      console.error("Error saving or updating emission data:", error);
    }
  };

  // Handle delete
  const handleDelete = async (startDate, endDate) => {
    try {
      await axios.delete(`/api/calculate-emission/${userId}`, {
        data: { startDate, endDate },
      });
      fetchEmissionData();
    } catch (error) {
      console.error("Error deleting emission data:", error);
    }
  };

  return (
    <Box>
      <Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  }}
>
  <Button
    variant="contained"
    color="primary"
    onClick={() => openAddEditDialog()}
  >
    Add Emission Data
  </Button>
  <Button
    variant="contained"
    color="primary"
    onClick={() => generateEmissionReport(emissionData, companyName)}
  >
    Download Report
  </Button>
</Box>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Consumed Data</TableCell>
              <TableCell>Assessment Type</TableCell>
              <TableCell>Period</TableCell>
              <TableCell>Comments</TableCell>
              <TableCell>Fuel Supplier</TableCell>
              <TableCell>Emission CO2</TableCell>
              <TableCell>Emission CH4</TableCell>
              <TableCell>Emission N2O</TableCell>
              <TableCell>Emission CO2e</TableCell>
              <TableCell>Standards</TableCell>
              <TableCell>Document</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {emissionData.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.startDate}</TableCell>
                <TableCell>{row.endDate}</TableCell>
                <TableCell>{row.consumedData}</TableCell>
                <TableCell>{row.assessmentType}</TableCell>
                <TableCell>{row.periodOfDate}</TableCell>
                <TableCell>{row.comments}</TableCell>
                <TableCell>{row.fuelSupplier}</TableCell>
                <TableCell>{row.emissionCO2}</TableCell>
                <TableCell>{row.emissionCH4}</TableCell>
                <TableCell>{row.emissionN2O}</TableCell>
                <TableCell>{row.emissionCO2e}</TableCell>
                <TableCell>{row.standards}</TableCell>
                <TableCell>
                  {row.documents ? (
                    <a
                      href={row.documents}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Document
                    </a>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {/* <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => openAddEditDialog(row)}
                    >
                      Edit
                    </Button> */}
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(row.startDate, row.endDate)}
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

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {editing ? "Edit Emission Data" : "Add Emission Data"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Period of Date"
            select
            value={formData.periodOfDate}
            onChange={(e) => handleInputChange("periodOfDate", e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="3-months">3 Months</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </TextField>

         
           <TextField
            label="Start Date"
            type="date"
            value={formData.startDate}
            onChange={(e) => handleInputChange("startDate", e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Consumed Data"
            type="number"
            value={formData.consumedData}
            onChange={(e) => handleInputChange("consumedData", e.target.value)}
            fullWidth
            margin="normal"
          />


          <TextField
            label="Assessment Type"
            select
            value={formData.assessmentType}
            onChange={(e) => handleInputChange("assessmentType", e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="AR6">AR6</MenuItem>
            <MenuItem value="AR5">AR5</MenuItem>
          </TextField>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Note: Assessment type is set to AR6 by default. You can change it to
            AR5 if needed.
          </Typography>
          <TextField
            label="Uncertainty Level (Consumed Data) (%)"
            type="number"
            value={formData.uncertaintyLevelConsumedData}
            onChange={(e) =>
              handleInputChange("uncertaintyLevelConsumedData", e.target.value)
            }
            fullWidth
            margin="normal"
          />

          <TextField
            label="Uncertainty Level (Emission Factor) (%)"
            type="number"
            value={formData.uncertaintyLevelEmissionFactor}
            onChange={(e) =>
              handleInputChange(
                "uncertaintyLevelEmissionFactor",
                e.target.value
              )
            }
            fullWidth
            margin="normal"
          />

          <TextField
            label="Comments"
            value={formData.comments}
            onChange={(e) => handleInputChange("comments", e.target.value)}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Fuel Supplier"
            value={formData.fuelSupplier}
            onChange={(e) => handleInputChange("fuelSupplier", e.target.value)}
            fullWidth
            margin="normal"
          />

          <Box
            sx={{ display: "flex", alignItems: "center", gap: 2, marginTop: 2 }}
          >
            <Button variant="contained" component="label">
              Upload Document
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            {uploadedFileName && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <span>{uploadedFileName}</span>
                <IconButton onClick={removeFile} color="error" size="small">
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveOrUpdate} color="primary">
            {editing ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmissionManager;
