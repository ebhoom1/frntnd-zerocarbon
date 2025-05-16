import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import axios from '../../../api/axios';

const AddIndustrialProcessDialog = ({ open, onClose }) => {
  const [form, setForm] = useState({
    industryType: '',
    emissionSource: '',
    CO2: '',
    CH4: '',
    N2O: '',
    CO2e: '',
    unit: '',
    source: '',
    reference: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/api/industrial-processes/add', form);
      onClose(); // close and trigger re-fetch
    } catch (err) {
      console.error('Error adding industrial process', err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add Industrial Process</DialogTitle>
      <DialogContent>
        {Object.keys(form).map((key) => (
          <TextField
            key={key}
            margin="dense"
            name={key}
            label={key}
            value={form[key]}
            onChange={handleChange}
            fullWidth
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddIndustrialProcessDialog;
