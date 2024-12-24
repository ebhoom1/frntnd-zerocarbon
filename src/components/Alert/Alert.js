
import React, { useEffect, useState } from 'react';
import { Snackbar, Alert as MuiAlert } from '@mui/material';

// Reusable Alert component
const Alert = ({ message, severity }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 5000); 
    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, []); 

  const getAlertStyles = (severity) => {
    switch (severity) {
      case 'success':
        return { backgroundColor: '#388E3C', color: '#fff' }; 
      case 'error':
        return { backgroundColor: '#D32F2F', color: '#fff' }; 
      default:
        return {};
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={10000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
     
    >
      <MuiAlert
        severity={severity}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px", // Add padding for a modern look
          borderRadius: "8px", // Rounded corners
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
          width: "100%",
          ...getAlertStyles(severity),
        }}      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;

