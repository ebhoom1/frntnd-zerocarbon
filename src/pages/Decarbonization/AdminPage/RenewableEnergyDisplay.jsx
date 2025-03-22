import React, { useEffect } from "react";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRenewableCalculations } from "../../../redux/features/roadmap/renewableEnergySlice";

const RenewableEnergyDisplay = ({ userId }) => {
  const dispatch = useDispatch();
  const { renewableCalculations, loading } = useSelector((state) => state.renewable);

  useEffect(() => {
    if (userId) dispatch(fetchUserRenewableCalculations(userId));
  }, [userId, dispatch]);

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#3F4F44", mb: 2 }}>
        Saved Renewable Energy Calculations
      </Typography>

      {renewableCalculations.length === 0 ? (
        <Typography sx={{ textAlign: "center", color: "#666", fontStyle: "italic", mt: 2 }}>No renewable energy data found.</Typography>
      ) : (
        renewableCalculations.map((calc, index) => (
          <Paper
            key={index}
            elevation={6}
            sx={{
              p: 4,
              borderRadius: "16px",
              backgroundColor: "#f0fdf4",
              boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
              textAlign: "left",
              mb: 3,
            }}
          >
            <Typography
              sx={{
                fontSize: "1.6rem",
                fontWeight: "bold",
                color: "#2E7D32",
                mb: 2,
              }}
            >
              Estimated Impact
            </Typography>

            <Typography sx={{ fontSize: "1rem", color: "#444", mb: 2 }}>
              🌿 <strong>Impact on Scope 2 Emissions:</strong>{" "}
              {calc?.analysedData?.scope2Impact || "N/A"}
            </Typography>

            <Typography sx={{ fontSize: "1rem", color: "#444", mb: 2 }}>
              💰 <strong>Local Renewable Options:</strong>{" "}
              {calc?.analysedData?.renewableOptions || "N/A"}
            </Typography>

            <Typography sx={{ fontSize: "1rem", color: "#444" }}>
              ⏳ <strong>Payback Period:</strong>{" "}
              {calc?.analysedData?.paybackPeriod || "N/A"}
            </Typography>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default RenewableEnergyDisplay;
