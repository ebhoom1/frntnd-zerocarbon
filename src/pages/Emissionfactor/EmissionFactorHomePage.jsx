// import React from 'react';
// import { Button, Box } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const EmissionFactorHomePage = () => {
//   const navigate = useNavigate();

//   return (
//     <Box 
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'flex-start',
//         height: '100vh',
//         backgroundColor: '#f5f5f5',
//         padding: 4,
//       }}
//     >
//       <Box 
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           gap: 3,
//           padding: 5,
//           backgroundColor: 'white',
//           boxShadow: 2,
//           borderRadius: 2,
//         }}
//       >
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => navigate('/adminemissionfactor')}
//           sx={{ width: 300 }}
//         >
//           Emission Factor - Stationary Combustion
//         </Button>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => navigate('/fuelcombustion')}
//           sx={{ width: 300 }}
//         >
//           Emission Factor - Fuel Combustion
//         </Button>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => navigate('/gwp-table')}
//           sx={{ width: 300 }}
//         >
//           GWP
//         </Button>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => navigate('/electricityemissionfactor')}
//           sx={{ width: 300 }}
//         >
//           Electricity Emission Factor
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default EmissionFactorHomePage;


import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import GasMeterIcon from '@mui/icons-material/GasMeter';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import BoltIcon from '@mui/icons-material/Bolt';

const EmissionFactorHomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
          gap: 4,
          padding: 5,
          backgroundColor: 'white',
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2, color: '#333' }}>
          Manage Emission Factors
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 4,
          }}
        >
          {/* Stationary Combustion */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: 200,
              height: 200,
              padding: 3,
              backgroundColor: '#ffebee',
              borderRadius: 2,
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
            onClick={() => navigate('/adminemissionfactor')}
          >
            <LocalFireDepartmentIcon sx={{ fontSize: 50, color: '#d32f2f' }} />
            <Typography variant="h7" mt={2}>
              Stationary Combustion
            </Typography>
          </Box>

          {/* Fuel Combustion */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: 200,
              height: 200,
              padding: 3,
              backgroundColor: '#e3f2fd',
              borderRadius: 2,
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
            onClick={() => navigate('/fuelcombustion')}
          >
            <GasMeterIcon sx={{ fontSize: 50, color: '#1e88e5' }} />
            <Typography variant="h7" mt={2}>
              Fuel Combustion
            </Typography>
          </Box>

          {/* GWP */}
          {/* <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: 200,
              height: 200,
              padding: 3,
              backgroundColor: '#e8f5e9',
              borderRadius: 2,
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
            onClick={() => navigate('/gwp-table')}
          >
            <NaturePeopleIcon sx={{ fontSize: 50, color: '#43a047' }} />
            <Typography variant="h7" mt={2}>
              GWP
            </Typography>
          </Box> */}

          {/* Electricity Emission Factor */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: 200,
              height: 200,
              padding: 3,
              backgroundColor: '#fff3e0',
              borderRadius: 2,
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
            onClick={() => navigate('/electricityemissionfactor')}
          >
            <BoltIcon sx={{ fontSize: 50, color: '#ffa726' }} />
            <Typography variant="h7" mt={2}>
              Electricity Factor
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EmissionFactorHomePage;
