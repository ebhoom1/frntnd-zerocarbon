import React from 'react';
import { Container, Box,Button } from '@mui/material';
import BoundaryScopeForm from '../../components/User/platformconfig/BoundaryScopeForm';
import ProcessFlowChart from '../../components/User/platformconfig/ProcessFlow';
import { useNavigate } from 'react-router-dom';
const PlatformConfig = () => {
  const navigate=useNavigate();
  return (
  
    <Box display="flex" flexDirection="row" padding={5} gap={5} >
      <BoundaryScopeForm/>
      <ProcessFlowChart />
      <Button
      sx={{
        width: '120px',  
        height: '40px',  
        fontSize: '0.875rem', 
      }}
        variant="contained"
        color="primary"
        onClick={()=>navigate('/sample-flowchart')}
       
      >
        sample flowchart
      </Button>
    </Box>

  )
}

export default PlatformConfig
