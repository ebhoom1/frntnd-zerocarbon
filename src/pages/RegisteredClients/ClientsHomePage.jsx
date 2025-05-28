// import React from 'react';
// import { Button, Box } from '@mui/material';
// import { useDispatch } from 'react-redux';
// import { setSelectedItem } from '../../redux/features/sidebar/SidebarSlice';

// const ClientsHomePage = () => {
//   const dispatch = useDispatch();

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
//           onClick={() =>
//             dispatch(setSelectedItem({ id: 'registeredClients', label: 'Registered Clients' }))
//           }
//           sx={{ width: 300 }}
//         >
//           Registered Clients
//         </Button>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() =>
//             dispatch(setSelectedItem({ id: 'activeClients', label: 'Active Clients' }))
//           }
//           sx={{ width: 300 }}
//         >
//           Active Clients
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default ClientsHomePage;

import React from 'react';
import { Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setSelectedItem } from '../../redux/features/sidebar/SidebarSlice';
import activeclients from '../../assets/images/businessman.svg';
import registeredclients from '../../assets/images/registeredclients.svg';

const ClientsHomePage = () => {
  const dispatch = useDispatch();

  const handleSelection = (id, label) => {
    dispatch(setSelectedItem({ id, label }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'center',
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
        <Typography variant="h5" sx={{ marginBottom: 1, color: '#333' }}>
          Manage Your Clients
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 4,
          }}
        >
          {/* Registered Clients */}
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
            onClick={() => handleSelection('registeredClients', 'Registered Clients')}
          >
            <img src={registeredclients} alt="registerclients" style={{ width:"50px",height:"50px"}}/>
            <Typography variant="h7" mt={2}>
              Registered Clients
            </Typography>
          </Box>

          {/* Active Clients */}
          <Box
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
            onClick={() => handleSelection('activeClients', 'Clients')}
          >
            <img src={activeclients} alt="activeclients" style={{ width:"50px",height:"50px"}}/>
            <Typography variant="h7" mt={2}>
              Add Clients
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ClientsHomePage;
