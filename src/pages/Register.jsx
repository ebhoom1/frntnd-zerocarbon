

import React, { useState, useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/features/auth/authSlice";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import image from "../../src/assets/images/bg.svg";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector((state) => state.auth);

  const emailRef = useRef();        // Add ref for email input
const contactRef = useRef();      // Add ref for contact number input


  const [formData, setFormData] = useState({
    email: "",
    password: "",
    contactNumber: "",
    userName: "",
    userType: "",
    address: "",
    companyName: "",
  });

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    contactNumber: "",
  });
  
  const validateFields = () => {
    const newErrors = { email: "", contactNumber: "" };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
  
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
  
    if (!phoneRegex.test(formData.contactNumber)) {
      newErrors.contactNumber = "Enter a valid 10-digit phone number";
    }
  
    setErrors(newErrors);
     // focus first error field
     if (newErrors.email) emailRef.current.focus();
     else if (newErrors.contactNumber) contactRef.current.focus();

    return !newErrors.email && !newErrors.contactNumber;
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceed = () => {
    if (!validateFields()) return;
  
    if (formData.userType === "Consultant") {
      dispatch(registerUser(formData));
      return;
    }
  
    if (!selectedPlan) return;
  
    if (selectedPlan === "Free Trial") {
      const payload = {
        ...formData,
        subscriptionPlan: "Free Trial",
        paymentStatus: "Free",
        subscriptionStartDate: new Date(),
        subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      };
      dispatch(registerUser(payload));
    } else {
      navigate("/payment", {
        state: {
          userData: formData,
          selectedPlan,
        },
      });
    }
  };
  

  useEffect(() => {
    if (successMessage) {
      navigate("/login");
    }
  }, [successMessage, navigate]);

  return (
    <Box
      sx={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: 600 },
          maxHeight: "90vh",
          overflowY: "auto",
          background: "#ffffffcc",
          borderRadius: 4,
          boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
          backdropFilter: "blur(10px)",
          p: 4,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ mb: 3, fontWeight: "bold", color: "#2E3B55" }}
        >
          Register
        </Typography>

        <form>
        <TextField
  label="Email"
  name="email"
  type="email"
  fullWidth
  inputRef={emailRef}
  value={formData.email}
  onChange={handleChange}
  margin="normal"
  required
  error={!!errors.email}
  helperText={errors.email}
  sx={inputStyles}
/>

<TextField
  label="Contact Number"
  name="contactNumber"
  type="tel"
  fullWidth
  inputRef={contactRef} 
  value={formData.contactNumber}
  onChange={handleChange}
  margin="normal"
  required
  error={!!errors.contactNumber}
  helperText={errors.contactNumber}
  sx={inputStyles}
/>


          <TextField label="Username" name="userName" fullWidth value={formData.userName} onChange={handleChange} margin="normal" required sx={inputStyles} />

          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
            sx={inputStyles}
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
            label="User Type"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            fullWidth
            margin="normal"
            select
            required
            SelectProps={{ native: true }}
            sx={inputStyles}
          >
            <option value=""></option>
            <option value="Consultant">Consultant</option>
            <option value="Company">Company</option>
          </TextField>

          <TextField label="Address" name="address" fullWidth multiline rows={3} value={formData.address} onChange={handleChange} margin="normal" sx={inputStyles} />

          <TextField label="Company Name" name="companyName" fullWidth value={formData.companyName} onChange={handleChange} margin="normal" required sx={inputStyles} />

          {/* Show only for userType = user */}
          {formData.userType === "Company" && (
            <>
              <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: "bold", color: "#2E3B55" }}>
                Choose Subscription Plan
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {[
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
].map((plan) => (
  <Box
    key={plan.name}
    onClick={() => {
      if (!plan.disabled) setSelectedPlan(plan.name);
    }}
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
            </>
          )}

          <Button
            fullWidth
            variant="contained"
            onClick={handleProceed}
            disabled={loading || (formData.userType === "Company" && !selectedPlan)}
            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: "bold",
              fontSize: 16,
              backgroundColor: "#4caf50",
              "&:hover": {
                backgroundColor: "#008000",
              },
            }}
          >
            {loading ? <CircularProgress size={24} /> : formData.userType === "Consultant" ? "Register" : "Proceed"}
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 2, color: "black" }}>
            Already have an account?{" "}
            <a href="/login" style={{ color: "#125427", fontWeight: "bold" }}>
              Login
            </a>
          </Typography>

          {error && (
            <Typography sx={{ mt: 2,color:"red" }}>
              {error}
            </Typography>
          )}
        </form>
      </Box>
    </Box>
  );
};

const inputStyles = {
  "& .MuiInputBase-input": { color: "#2E3B55" },
  "& .MuiInputLabel-root": { color: "#2E3B55" },
};

export default Register;
