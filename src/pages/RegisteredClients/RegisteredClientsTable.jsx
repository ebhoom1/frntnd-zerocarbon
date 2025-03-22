import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

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
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

const Dashboard = () => {
  const navigate = useNavigate();
  const [allForms, setAllForms] = useState([]);
  const [forms, setForms] = useState([]);
  const [filters, setFilters] = useState({
    companyName: "",
    status: "",
  });

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get("/api/admin/registeredusers");
        setAllForms(response.data);
        setForms(response.data);
        console.log("forms:",forms);
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };
    fetchForms();
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

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.patch(`/api/admin/registeredusers/status/${id}`, {
        status: newStatus,
      });
      setForms((prevForms) =>
        prevForms.map((form) =>
          form._id === id ? { ...form, status: response.data.status } : form
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleSubscriptionChange = async (id, newSubscription) => {
    try {
      const response = await axios.patch(`/api/admin/registeredusers/subscription/${id}`, {
        subscription: newSubscription,
      });
  
      setForms((prevForms) =>
        prevForms.map((form) =>
          form._id === id ? { ...form, subscription: response.data.subscription } : form
        )
      );
    } catch (error) {
      console.error("Error updating subscription:", error);
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
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Subscription</TableCell>
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
                    backgroundColor: "white",
                  }}
                >
                  <TableCell>{form.userName}</TableCell>
                  <TableCell>{form.email}</TableCell>
                  <TableCell>{form.contactNumber}</TableCell>
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
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <FormControl fullWidth>
                      <Select
                        value={form.subscription || "Basic"}
                        onChange={(e) =>{

                          e.stopPropagation();
                          handleSubscriptionChange(form._id, e.target.value);
                        }
                        }
                      >
                        <MenuItem value="Basic">Basic</MenuItem>
                        <MenuItem value="Standard">Standard</MenuItem>
                        <MenuItem value="Premium">Premium</MenuItem>
                        <MenuItem value="Enterprise">Enterprise</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
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
