import React from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector } from "react-redux";

const ProfileDialog = ({ open, onClose }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return null;

  const {
    userName,
    email,
    contactNumber,
    address,
    companyName,
    userType,
    subscription,
  } = user;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pr: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Profile Information
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Avatar sx={{ bgcolor: "#2E7D32", width: 64, height: 64 }}>
            <PersonIcon fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {userName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userType === "admin" ? "Administrator" : "ESG User"}
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
              <Typography>{email}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Contact</Typography>
              <Typography>{contactNumber}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Company</Typography>
              <Typography>{companyName}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Address</Typography>
              <Typography>{address}</Typography>
            </Grid>
          </Grid>

          {subscription && (
            <>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" color="primary" gutterBottom>
                Subscription Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Plan</Typography>
                  <Typography>{subscription.plan}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Status</Typography>
                  <Typography>{subscription.status}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Start Date</Typography>
                  <Typography>{new Date(subscription.startDate).toLocaleDateString()}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">End Date</Typography>
                  <Typography>{new Date(subscription.endDate).toLocaleDateString()}</Typography>
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
