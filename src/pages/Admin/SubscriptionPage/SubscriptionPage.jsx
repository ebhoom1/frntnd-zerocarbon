import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Avatar,
  Chip,
} from "@mui/material";
import { CheckCircleOutline, CancelOutlined } from "@mui/icons-material";

const SubscriptionPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get("/api/admin/registeredusers");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching subscription data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ p: 4 }}>   
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={12} md={6} lg={4} key={user._id}>
            <Paper
              elevation={6}
              sx={{
                p: 3,
                borderRadius: 4,
                backgroundColor: "#F9F9F9",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar sx={{ bgcolor: "#2E7D32", mr: 2 }}>
                  {user.userName.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {user.userName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {user.email}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body1" sx={{ mb: 1 }}>
                📞 <strong>Phone:</strong> {user.contactNumber}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                🏢 <strong>Company:</strong> {user.companyName}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                📍 <strong>Address:</strong> {user.address}
              </Typography>

              <Chip
                label={`Plan: ${user.subscription?.plan || "Free Trial"}`}
                color="primary"
                variant="outlined"
                sx={{ mt: 1, mr: 1 }}
              />
              <Chip
                label={`Status: ${user.subscription?.status || "Free"}`}
                color={user.subscription?.status === "Paid" ? "success" : "warning"}
                variant="outlined"
                sx={{ mt: 1 }}
              />

              {user.subscription?.startDate && (
                <Typography variant="caption" display="block" sx={{ mt: 2, color: "#888" }}>
                  ⏱️ Active from {new Date(user.subscription.startDate).toLocaleDateString()} to {new Date(user.subscription.endDate).toLocaleDateString()}
                </Typography>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SubscriptionPage;
