import React from "react";
import { 
  Dialog, DialogTitle, DialogContent, Avatar, Typography, 
  Box, Button, Grid, Divider, Chip 
} from "@mui/material";
import { LocationOn, Phone, Email, EmojiEvents, Forest, Work, Favorite, People, VolunteerActivism, Security, SelfImprovement } from "@mui/icons-material";

const EmployeeDetail = ({ employee, onClose }) => {
  if (!employee) return null;

  return (
    <Dialog open={Boolean(employee)} onClose={onClose} fullWidth maxWidth="md">
      
      <DialogContent>
        {/* Profile Section */}
        <Box display="flex" flexDirection="column" alignItems="center" p={2}>
          <Avatar src={employee.profilePic} alt={employee.name} sx={{ width: 120, height: 120, mb: 1 }} />
          <Typography variant="h6" fontWeight="bold" sx={{ color: "#2C3E50" }}>
          {employee.name}
        </Typography>
          <Typography variant="body1" fontWeight="bold" sx={{ color: "#7F8C8D" }}>{employee.jobTitle} - {employee.department}</Typography>
          <Box display="flex" alignItems="center" mt={1}>
            <LocationOn sx={{ color: "#E74C3C", fontSize: 20, mr: 1 }} />
            <Typography variant="body2" sx={{ color: "#2C3E50" }}>{employee.location}</Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={1}>
            <Phone sx={{ color: "#27AE60", fontSize: 20, mr: 1 }} />
            <Typography variant="body2" sx={{ color: "#2C3E50" }}>{employee.contact || "Not Available"}</Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={1}>
            <Email sx={{ color: "#2980B9", fontSize: 20, mr: 1 }} />
            <Typography variant="body2" sx={{ color: "#2C3E50" }}>{employee.email || "Not Available"}</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* GoodFoot Social Impact Metrics */}
        <Typography variant="h6" fontWeight="bold"  gutterBottom>
          🌱 GoodFoot Social Impact Metrics
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Chip icon={<Forest sx={{ color: "green" }} />} label={`Carbon Credits: ${employee.carbonCredits}`} variant="outlined" sx={{ width: "100%" }} />
          </Grid>
          <Grid item xs={6}>
            <Chip icon={<EmojiEvents sx={{ color: "orange" }} />} label={`Leaderboard Rank: #${employee.leaderboardRank || "N/A"}`} variant="outlined" sx={{ width: "100%" }} />
          </Grid>
          <Grid item xs={6}>
            <Chip icon={<Favorite sx={{ color: "red" }} />} label={`Eco-Challenges Completed: ${employee.ecoChallenges}`} variant="outlined" sx={{ width: "100%" }} />
          </Grid>
          <Grid item xs={6}>
            <Chip icon={<SelfImprovement sx={{ color: "purple" }} />} label={`Eco-Level: ${employee.ecoLevel}`} variant="outlined" sx={{ width: "100%" }} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Survey & Well-being Data */}
        <Typography variant="h6" fontWeight="bold"  gutterBottom>
          💙 Survey & Well-being Data
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Chip icon={<Work sx={{ color: "blue " }} />} label={`Satisfaction Score: ${employee.satisfactionScore}/10`} variant="outlined" sx={{ width: "100%" }} />
          </Grid>
          <Grid item xs={6}>
            <Chip icon={<People sx={{ color: "green" }} />} label={`Work-Life Balance: ${employee.workLifeBalance}/10`} variant="outlined" sx={{ width: "100%" }} />
          </Grid>
          <Grid item xs={6}>
            <Chip icon={<Security sx={{ color: "darkblue " }} />} label={`Mental Health Support: ${employee.mentalHealthSupport || "N/A"}/10`} variant="outlined" sx={{ width: "100%" }} />
          </Grid>
          <Grid item xs={6}>
            <Chip icon={<Work sx={{ color: "darkgreenrtant" }} />} label={`Career Development: ${employee.careerSatisfaction || "N/A"}/10`} variant="outlined" sx={{ width: "100%" }} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Workplace Safety & Community Engagement */}
        <Typography variant="h6" fontWeight="bold"  gutterBottom>
          🏢 Workplace Safety & Community Engagement
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Chip icon={<Security sx={{ color: "darkblue" }} />} label={`Safety Training: ${employee.safetyTraining}`} variant="outlined" sx={{ width: "100%" }} />
          </Grid>
          <Grid item xs={6}>
            <Chip icon={<VolunteerActivism sx={{ color: "red" }} />} label={`Volunteer Activities: ${employee.volunteerActivities}`} variant="outlined" sx={{ width: "100%" }} />
          </Grid>
          <Grid item xs={6}>
            <Chip icon={<Favorite sx={{ color: "red" }} />} label={`Community Hours: ${employee.volunteerHours} hrs`} variant="outlined" sx={{ width: "100%" }} />
          </Grid>
          <Grid item xs={6}>
            <Chip icon={<SelfImprovement sx={{ color: "purple" }} />} label={`Health & Wellness: ${employee.wellnessProgram}`} variant="outlined" sx={{ width: "100%" }} />
          </Grid>
        </Grid>

        <Box mt={4} textAlign="center">
          <Button variant="contained" color="primary" sx={{ borderRadius: 2 }} onClick={onClose}>
            Close
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeDetail;
