


import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
} from '@mui/material';

import axios from '../../api/axios';
import UpdateDialog from './UpdateDialog';

const EmissionFactors = () => {
  const [formData, setFormData] = useState({
    country: '',
    regionGrid: '',
    emissionFactor: '',
    reference: '',
    yearlyValues: [
      {
        from: '',
        to: '',
        value: '',
      },
    ],
  });
  const [emissionFactors, setEmissionFactors] = useState([]);
  const [editData, setEditData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const fetchEmissionFactors = async () => {
    try {
      const response = await axios.get('/api/country-emission-factors/all'); // Update with your API endpoint
      setEmissionFactors(response.data.data);
    } catch (error) {
      console.error('Error fetching emission factors:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/country-emission-factors/add', formData); // Update with your API endpoint
      alert('Emission factor added successfully!');
      setFormData({
        country: '',
        regionGrid: '',
        emissionFactor: '',
        reference: '',
        yearlyValues: [{ from: '', to: '', value: '' }],
      });
      fetchEmissionFactors();
    } catch (error) {
      console.error('Error adding emission factor:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/country-emission-factors/delete/${id}`); // Update with your API endpoint
      alert('Emission factor deleted successfully!');
      fetchEmissionFactors();
    } catch (error) {
      console.error('Error deleting emission factor:', error);
    }
  };

  const openEditDialog = (factor) => {
    setEditData(factor);
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
    setEditData(null);
  };

  useEffect(() => {
    fetchEmissionFactors();
  }, []);

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Electricity Emission Factor
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <TextField
          fullWidth
          label="Country"
          value={formData.country}
          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Region Grid"
          value={formData.regionGrid}
          onChange={(e) => setFormData({ ...formData, regionGrid: e.target.value })}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Emission Factor (tCO2/MWh)"
          value={formData.emissionFactor}
          onChange={(e) => setFormData({ ...formData, emissionFactor: e.target.value })}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Reference"
          value={formData.reference}
          onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
          margin="normal"
        />
        {formData.yearlyValues.map((yearlyValue, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
            <TextField
            type='date'
              label="From"
              InputLabelProps={{
                shrink: true, // Keeps the label at the top
              }}
              placeholder="" // Removes the placeholder
              value={yearlyValue.from}
              onChange={(e) => {
                const updatedYearlyValues = [...formData.yearlyValues];
                updatedYearlyValues[index].from = e.target.value;
                setFormData({ ...formData, yearlyValues: updatedYearlyValues });
              }}
              required
            />
            <TextField
            type='date'
              label="To"
              InputLabelProps={{
                shrink: true, // Keeps the label at the top
              }}
              placeholder="" // Removes the placeholder
              value={yearlyValue.to}
              onChange={(e) => {
                const updatedYearlyValues = [...formData.yearlyValues];
                updatedYearlyValues[index].to = e.target.value;
                setFormData({ ...formData, yearlyValues: updatedYearlyValues });
              }}
              required
            />
            <TextField
              label="Value"
              type="number"
              value={yearlyValue.value}
              onChange={(e) => {
                const updatedYearlyValues = [...formData.yearlyValues];
                updatedYearlyValues[index].value = e.target.value;
                setFormData({ ...formData, yearlyValues: updatedYearlyValues });
              }}
              required
            />
          </Box>
        ))}


        <Box sx={{ mb: 2 }}>
        <Button
          variant="outlined"
          onClick={() =>
            setFormData({
              ...formData,
              yearlyValues: [...formData.yearlyValues, { from: '', to: '', value: '' }],
            })
          }
        >
          Add Yearly Value
        </Button>
        </Box> 
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Country</TableCell>
              <TableCell>Region Grid</TableCell>
              <TableCell>Emission Factor</TableCell>
              <TableCell>Reference</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Values</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {emissionFactors.map((factor) => (
              <TableRow key={factor._id}>
                <TableCell>{factor.country}</TableCell>
                <TableCell>{factor.regionGrid}</TableCell>
                <TableCell>{factor.emissionFactor}</TableCell>
                <TableCell>{factor.reference}</TableCell>
                <TableCell  sx={{ minWidth: 150 }}>
                  {factor.yearlyValues.map((year, idx) => (
                    <div key={idx}>{year.periodLabel}</div>
                  ))}
                </TableCell>
                <TableCell>
                  {factor.yearlyValues.map((year, idx) => (
                    <div key={idx}>{year.value}</div>
                  ))}
                </TableCell>
                <TableCell>
                  {factor.unit}
                </TableCell>
                <TableCell>{new Date(factor.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    onClick={() => openEditDialog(factor)}
                    sx={{ mr: 1 }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(factor._id)}
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
      {editData && (
        <UpdateDialog
          open={openDialog}
          onClose={closeDialog}
          editData={editData}
          setEditData={setEditData}
          fetchEmissionFactors={fetchEmissionFactors}
        />
      )}
    </Container>
  );
};

export default EmissionFactors;
