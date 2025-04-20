import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
} from "@mui/material";
import { useSelector } from "react-redux";

const SubscriptionPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);

  const loggedInUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/admin/registeredusers");

        if (loggedInUser.userType === "consultantadmin") {
          const filtered = response.data.filter(
            (user) =>
              user.consultantAdminId &&
              user.consultantAdminId === loggedInUser.id
          );
          setUsers(filtered);
        } else {
          setUsers(response.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [loggedInUser]);

  const handleOpenDialog = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedUser(null);
    setOpen(false);
  };

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={2}>
  {users.length > 0 ? (
    users.map((user) => (
      <Grid item xs={12} sm={6} md={4} key={user.id}>
        <Paper
          sx={{
            p: 2,
            cursor: "pointer",
            borderRadius: 3,
            "&:hover": { backgroundColor: "#f5f5f5" },
          }}
          onClick={() => handleOpenDialog(user)}
        >
          <Typography variant="h6">{user.userName}</Typography>
          <Typography variant="body2" color="textSecondary">
            {user.companyName}
          </Typography>
        </Paper>
      </Grid>
    ))
  ) : (
    <Grid item xs={12}>
      <Typography align="center" sx={{ mt: 4, color: "#888" }}>
        No Data Available
      </Typography>
    </Grid>
  )}
</Grid>


      {/* Dialog for user details */}
      <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent dividers>
          {selectedUser && (
            <>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar sx={{ bgcolor: "#1976d2", mr: 2 }}>
                  {selectedUser.userName.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedUser.userName}</Typography>
                  <Typography variant="body2">{selectedUser.email}</Typography>
                </Box>
              </Box>

              <Typography sx={{ mb: 1 }}>
                <strong>Phone:</strong> {selectedUser.contactNumber}
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <strong>Company:</strong> {selectedUser.companyName}
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <strong>Address:</strong> {selectedUser.address}
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <strong>User Type:</strong>{" "}
                {selectedUser.userType === "consultantadmin"
                  ? "Consultant"
                  : "User"}
              </Typography>

              <Chip
                label={`Plan: ${selectedUser.subscription?.plan || "Free Trial"}`}
                sx={{ mt: 1, mr: 1 }}
              />
              <Chip
                label={`Status: ${selectedUser.subscription?.status || "Free"}`}
                color={
                  selectedUser.subscription?.status === "Paid"
                    ? "success"
                    : "warning"
                }
                sx={{ mt: 1 }}
              />
              {selectedUser.subscription?.startDate && (
                <Typography variant="caption" display="block" sx={{ mt: 2 }}>
                  Active from{" "}
                  {new Date(
                    selectedUser.subscription.startDate
                  ).toLocaleDateString()}{" "}
                  to{" "}
                  {new Date(
                    selectedUser.subscription.endDate
                  ).toLocaleDateString()}
                </Typography>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SubscriptionPage;
