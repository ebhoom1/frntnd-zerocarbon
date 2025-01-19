import React, { useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  Typography,
  Modal,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Sample alert data
const sampleAlerts = [
  {
    id: "ALERT-12345",
    clientName: "ABC Logistics",
    alertType: "Threshold Breach",
    severity: "High",
    status: "New",
    timestamp: "2025-01-15 10:30 AM",
    issue: "Emissions exceeded threshold for Factory A",
    action: "Investigate source and notify the client.",
  },
  {
    id: "ALERT-67890",
    clientName: "XYZ Industries",
    alertType: "Data Submission",
    severity: "Medium",
    status: "Resolved",
    timestamp: "2025-01-14 02:15 PM",
    issue: "Submission delayed for Boundary B.",
    action: "Data validated successfully.",
  },
];

const AlertsPage = () => {
  const [filter, setFilter] = useState({
    severity: "",
    alertType: "",
    clientName: "",
  });
  const [selectedAlert, setSelectedAlert] = useState(null);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleAlertClick = (alert) => {
    setSelectedAlert(alert);
  };

  const handleCloseModal = () => {
    setSelectedAlert(null);
  };

  const handleResolveAlert = () => {
    toast.success("Alert marked as resolved!");
    setSelectedAlert(null);
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Header */}
      <Typography variant="h6" fontWeight="bold" mb={3}>
        Alerts Dashboard
      </Typography>

      {/* Filter Section */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <TextField
          name="clientName"
          label="Client Name"
          value={filter.clientName}
          onChange={handleFilterChange}
          variant="outlined"
          size="small"
          sx={{ width: 200 }}
        />
        <Select
          name="alertType"
          value={filter.alertType}
          onChange={handleFilterChange}
          displayEmpty
          size="small"
          sx={{ width: 200 }}
        >
          <MenuItem value="">All Alert Types</MenuItem>
          <MenuItem value="Data Submission">Data Submission</MenuItem>
          <MenuItem value="Threshold Breach">Threshold Breach</MenuItem>
          <MenuItem value="Validation Issue">Validation Issue</MenuItem>
          <MenuItem value="IoT Device">IoT Device</MenuItem>
        </Select>
        <Select
          name="severity"
          value={filter.severity}
          onChange={handleFilterChange}
          displayEmpty
          size="small"
          sx={{ width: 200 }}
        >
          <MenuItem value="">All Severities</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
        <Button
          variant="contained"
          color="primary"
        //   onClick={() => toast.info("Filters applied!")}
        >
          Apply Filters
        </Button>
      </Box>

      {/* Alerts Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Alert ID</strong></TableCell>
              <TableCell><strong>Client Name</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Severity</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Timestamp</strong></TableCell>
              <TableCell align="center"><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleAlerts.map((alert) => (
              <TableRow key={alert.id}>
                <TableCell>{alert.id}</TableCell>
                <TableCell>{alert.clientName}</TableCell>
                <TableCell>{alert.alertType}</TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color:
                        alert.severity === "High"
                          ? "red"
                          : alert.severity === "Medium"
                          ? "orange"
                          : "green",
                    }}
                  >
                    {alert.severity}
                  </Typography>
                </TableCell>
                <TableCell>{alert.status}</TableCell>
                <TableCell>{alert.timestamp}</TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleAlertClick(alert)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Alert Details Modal */}
      <Modal open={!!selectedAlert} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
            width: 400,
          }}
        >
          {selectedAlert && (
            <>
              <Typography variant="h6" mb={2}>
                Alert Details
              </Typography>
              <Typography><strong>Issue:</strong> {selectedAlert.issue}</Typography>
              <Typography><strong>Action Required:</strong> {selectedAlert.action}</Typography>
              <Typography><strong>Client:</strong> {selectedAlert.clientName}</Typography>
              <Typography><strong>Severity:</strong> {selectedAlert.severity}</Typography>
              <Typography><strong>Timestamp:</strong> {selectedAlert.timestamp}</Typography>
              <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
                <Button onClick={handleCloseModal} variant="outlined">
                  Close
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleResolveAlert}
                >
                  Resolve
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      {/* Toast Notifications */}
      <ToastContainer />
    </Box>
  );
};

export default AlertsPage;
