// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from "../redux/features/auth/authSlice";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   CircularProgress,
// } from "@mui/material";
// import image from '../../src/assets/images/bg.svg'; 
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     contactNumber: "",
//     userName: "",
//     userType: "",
//     address: "",
//     companyName: "",
//   });

//   const dispatch = useDispatch();
//   const { loading, error, successMessage } = useSelector((state) => state.auth);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(registerUser(formData));
//   };

//   // Navigate to login page if registration is successful
//   useEffect(() => {
//     if (successMessage) {
//       navigate("/login");
//     }
//   }, [successMessage, navigate]);

//   return (
//     <Box
//       sx={{
//         p: 4,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundImage: `url(${image})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <Box
//         sx={{
//           width: 600,
//           p: 4,
//           background: "var(--form-bg)", // Use variable for background
//           borderRadius: 2,
//           boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
//           backdropFilter: "blur(8px)",
//           border: "1px solid var(--form-border)", // Use variable for border
//           textAlign: "center",
//         }}
//       >
//         <Typography
//           variant="h4"
//           gutterBottom
//           sx={{ color: "var(--primary-text)" }}
//         >
//           Register
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Email"
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             required
//             sx={{
//               input: {
//                 color: "var(--primary-text)", // Input text color
//               },
//               label: {
//                 color: "var(--primary-text)", // Label text color
//               },
//             }}
//           />
//           <TextField
//             label="Contact Number"
//             type="number"
//             name="contactNumber"
//             value={formData.contactNumber}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             required
//             sx={{
//               input: {
//                 color: "var(--primary-text)",
//               },
//               label: {
//                 color: "var(--primary-text)",
//               },
//             }}
//           />
//           <TextField
//             label="Username"
//             type="text"
//             name="userName"
//             value={formData.userName}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             required
//             sx={{
//               input: {
//                 color: "var(--primary-text)",
//               },
//               label: {
//                 color: "var(--primary-text)",
//               },
//             }}
//           />
//           <TextField
//             label="Password"
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             required
//             sx={{
//               input: {
//                 color: "var(--primary-text)",
//               },
//               label: {
//                 color: "var(--primary-text)",
//               },
//             }}
//           />
//           <TextField
//             label="User Type"
//             name="userType"
//             value={formData.userType}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             select
//             SelectProps={{
//               native: true,
//             }}
//             required
//             sx={{
//               "& .MuiInputBase-input": {
//                 color: "var(--primary-text)", // Input text color for select
//               },
//               "& .MuiInputLabel-root": {
//                 color: "var(--primary-text)", // Label text color
//               },
//               "& .MuiSelect-icon": {
//                 color: "var(--primary-text)", // Dropdown icon color
//               },
//             }}
//           >
//             <option value=""></option>
//             <option value="user">User</option>
//             <option value="admin">Admin</option>
//           </TextField>

//           <TextField
//             label="Address"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             multiline
//             rows={4}
//             sx={{
//               "& .MuiInputBase-input": {
//                 color: "var(--primary-text)", // Input text color for multiline
//               },
//               "& .MuiInputLabel-root": {
//                 color: "var(--primary-text)", // Label text color
//               },
//             }}
//           />

//           <TextField
//             label="Company Name"
//             type="text"
//             name="companyName"
//             value={formData.companyName}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             required
//             sx={{
//               input: {
//                 color: "var(--primary-text)",
//               },
//               label: {
//                 color: "var(--primary-text)",
//               },
//             }}
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             disabled={loading}
//             sx={{
//               mt: 2,
//               backgroundColor: "var(--primary-btn-bg)", // Button background color
//               color: "var(--primary-btn-text)", // Button text color
//               "&:hover": {
//                 backgroundColor: "var(--primary-btn-hover-bg)", // Button hover color
//               },
//             }}
//           >
//             {loading ? <CircularProgress size={24} /> : "Register"}
//           </Button>
//           <Box sx={{ mt: 2 }}>
//             <Typography variant="body2" sx={{ color: "var(--primary-text)" }}>
//               Already have an account?{" "}
//               <a href="/login" style={{ color: "var(--primary-text)" }}>
//                 Login
//               </a>
//             </Typography>
//           </Box>
//           {error && (
//             <Typography color="error" sx={{ mt: 2 }}>
//               {error}
//             </Typography>
//           )}
//           {successMessage && (
//             <Typography color="success" sx={{ mt: 2 }}>
//               {successMessage}
//             </Typography>
//           )}
//         </form>
//       </Box>
//     </Box>
//   );
// };

// export default Register;


import React, { useState, useEffect } from "react";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceed = () => {
    if (formData.userType === "admin") {
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
        subscriptionEndDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
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
          <TextField label="Email" name="email" type="email" fullWidth value={formData.email} onChange={handleChange} margin="normal" required sx={inputStyles} />

          <TextField label="Contact Number" name="contactNumber" type="number" fullWidth value={formData.contactNumber} onChange={handleChange} margin="normal" required sx={inputStyles} />

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
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </TextField>

          <TextField label="Address" name="address" fullWidth multiline rows={3} value={formData.address} onChange={handleChange} margin="normal" sx={inputStyles} />

          <TextField label="Company Name" name="companyName" fullWidth value={formData.companyName} onChange={handleChange} margin="normal" required sx={inputStyles} />

          {/* Show only for userType = user */}
          {formData.userType === "user" && (
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
            disabled={loading || (formData.userType === "user" && !selectedPlan)}
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
            {loading ? <CircularProgress size={24} /> : formData.userType === "admin" ? "Register" : "Proceed"}
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 2, color: "black" }}>
            Already have an account?{" "}
            <a href="/login" style={{ color: "#125427", fontWeight: "bold" }}>
              Login
            </a>
          </Typography>

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
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
