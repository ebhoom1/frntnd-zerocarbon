import React from 'react';
import { Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setSelectedItem } from '../../redux/features/sidebar/SidebarSlice';

const ClientsHomePage = () => {
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        padding: 4,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          padding: 5,
          backgroundColor: 'white',
          boxShadow: 2,
          borderRadius: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            dispatch(setSelectedItem({ id: 'registeredClients', label: 'Registered Clients' }))
          }
          sx={{ width: 300 }}
        >
          Registered Clients
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            dispatch(setSelectedItem({ id: 'activeClients', label: 'Active Clients' }))
          }
          sx={{ width: 300 }}
        >
          Active Clients
        </Button>
      </Box>
    </Box>
  );
};

export default ClientsHomePage;
