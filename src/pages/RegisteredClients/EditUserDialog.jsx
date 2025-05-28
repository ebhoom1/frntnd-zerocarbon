import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import axios from "../../api/axios";
import { useSelector } from "react-redux";

const EditUserDialog = ({ open, user, onClose, refreshUsers }) => {
  const [formData, setFormData] = useState(user || {});
  const loggedInUser = useSelector((state) => state.auth.user);
  console.log("loggedInUser:", loggedInUser);
  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const payload = { ...formData };
      // Only send password if superAdmin and it's not empty
      if (loggedInUser?.userType !== "superAdmin" || !payload.password) {
        delete payload.password;
      }
      await axios.put(`/api/admin/update-user/${user._id}`, payload);
      refreshUsers(); // Immediately fetch updated users
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="userName"
          fullWidth
          value={formData.userName || ""}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          fullWidth
          value={formData.email || ""}
          onChange={handleChange}
          margin="normal"
        />
        {loggedInUser?.userType === "superAdmin" && (
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            value={formData.password || ""}
            onChange={handleChange}
            margin="normal"
          />
        )}
        <TextField
          label="Phone"
          name="contactNumber"
          fullWidth
          value={formData.contactNumber || ""}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Company"
          name="companyName"
          fullWidth
          value={formData.companyName || ""}
          onChange={handleChange}
          margin="normal"
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;
