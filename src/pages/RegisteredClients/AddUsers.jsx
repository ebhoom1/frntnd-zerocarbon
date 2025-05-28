


import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, MenuItem, Box, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from '../../api/axios';
import RegisterUserDialog from './userRegister/RegisterUserDialog';

const AddUser = () => {
  const user = useSelector((state) => state.auth.user);

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  useEffect(() => {
    const fetchAdminUsers = async () => {
      try {
        const response = await axios.get('/api/admin/registeredusers');
        const formattedData = response.data.map((form, index) => ({
          id: index + 1,
          name: form.userName,
          email: form.email,
          phone: form.contactNumber,
          companyName: form.companyName,
          
        }));
        setRows(formattedData);
      } catch (error) {
        console.error('Error fetching completed forms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminUsers();
  }, []);

  

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'phone', headerName: 'Phone', width: 200 },
    { field: 'companyName', headerName: 'Company Name', width: 250 },
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        {(user?.userType === 'admin' || user?.userType === 'superAdmin') &&(
          <Button variant="contained" color="primary" onClick={handleOpenDialog}>
            Add User
          </Button>
        )}
      </Box>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          loading={loading}
        />
      </div>

      <RegisterUserDialog
        open={openDialog}
        onClose={handleCloseDialog}
        
      />
    </Box>
  );
};

export default AddUser;
