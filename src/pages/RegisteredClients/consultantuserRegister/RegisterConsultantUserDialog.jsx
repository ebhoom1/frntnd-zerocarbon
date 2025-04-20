import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "../../../api/axios";

const subscriptionPlans = [
  {
    name: "Free Trial",
    price: "Free for 30 days",
    features: ["All features", "No card required"],
    bg: "#e3f2fd",
    disabled: false,
  },
  {
    name: "ESG Basic",
    price: "₹4999/month",
    features: ["BRSR or GRI", "Limited AI", "5GB ESG data"],
    bg: "#f1f8e9",
    disabled: true,
  },
  {
    name: "ESG Standard",
    price: "₹9999/month",
    features: ["BRSR, GRI, CDP", "20GB ESG data", "API Access"],
    bg: "#fff3e0",
    disabled: true,
  },
  {
    name: "ESG Premium",
    price: "₹19999/month",
    features: ["All Reports", "50GB Data", "24x7 Support"],
    bg: "#fce4ec",
    disabled: true,
  },
];

const RegisterConsultantUserDialog = ({ open, onClose, consultantId, refreshUsers }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    contactNumber: "",
    userName: "",
    address: "",
    companyName: "",
  });
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const emailRef = useRef();
  const contactRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(formData.email)) {
      setError("Invalid email address");
      emailRef.current.focus();
      return false;
    }

    if (!phoneRegex.test(formData.contactNumber)) {
      setError("Enter a valid 10-digit phone number");
      contactRef.current.focus();
      return false;
    }

    if (!selectedPlan) {
      setError("Please select a subscription plan");
      return false;
    }

    setError(null);
    return true;
  };

  const handleRegister = async () => {
    if (!validateFields()) return;
    setLoading(true);
    try {
      const payload = {
        ...formData,
        userType: "user",
        consultantAdminId: consultantId,
        subscriptionPlan: selectedPlan,
        paymentStatus: selectedPlan === "Free Trial" ? "Free" : "Pending",
        subscriptionStartDate: new Date(),
        subscriptionEndDate:
          selectedPlan === "Free Trial"
            ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            : null,
      };

      const response=await axios.post("/api/auth/consultant/registeruser", payload);
      console.log("response:",response.data);
      refreshUsers();
      onClose();
    } catch (err) {
        console.log("error:",err.message);
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Register New User under Consultant</DialogTitle>
      <DialogContent>
        <TextField
          label="Email"
          name="email"
          inputRef={emailRef}
          fullWidth
          value={formData.email}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Contact Number"
          name="contactNumber"
          inputRef={contactRef}
          fullWidth
          value={formData.contactNumber}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Username"
          name="userName"
          fullWidth
          value={formData.userName}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          fullWidth
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Address"
          name="address"
          fullWidth
          value={formData.address}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Company Name"
          name="companyName"
          fullWidth
          value={formData.companyName}
          onChange={handleChange}
          margin="normal"
        />

        <Typography variant="h6" sx={{ mt: 3, mb: 1, fontWeight: "bold", color: "#2E3B55" }}>
          Choose Subscription Plan
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {subscriptionPlans.map((plan) => (
            <Box
              key={plan.name}
              onClick={() => !plan.disabled && setSelectedPlan(plan.name)}
              sx={{
                flex: "1 1 calc(50% - 10px)",
                p: 2,
                backgroundColor: plan.bg,
                border: selectedPlan === plan.name ? "3px solid #4caf50" : "1px solid #ccc",
                borderRadius: 2,
                cursor: plan.disabled ? "not-allowed" : "pointer",
                transition: "0.3s",
                opacity: plan.disabled ? 0.6 : 1,
                pointerEvents: plan.disabled ? "none" : "auto",
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                {plan.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {plan.price}
              </Typography>
              <ul style={{ paddingLeft: 20 }}>
                {plan.features.map((f, i) => (
                  <li key={i} style={{ fontSize: 12 }}>{f}</li>
                ))}
              </ul>
            </Box>
          ))}
        </Box>

        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleRegister} variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Register"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterConsultantUserDialog;
