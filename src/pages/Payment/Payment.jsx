import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Divider } from "@mui/material";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { userData, selectedPlan } = location.state || {};

  if (!userData || !selectedPlan) {
    return (
      <Box p={4} textAlign="center">
        <Typography variant="h5">Missing payment data</Typography>
        <Button variant="outlined" sx={{ mt: 2 }} onClick={() => navigate("/register")}>
          Go to Registration
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f4f6f8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 500,
          width: "100%",
          p: 4,
          background: "#fff",
          borderRadius: 3,
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Payment Page
        </Typography>
        {/* <Typography variant="subtitle1" color="text.secondary">
          You selected: <strong>{selectedPlan}</strong>
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body1">
          <strong>Email:</strong> {userData.email}
        </Typography>
        <Typography variant="body1">
          <strong>Username:</strong> {userData.userName}
        </Typography>
        <Typography variant="body1">
          <strong>Company:</strong> {userData.companyName}
        </Typography>

        <Typography sx={{ mt: 3, color: "green" }}>
          ✅ This is a sample payment screen. Payment gateway integration will go here.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button variant="outlined" onClick={() => navigate("/register")}>
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => alert("Proceed to payment gateway")}
          >
            Continue to Pay
          </Button>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Payment;
