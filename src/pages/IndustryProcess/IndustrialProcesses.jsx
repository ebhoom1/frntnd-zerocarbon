// src/App.jsx
import React, { useEffect, useState } from 'react';
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
  TextField
} from '@mui/material';
import api from '../../api/axios'; 

function App() {
  // --------------------------
  // 1. State
  // --------------------------
  const [records, setRecords] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState(null);

  const [formData, setFormData] = useState({
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

  // --------------------------
  // 2. Fetch All Records
  // --------------------------
  const fetchRecords = async () => {
    try {
      // GET /api/industrial-processes/get
      const res = await api.get('/api/industrial-processes/get');
      setRecords(res.data); // The controller returns an array directly
    } catch (err) {
      console.error('Error fetching records:', err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // --------------------------
  // 3. Handlers
  // --------------------------
  const handleOpenDialog = (record = null) => {
    if (record) {
      // Edit mode
      setEditMode(true);
      setSelectedRecordId(record._id);
      setFormData({
        industryType: record.industryType ?? '',
        emissionSource: record.emissionSource ?? '',
        CO2: record.CO2 ?? '',
        CH4: record.CH4 ?? '',
        N2O: record.N2O ?? '',
        CO2e: record.CO2e ?? '',
        unit: record.unit ?? '',
        source: record.source ?? '',
        reference: record.reference ?? ''
      });
    } else {
      // Add mode
      setEditMode(false);
      setSelectedRecordId(null);
      setFormData({
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
      [name]: value
    }));
  };

  // --------------------------
  // 4. Add or Update Record
  // --------------------------
  const handleSave = async () => {
    try {
      if (editMode) {
        // PUT /api/industrial-processes/update/:id
        await api.put(`/api/industrial-processes/update/${selectedRecordId}`, formData);
      } else {
        // POST /api/industrial-processes/add
        await api.post('/api/industrial-processes/add', formData);
      }
      fetchRecords();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving record:', error);
    }
  };

  // --------------------------
  // 5. Delete Record
  // --------------------------
  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/industrial-processes/delete/${id}`);
      fetchRecords();
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  // --------------------------
  // 6. Render
  // --------------------------
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Industrial Processes</Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 4 }}>
        <Button variant="contained" onClick={() => handleOpenDialog(null)}>
          Add New Records
        </Button>

        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Industry Type</TableCell>
                <TableCell>Emission Source</TableCell>
                <TableCell>CO2 (kg/unit)</TableCell>
                <TableCell>CH4 (kg/unit)</TableCell>
                <TableCell>N2O (kg/unit)</TableCell>
                <TableCell>CO2e (kg/unit)</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Reference</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record._id}>
                  <TableCell>{record.industryType}</TableCell>
                  <TableCell>{record.emissionSource}</TableCell>
                  <TableCell>{record.CO2}</TableCell>
                  <TableCell>{record.CH4}</TableCell>
                  <TableCell>{record.N2O}</TableCell>
                  <TableCell>{record.CO2e}</TableCell>
                  <TableCell>{record.unit}</TableCell>
                  <TableCell>{record.source}</TableCell>
                  <TableCell>{record.reference}</TableCell>
                  <TableCell align="center">
                    <Button 
                      variant="outlined" 
                      size="small" 
                      onClick={() => handleOpenDialog(record)}
                      sx={{ mb: 1 }}
                    >
                      Edit
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
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{editMode ? 'Edit Record' : 'Add New Record'}</DialogTitle>
        <DialogContent>
          <TextField
            name="industryType"
            label="Industry Type"
            fullWidth
            margin='normal'
            value={formData.industryType}
            onChange={handleChange}
          />
          <TextField
            name="emissionSource"
            label="Emission Source"
            fullWidth
            margin='normal'
            value={formData.emissionSource}
            onChange={handleChange}
          />
          <TextField
            name="CO2"
            label="CO2 (kg/unit)"
            fullWidth
            margin='normal'
            value={formData.CO2}
            onChange={handleChange}
          />
          <TextField
            name="CH4"
            label="CH4 (kg/unit)"
            fullWidth
            margin='normal'
            value={formData.CH4}
            onChange={handleChange}
          />
          <TextField
            name="N2O"
            label="N2O (kg/unit)"
            fullWidth
            margin='normal'
            value={formData.N2O}
            onChange={handleChange}
          />
          <TextField
            name="CO2e"
            label="CO2e (kg/unit)"
            fullWidth
            margin='normal'
            value={formData.CO2e}
            onChange={handleChange}
          />
          <TextField
            name="unit"
            label="Unit"
            fullWidth
            margin='normal'
            value={formData.unit}
            onChange={handleChange}
          />
          <TextField
            name="source"
            label="Source"
            fullWidth
            margin='normal'
            value={formData.source}
            onChange={handleChange}
          />
          <TextField
            name="reference"
            label="Reference"
            fullWidth
            margin='normal'
            value={formData.reference}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {editMode ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default App;
