// import React from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   Typography,
//   Grid,
//   Avatar,
//   CardContent,
//   Divider,
//   Box,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import PersonIcon from "@mui/icons-material/Person";
// import { useSelector } from "react-redux";

// const ProfileDialog = ({ open, onClose }) => {
//   const { user } = useSelector((state) => state.auth);

//   if (!user) return null;

//   const {
//     userName,
//     email,
//     contactNumber,
//     address,
//     companyName,
//     userType,
//     subscription,
//   } = user;

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="md"
//       fullWidth
//       PaperProps={{ sx: { borderRadius: 3 } }}
//     >
//       <DialogTitle
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           pr: 2,
//         }}
//       >
//         <Typography variant="h6" fontWeight="bold">
//           Profile Information
//         </Typography>
//         <IconButton onClick={onClose}>
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>

//       <DialogContent dividers>
//         <Box display="flex" alignItems="center" gap={2} mb={3}>
//           <Avatar sx={{ bgcolor: "#2E7D32", width: 64, height: 64 }}>
//             <PersonIcon fontSize="large" />
//           </Avatar>
//           <Box>
//             <Typography variant="h5" fontWeight="bold">
//               {userName}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//             {userType === "superAdmin"  ? "Super Admin" : userType === "admin" ? "User Admin" : "ESG User"}

//             </Typography>
//           </Box>
//         </Box>

//         <Divider sx={{ mb: 2 }} />

//         <CardContent sx={{ p: 0 }}>
//           <Typography variant="h6" color="primary" gutterBottom>
//             Personal Details
//           </Typography>

//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="subtitle2">Email</Typography>
//               <Typography>{email}</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="subtitle2">Contact</Typography>
//               <Typography>{contactNumber}</Typography>
//             </Grid>
//             <Grid item xs={12}>
//               <Typography variant="subtitle2">Company</Typography>
//               <Typography>{companyName}</Typography>
//             </Grid>
//             <Grid item xs={12}>
//               <Typography variant="subtitle2">Address</Typography>
//               <Typography>{address}</Typography>
//             </Grid>
//           </Grid>

//           {subscription && (
//             <>
//               <Divider sx={{ my: 3 }} />
//               <Typography variant="h6" color="primary" gutterBottom>
//                 Subscription Details
//               </Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <Typography variant="subtitle2">Plan</Typography>
//                   <Typography>{subscription.plan}</Typography>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Typography variant="subtitle2">Status</Typography>
//                   <Typography>{subscription.status}</Typography>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Typography variant="subtitle2">Start Date</Typography>
//                   <Typography>{new Date(subscription.startDate).toLocaleDateString()}</Typography>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Typography variant="subtitle2">End Date</Typography>
//                   <Typography>{new Date(subscription.endDate).toLocaleDateString()}</Typography>
//                 </Grid>
//               </Grid>
//             </>
//           )}
//         </CardContent>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ProfileDialog;


import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Grid,
  Avatar,
  CardContent,
  Divider,
  Box,
  TextField,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../../api/axios"; // adjust path
import { useNavigate } from "react-router-dom"
import { loginUser } from "../../../redux/features/auth/authSlice"; // to refresh data

const ProfileDialog = ({ open, onClose }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(user);

  if (!user) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      console.log("user id:",user.id);
      const res=await axios.put(`/api/auth/update/${user.id}`, formData);
      console.log("res update:",res);
      setEditMode(false);
      dispatch(loginUser({ email: formData.email, password: formData.password })); // re-login to refresh Redux
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pr: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Profile Information
        </Typography>
        <Box>
          {!editMode ? (
            <Button variant="outlined" size="small" onClick={() => setEditMode(true)}>
              Edit
            </Button>
          ) : (
            <>
              <Button variant="contained" size="small" onClick={handleSave} sx={{ mr: 1 }}>
                Save
              </Button>
              <Button variant="outlined" size="small" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
            </>
          )}
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Avatar sx={{ bgcolor: "#2E7D32", width: 64, height: 64 }}>
            <PersonIcon fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {formData.userName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formData.userType === "superAdmin" ? "Super Admin" : formData.userType === "admin" ? "User Admin" : "ESG User"}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <CardContent sx={{ p: 0 }}>
          <Typography variant="h6" color="primary" gutterBottom>
            Personal Details
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Email</Typography>
              {editMode ? (
                <TextField fullWidth name="email" value={formData.email} onChange={handleChange} />
              ) : (
                <Typography>{formData.email}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Contact</Typography>
              {editMode ? (
                <TextField fullWidth name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
              ) : (
                <Typography>{formData.contactNumber}</Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Company</Typography>
              {editMode ? (
                <TextField fullWidth name="companyName" value={formData.companyName} onChange={handleChange} />
              ) : (
                <Typography>{formData.companyName}</Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Address</Typography>
              {editMode ? (
                <TextField fullWidth name="address" value={formData.address} onChange={handleChange} />
              ) : (
                <Typography>{formData.address}</Typography>
              )}
            </Grid>
          </Grid>

          {formData.subscription && (
            <>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" color="primary" gutterBottom>
                Subscription Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Plan</Typography>
                  <Typography>{formData.subscription.plan}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Status</Typography>
                  <Typography>{formData.subscription.status}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Start Date</Typography>
                  <Typography>{new Date(formData.subscription.startDate).toLocaleDateString()}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">End Date</Typography>
                  <Typography>{new Date(formData.subscription.endDate).toLocaleDateString()}</Typography>
                </Grid>
              </Grid>
            </>
          )}
        </CardContent>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
