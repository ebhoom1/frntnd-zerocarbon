import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import axios from "../../../api/axios";

const UserCustomEmissionFactorDialog = ({ open, handleClose }) => {
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

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.post("/api/mobile-combustion/add", formData);

  
      handleClose(); // Close dialog
    } catch (err) {
      console.error("Error saving custom emission factor:", err);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Custom Vehicle Emission Factor</DialogTitle>
      <DialogContent>
        <TextField label="Vehicle Type" name="vehicleType" fullWidth margin="normal" value={formData.vehicleType} onChange={handleChange} />
        <TextField label="Fuel Type" name="fuelType" fullWidth margin="normal" value={formData.fuelType} onChange={handleChange} />
        <TextField label="NCV" name="NCV" fullWidth margin="normal" value={formData.NCV} onChange={handleChange} />
        <TextField label="CO2" name="CO2" fullWidth margin="normal" value={formData.CO2} onChange={handleChange} />
        <TextField label="CH4" name="CH4" fullWidth margin="normal" value={formData.CH4} onChange={handleChange} />
        <TextField label="N2O" name="N2O" fullWidth margin="normal" value={formData.N2O} onChange={handleChange} />
        <TextField label="CO2e" name="CO2e" fullWidth margin="normal" value={formData.CO2e} onChange={handleChange} />
        <TextField label="Unit" name="unit" fullWidth margin="normal" value={formData.unit} onChange={handleChange} />
        <TextField label="Source" name="source" fullWidth margin="normal" value={formData.source} onChange={handleChange} />
        <TextField label="Reference" name="reference" fullWidth margin="normal" value={formData.reference} onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserCustomEmissionFactorDialog;
