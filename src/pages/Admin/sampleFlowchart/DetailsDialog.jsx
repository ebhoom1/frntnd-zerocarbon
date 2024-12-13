import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const DetailsDialog = ({ open, onClose, title, details }) => {
  // Format field name for display
  const formatFieldName = (fieldName) => {
    return fieldName
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before capital letters
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter
  };

  // Render details based on type
  const renderDetails = (details) => {
    if (!details) {
      return <Typography variant="body2">No details available.</Typography>;
    }

    const filterDetails = (item) => {
      return Object.entries(item).filter(([key]) => key !== "_id");
    };

    if (Array.isArray(details)) {
      return details.map((item, index) => (
        <Box
          key={index}
          sx={{
            mb: 2,
            borderBottom: "1px solid #ccc",
            pb: 1,
            padding: "8px",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          {filterDetails(item).map(([key, value]) => (
            <Typography
              key={key}
              variant="body2"
              sx={{ mb: 0.5, wordBreak: "break-word" }}
            >
              <strong>{formatFieldName(key)}:</strong> {value ?? "N/A"}
            </Typography>
          ))}
        </Box>
      ));
    } else if (typeof details === "object") {
      return Object.entries(details)
        .filter(([key]) => key !== "_id")
        .map(([key, value]) => (
          <Typography
            key={key}
            variant="body2"
            sx={{ mb: 0.5, wordBreak: "break-word" }}
          >
            <strong>{formatFieldName(key)}:</strong> {value ?? "N/A"}
          </Typography>
        ));
    }

    return <Typography variant="body2">No details available.</Typography>;
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          {title}
        </Typography>
        <Box sx={{ maxHeight: "300px", overflowY: "auto" }}>
          {renderDetails(details)}
        </Box>
        <Box sx={{ mt: 2, textAlign: "right" }}>
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

DetailsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  details: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

DetailsDialog.defaultProps = {
  details: null, // Default to null to handle undefined cases
};

export default DetailsDialog;
