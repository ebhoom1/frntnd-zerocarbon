import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "../../components/Alert/Alert";
import Sidebar from "../../components/Admin/Sidebar";
import ContentArea from "../../components/Admin/ContentArea";
import { Box } from "@mui/material";
const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [alert, setAlert] = useState(location.state || null);

  useEffect(() => {
    // Clear location state after rendering the alert
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 4000); // Clear alert after 4 seconds
      navigate(location.pathname, { replace: true }); // Remove state without reloading
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [alert, location.pathname, navigate]);
  return (
    <Box sx={{ height: "100vh", display: "flex", backgroundColor: "#F5F5F5" }}>
      {alert && <Alert message={alert.message} severity={alert.type} />}
      <Sidebar />
      <ContentArea />
    </Box>
  );
};

export default AdminDashboard;
