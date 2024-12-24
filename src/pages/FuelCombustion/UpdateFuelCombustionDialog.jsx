import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

const UpdateFuelCombustionDialog = ({ open, handleClose, data, handleUpdate }) => {
  const [formData, setFormData] = useState({});

  // Helper function to parse the `assessmentType` field
  const parseAssessmentType = (assessmentType) => {
    const parsed = {
      CO2Formula: "CO2",
      CH4Formula: "CH4",
      N2OFormula: "N2O",
      CO2AssessmentType: "",
      CH4AssessmentType: "",
      N2OAssessmentType: "",
    };

    if (assessmentType) {
      const matches = assessmentType.match(/CO2:\s*(\w+),\s*CH4:\s*(\w+),\s*N2O:\s*(\w+)/);
      if (matches) {
        parsed.CO2AssessmentType = matches[1];
        parsed.CH4AssessmentType = matches[2];
        parsed.N2OAssessmentType = matches[3];
      }
    }

    return parsed;
  };

  // Initialize formData with parsed assessmentType
  useEffect(() => {
    if (data) {
      const { assessmentType, ...rest } = data;
      setFormData({
        ...rest,
        ...parseAssessmentType(assessmentType),
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const {
      CO2Formula,
      CH4Formula,
      N2OFormula,
      CO2AssessmentType,
      CH4AssessmentType,
      N2OAssessmentType,
      ...rest
    } = formData;

    // Create an updated assessmentType for submission
    const updatedAssessmentType = `CO2: ${CO2AssessmentType}, CH4: ${CH4AssessmentType}, N2O: ${N2OAssessmentType}`;

    // Send all required fields in req.body
    handleUpdate({
      ...rest,
      CO2Formula,
      CH4Formula,
      N2OFormula,
      CO2AssessmentType,
      CH4AssessmentType,
      N2OAssessmentType,
      assessmentType: updatedAssessmentType, // Also include the combined assessmentType if needed
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
        <TextField sx={{mt:2}} label="Category" name="category" value={formData.category || ""} onChange={handleChange} />
        <TextField label="Activity" name="activity" value={formData.activity || ""} onChange={handleChange} />
        <TextField label="Fuel" name="fuel" value={formData.fuel || ""} onChange={handleChange} />
        <TextField label="NCV" name="NCV" value={formData.NCV || ""} onChange={handleChange} type="number" />
        <TextField label="CO2" name="CO2" value={formData.CO2 || ""} onChange={handleChange} type="number" />
        <TextField label="CH4" name="CH4" value={formData.CH4 || ""} onChange={handleChange} type="number" />
        <TextField label="N2O" name="N2O" value={formData.N2O || ""} onChange={handleChange} type="number" />
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
        <TextField label="CO2 Formula" name="CO2Formula" value={formData.CO2Formula || ""} onChange={handleChange} />
        <TextField label="CH4 Formula" name="CH4Formula" value={formData.CH4Formula || ""} onChange={handleChange} />
        <TextField label="N2O Formula" name="N2OFormula" value={formData.N2OFormula || ""} onChange={handleChange} />
        {/* <TextField
          label="CO2 Assessment Type"
          name="CO2AssessmentType"
          value={formData.CO2AssessmentType || ""}
          onChange={handleChange}
        />
        <TextField
          label="CH4 Assessment Type"
          name="CH4AssessmentType"
          value={formData.CH4AssessmentType || ""}
          onChange={handleChange}
        />
        <TextField
          label="N2O Assessment Type"
          name="N2OAssessmentType"
          value={formData.N2OAssessmentType || ""}
          onChange={handleChange}
        /> */}
        <TextField
  select
  label="CO2 Assessment Type"
  name="CO2AssessmentType"
  value={formData.CO2AssessmentType}
  onChange={handleChange}
  
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
  
>
  <MenuItem value="AR5">AR5</MenuItem>
  <MenuItem value="AR6">AR6</MenuItem>
</TextField>

        <TextField label="Source" name="source" value={formData.source || ""} onChange={handleChange} />
        <TextField label="Reference" name="reference" value={formData.reference || ""} onChange={handleChange} />
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
