import React from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EmissionFactorHomePage = () => {
  const navigate = useNavigate();

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
          onClick={() => navigate('/adminemissionfactor')}
          sx={{ width: 300 }}
        >
          Emission Factor - Stationary Combustion
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/gwp-table')}
          sx={{ width: 300 }}
        >
          GWP
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/fuelcombustion')}
          sx={{ width: 300 }}
        >
          Fuel Combustion
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/electricityemissionfactor')}
          sx={{ width: 300 }}
        >
          Electricity Emission Factor
        </Button>
      </Box>
    </Box>
  );
};

export default EmissionFactorHomePage;
