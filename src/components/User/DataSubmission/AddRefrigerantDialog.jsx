import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';
import axios from '../../../api/axios';

const AddRefrigerantDialog = ({ open, onClose }) => {
  const [form, setForm] = useState({
    source: '',
    gasType: '',
    CO2: '',
    CH4: '',
    N2O: '',
    SF6: '',
    GWP_CO2e: '',
    unit: '',
    sourceReference: '',
    reference: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/api/fugitive-emissions/add', form);
      onClose(form.gasType); // return the new refrigerant name
    } catch (err) {
      console.error('Error adding refrigerant', err);
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>Add New Refrigerant</DialogTitle>
      <DialogContent>
        <TextField
          name="gasType"
          label="Gas Type (e.g., HFC-134a)"
          value={form.gasType}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
        />
        <TextField
          name="source"
          label="Emission Source"
          value={form.source}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          name="CO2"
          label="CO₂ Emission (kg/unit)"
          value={form.CO2}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          name="CH4"
          label="CH₄ Emission (kg/unit)"
          value={form.CH4}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          name="N2O"
          label="N₂O Emission (kg/unit)"
          value={form.N2O}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          name="SF6"
          label="SF₆ Emission (kg/unit)"
          value={form.SF6}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          name="GWP_CO2e"
          label="GWP (CO₂e)"
          value={form.GWP_CO2e}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          name="unit"
          label="Measurement Unit (e.g., kg, liters)"
          value={form.unit}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          name="sourceReference"
          label="Source Reference"
          value={form.sourceReference}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          name="reference"
          label="Reference"
          value={form.reference}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRefrigerantDialog;
