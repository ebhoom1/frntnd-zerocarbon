import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

const UpdateFuelCombustionDialog = ({
  open,
  handleClose,
  data,
  handleUpdate,
}) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const {
      NCV,
      CO2,
      CH4,
      N2O,
      fuelDensityLiter,
      fuelDensityM3,
      CO2Formula,
      CH4Formula,
      N2OFormula,
      category,
      activity,
      source,
      reference,
    } = formData;

    handleUpdate({
      id: formData._id,
      NCV,
      CO2,
      CH4,
      N2O,
      fuelDensityLiter,
      fuelDensityM3,
      CO2Formula: CO2Formula || "CO2",
      CH4Formula: CH4Formula || "CH4",
      N2OFormula: N2OFormula || "N2O",
      category,
      activity,
      source,
      reference,
    });

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Update Fuel Combustion Data</DialogTitle>
      <DialogContent
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 2,
          mt: 2,
        }}
      >
        <TextField
          label="Category"
          name="category"
          value={formData.category || ""}
          onChange={handleChange}
        />
        <TextField
          label="Activity"
          name="activity"
          value={formData.activity || ""}
          onChange={handleChange}
        />
        <TextField
          label="Source"
          name="source"
          value={formData.source || ""}
          onChange={handleChange}
        />
        <TextField
          label="Reference"
          name="reference"
          value={formData.reference || ""}
          onChange={handleChange}
        />
        <TextField
          label="NCV"
          name="NCV"
          value={formData.NCV || ""}
          onChange={handleChange}
          type="number"
        />
        <TextField
          label="CO2"
          name="CO2"
          value={formData.CO2 || ""}
          onChange={handleChange}
          type="number"
        />
        <TextField
          label="CH4"
          name="CH4"
          value={formData.CH4 || ""}
          onChange={handleChange}
          type="number"
        />
        <TextField
          label="N2O"
          name="N2O"
          value={formData.N2O || ""}
          onChange={handleChange}
          type="number"
        />
        <TextField
          label="Fuel Density (Kg/L)"
          name="fuelDensityLiter"
          value={formData.fuelDensityLiter || ""}
          onChange={handleChange}
          type="number"
        />
        <TextField
          label="Fuel Density (Kg/m³)"
          name="fuelDensityM3"
          value={formData.fuelDensityM3 || ""}
          onChange={handleChange}
          type="number"
        />
        <TextField
          label="CO2 Formula"
          name="CO2Formula"
          value={formData.CO2Formula || "CO2"}
          onChange={handleChange}
        />
        <TextField
          label="CH4 Formula"
          name="CH4Formula"
          value={formData.CH4Formula || "CH4"}
          onChange={handleChange}
        />
        <TextField
          label="N2O Formula"
          name="N2OFormula"
          value={formData.N2OFormula || "N2O"}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateFuelCombustionDialog;
