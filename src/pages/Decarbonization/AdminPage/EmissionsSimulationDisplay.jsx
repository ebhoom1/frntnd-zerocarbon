// EmissionsSimulationDisplay.jsx
import React, { useEffect } from "react";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserSimulations } from "../../../redux/features/roadmap/EmissionsSimulation";

const EmissionsSimulationDisplay = ({ userId }) => {
  const dispatch = useDispatch();
  const { simulations, loading } = useSelector((state) => state.simulation);

  useEffect(() => {
    if (userId) dispatch(fetchUserSimulations(userId));
  }, [userId, dispatch]);

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#3F4F44", mb: 2 }}>
        Saved Emissions Simulations
      </Typography>
      {simulations.length === 0 ? (
        <Typography sx={{ textAlign: "center", color: "#666", fontStyle: "italic", mt: 2 }}>No simulations found.</Typography>
      ) : (
        simulations.map((sim, index) => (
          <Paper key={index} elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="subtitle1">
              <strong>Estimated CO₂ Reduction:</strong> {sim?.aiResponse?.reduction} tonnes
            </Typography>
            <Typography variant="subtitle1">
              <strong>Cost Savings:</strong> ${sim?.aiResponse?.savings?.toLocaleString()}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Investment Needed:</strong> ${sim?.aiResponse?.investment?.toLocaleString()}
            </Typography>
            <Box mt={2} ml={8}>
              <ResponsiveContainer width="60%" height={200}>
                <BarChart
                  data={[
                    { category: "Savings", value: sim?.aiResponse?.savings ?? 0 },
                    { category: "Investment", value: sim?.aiResponse?.investment ?? 0 },
                  ]}
                >
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default EmissionsSimulationDisplay;
