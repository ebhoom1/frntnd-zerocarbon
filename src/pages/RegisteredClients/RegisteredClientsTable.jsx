import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import industryOptions from "../../assets/data/industryOptions.json"; // Adjust this path based on your project structure
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
  Typography,
  ListSubheader,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const Dashboard = () => {
  const navigate = useNavigate();
  const [allForms, setAllForms] = useState([]); // Stores all forms
  const [forms, setForms] = useState([]); // Stores forms to display (filtered or all)
  const [filters, setFilters] = useState({
    companyName: "",
    status:"",
  });

  // Fetch all forms on component mount
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get("/api/admin/forms");
        setAllForms(response.data); // Store all forms
        setForms(response.data); // Initialize display with all forms
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };
    fetchForms();
  }, []);

  // Handle filter input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Apply filters when the "Filter" button is clicked
  const fetchFilteredForms = async () => {
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await axios.get(`/api/admin/forms/filter?${params}`);
      setForms(response.data); // Update table with filtered results
      console.log("Filtered Forms:", response.data);
    } catch (error) {
      console.error("Error fetching filtered forms:", error);
    }
  };

  // Handle status update
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.patch(`/api/admin/forms/status/${id}`, {
        status: newStatus,
      });
      setForms((prevForms) =>
        prevForms.map((form) =>
          form._id === id ? { ...form, status: response.data.status } : form
        )
      );
      console.log("status submitted");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Handle table row click
  const handleRowClick = (formId) => {
    navigate(`/formdetails/${formId}`);
  };

  return (
    <div>
     

      {/* Filters Section */}
      <div style={{ marginBottom: "16px" }}>
        <TextField
          label="Company Name"
          name="companyName"
          value={filters.companyName}
          onChange={handleInputChange}
          style={{ marginRight: "8px" }}
        />
        {/* Industry Sector Dropdown */}
        <FormControl style={{ marginRight: "8px", minWidth: "200px" }}>
          <Select
            name="status"
            value={filters.status}
            onChange={handleInputChange}
            displayEmpty
            renderValue={(selected) => {
              return selected ? selected : "Status"; // Show "Status" as a placeholder
            }}
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

      {/* Table Section */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {forms.length > 0 ? (
              forms.map((form) => (
                <TableRow
                  key={form._id}
                  onClick={() => handleRowClick(form._id)}
                  style={{
                    cursor: "pointer",
                    backgroundColor: form.isRead ? "white" : "#FFF9C4",
                  }}
                >
                  <TableCell>{form.primaryContact.name}</TableCell>
                  <TableCell>{form.primaryContact.email}</TableCell>
                  <TableCell>{form.primaryContact.phone}</TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <FormControl fullWidth>
                      <Select
                        value={form.status || "Not started"}
                        onChange={(e) =>
                          handleStatusChange(form._id, e.target.value)
                        }
                      >
                        <MenuItem value="Not started">Not started</MenuItem>
                        <MenuItem value="Off track">Off track</MenuItem>
                        <MenuItem value="At risk">At risk</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Canceled">Canceled</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>{" "}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No Form Data Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Dashboard;
