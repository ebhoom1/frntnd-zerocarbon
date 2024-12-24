import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import axios from '../../api/axios';

const UpdateDialog = ({ open, onClose, editData, setEditData, fetchEmissionFactors }) => {
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`/api/country-emission-factors/update/${editData._id}`, editData); // Update with your API endpoint
      alert('Emission factor updated successfully!');
      onClose();
      fetchEmissionFactors();
    } catch (error) {
      console.error('Error updating emission factor:', error);
    }
  };

  const handleYearlyValuesChange = (index, field, value) => {
    const updatedYearlyValues = [...editData.yearlyValues];
    updatedYearlyValues[index][field] = value;
    setEditData({ ...editData, yearlyValues: updatedYearlyValues });
  };

  const addYearlyValueField = () => {
    setEditData({
      ...editData,
      yearlyValues: [...editData.yearlyValues, { year: '', value: '' }],
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Emission Factor</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Country"
          value={editData?.country || ''}
          onChange={(e) => setEditData({ ...editData, country: e.target.value })}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Region Grid"
          value={editData?.regionGrid || ''}
          onChange={(e) => setEditData({ ...editData, regionGrid: e.target.value })}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Emission Factor (tCO2/MWh)"
          value={editData?.emissionFactor || ''}
          onChange={(e) => setEditData({ ...editData, emissionFactor: e.target.value })}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Reference"
          value={editData?.reference || ''}
          onChange={(e) => setEditData({ ...editData, reference: e.target.value })}
          margin="normal"
        />
        {editData?.yearlyValues.map((yearlyValue, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
            <TextField
              label="Year"
              value={yearlyValue.year}
              onChange={(e) => handleYearlyValuesChange(index, 'year', e.target.value)}
              required
            />
            <TextField
              label="Value"
              type="number"
              value={yearlyValue.value}
              onChange={(e) => handleYearlyValuesChange(index, 'value', e.target.value)}
              required
            />
          </Box>
        ))}
        <Button variant="outlined" onClick={addYearlyValueField} sx={{ mb: 2 }}>
          Add Yearly Value
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateDialog;
