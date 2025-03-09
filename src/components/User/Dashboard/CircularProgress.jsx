import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  LinearProgress,
} from "@mui/material";

const ESGProgressCard = ({ scores }) => {
  const { environmental, social, governance } = scores;
  const overallScore = ((environmental + social + governance) / 3).toFixed(1);

  return (
    <Box sx={{ Width: "100%",height:"280px", textAlign:"left"}}>
      
        <Typography variant="h6" color="green" gutterBottom>
          ESG Score Overview
        </Typography>
        {/* Overall Score */}
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <Box position="relative" display="inline-flex">
            <CircularProgress
              variant="determinate"
              value={overallScore}
              size={100}
              thickness={5}
            />
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h6" fontWeight="bold">
                {overallScore}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Environmental Score */}
        <Typography variant="body2" fontWeight="bold" color="green">
          Environmental: {environmental}%
        </Typography>
        <LinearProgress
          variant="determinate"
          value={environmental}
          sx={{ height: 8, borderRadius: 2, mb: 1 }}
        />

        {/* Social Score */}
        <Typography variant="body2" fontWeight="bold" color="blue">
          Social: {social}%
        </Typography>
        <LinearProgress
          variant="determinate"
          value={social}
          sx={{ height: 8, borderRadius: 2, mb: 1 }}
        />

        {/* Governance Score */}
        <Typography variant="body2" fontWeight="bold" color="purple">
          Governance: {governance}%
        </Typography>
        <LinearProgress
          variant="determinate"
          value={governance}
          sx={{ height: 8, borderRadius: 2, mb: 1 }}
        />
    </Box>
  );
};

export default ESGProgressCard;
