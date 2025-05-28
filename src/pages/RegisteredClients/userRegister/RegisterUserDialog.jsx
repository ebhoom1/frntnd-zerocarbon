import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../redux/features/auth/authSlice";
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
import { useSelector } from "react-redux";

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

const RegisterConsultantUserDialog = ({ open, onClose, refreshUsers }) => {
  const user = useSelector((state) => state.auth.user);
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
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    contactNumber: "",
    subscription: "",
    general: "",
  });
  const emailRef = useRef();
  const contactRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    const newErrors = {
      email: "",
      contactNumber: "",
      subscription: "",
      general: "",
    };

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!phoneRegex.test(formData.contactNumber)) {
      newErrors.contactNumber = "Enter a valid 10-digit phone number";
    }

    if (!selectedPlan) {
      newErrors.subscription = "Please select a subscription plan";
    }

    setFieldErrors(newErrors);

    // focus on the first invalid field
    if (newErrors.email) emailRef.current?.focus();
    else if (newErrors.contactNumber) contactRef.current?.focus();

    return (
      !newErrors.email && !newErrors.contactNumber && !newErrors.subscription
    );
  };

  const dispatch = useDispatch();

  const handleRegister = async () => {
    if (!validateFields()) return;
    setLoading(true);

    try {
      const payload = {
        ...formData,
        userType: user?.userType === "superAdmin" ? "admin" : "user",
        adminId: user?.id, // Only applies if logged-in user is admin
        subscription: {
          plan: selectedPlan,
          status: selectedPlan === "Free Trial" ? "Free" : "Pending",
          startDate: new Date(),
          endDate:
            selectedPlan === "Free Trial"
              ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
              : null,
        },
      };

      const result = await dispatch(registerUser(payload)).unwrap();
      console.log("User registered:", result);
      onClose();
    } catch (err) {
      setFieldErrors((prev) => ({
        ...prev,
        general: err?.message || "Registration failed",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {user?.userType === "superAdmin"
          ? "Register New Admin"
          : "Register New User"}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Email"
          name="email"
          inputRef={emailRef}
          fullWidth
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          error={!!fieldErrors.email}
          helperText={fieldErrors.email}
        />
        <TextField
          label="Contact Number"
          name="contactNumber"
          inputRef={contactRef}
          fullWidth
          value={formData.contactNumber}
          onChange={handleChange}
          margin="normal"
          error={!!fieldErrors.contactNumber}
          helperText={fieldErrors.contactNumber}
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
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
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

        <Typography
          variant="h6"
          sx={{ mt: 3, mb: 1, fontWeight: "bold", color: "#2E3B55" }}
        >
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
                border:
                  selectedPlan === plan.name
                    ? "3px solid #4caf50"
                    : "1px solid #ccc",
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
                  <li key={i} style={{ fontSize: 12 }}>
                    {f}
                  </li>
                ))}
              </ul>
            </Box>
          ))}
        </Box>

        {fieldErrors.subscription && (
          <Typography color="red" sx={{ mt: 1 }}>
            {fieldErrors.subscription}
          </Typography>
        )}

        {fieldErrors.general && (
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="body2"
              sx={{
                color: "error.main",
                backgroundColor: "#fff0f0",
                p: 1,
                border: "1px solid red",
                borderRadius: 1,
              }}
            >
              {fieldErrors.general}
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleRegister}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Register"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterConsultantUserDialog;
