import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../../api/axios";
import EditUserDialog from "./EditUserDialog";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [allForms, setAllForms] = useState([]);
  const [forms, setForms] = useState([]);
  const [filters, setFilters] = useState({
    companyName: "",
    status: "",
  });

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setOpenEditDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenEditDialog(false);
    setSelectedUser(null);
  };

  const handleDeleteClick = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/admin/delete-user/${userId}`);
      await fetchRegisteredUsers(); 
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const fetchRegisteredUsers = async () => {
    try {
      const response = await axios.get("/api/admin/registeredusers");
      setAllForms(response.data);
      setForms(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchRegisteredUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const fetchFilteredForms = async () => {
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await axios.get(`/api/admin/forms/filter?${params}`);
      setForms(response.data);
    } catch (error) {
      console.error("Error fetching filtered forms:", error);
    }
  };

  const handleRowClick = (userId) => {
    navigate(`/formdetails/${userId}`);
  };

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <TextField
          label="Company Name"
          name="companyName"
          value={filters.companyName}
          onChange={handleInputChange}
          style={{ marginRight: "8px" }}
        />
        <FormControl style={{ marginRight: "8px", minWidth: "200px" }}>
          <Select
            name="status"
            value={filters.status}
            onChange={handleInputChange}
            displayEmpty
            renderValue={(selected) => (selected ? selected : "Status")}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Not started">Not started</MenuItem>
            <MenuItem value="Off track">Off track</MenuItem>
            <MenuItem value="At risk">At risk</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Canceled">Canceled</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={fetchFilteredForms}>
          Filter
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>UserType</TableCell>
              <TableCell>Subscription</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {forms.length > 0 ? (
              forms.map((form) => (
                <TableRow
                  key={form._id}
                  onClick={() => handleRowClick(form._id)}
                  style={{ cursor: "pointer", backgroundColor: "white" }}
                >
                  <TableCell>{form.userName}</TableCell>
                  <TableCell>{form.companyName}</TableCell>
                  <TableCell>{form.email}</TableCell>
                  <TableCell>{form.contactNumber}</TableCell>
                  <TableCell>{form.userType}</TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    {form.subscription?.plan || "Not Subscribed"}
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() => handleEditClick(form)}
                    >
                      Edit
                    </Button>
                    {user?.userType === "superAdmin" && (
                      <Button
                        variant="outlined"
                        color="red"
                        size="small"
                        onClick={() => handleDeleteClick(form._id)}
                      >
                        Delete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No Data Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <EditUserDialog
        open={openEditDialog}
        user={selectedUser}
        onClose={handleCloseDialog}
        refreshUsers={fetchRegisteredUsers}
      />
    </div>
  );
};

export default Dashboard;
