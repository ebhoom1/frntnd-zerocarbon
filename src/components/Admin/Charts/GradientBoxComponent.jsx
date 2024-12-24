import React from "react";
import { Paper, Typography, Box } from "@mui/material";

const GradientBoxComponent = ({ title, value, change, gradient, icon }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: 215,
        height: 115,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: 2,
        borderRadius: 2,
        background: gradient || "linear-gradient(to right, #66BB6A, #B2FF59)", // Default gradient
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        color: "#fff",
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: "bold", fontSize: 14 }}>
        {title}
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        {value}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {icon && (
          <Box
            sx={{
              width: 16,
              height: 16,
              marginRight: 0.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
        )}
        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            fontSize: 12,
            display: "flex",
            alignItems: "center",
          }}
        >
          {change}
        </Typography>
      </Box>
    </Paper>
  );
};

export default GradientBoxComponent;
