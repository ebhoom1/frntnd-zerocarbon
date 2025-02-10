import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box, Paper, Grid, Chip, Stack } from "@mui/material";

const EmployeeEngagementTracker = () => {
  const [activity, setActivity] = useState("");
  const [participationRate, setParticipationRate] = useState("");
  const [engagementData, setEngagementData] = useState([
    { activity: "Sustainability Workshop", participationRate: "75%", carbonCredits: 10 },
    { activity: "Green Commuting Challenge", participationRate: "60%", carbonCredits: 8 },
    { activity: "Volunteer Tree Planting", participationRate: "85%", carbonCredits: 12 }
  ]);

  const handleAddActivity = () => {
    if (activity && participationRate) {
      setEngagementData([...engagementData, { activity, participationRate: participationRate + "%", carbonCredits: Math.floor(Math.random() * 15) + 5 }]);
      setActivity("");
      setParticipationRate("");
    }
  };

  return (
    <Box sx={{backgroundColor: "#F1F8E9", p: 4 }}>
      <Container maxWidth="lg">
        <Paper elevation={4} sx={{ p: 4, textAlign: "center", backgroundColor: "#FFFFFF", borderRadius: "12px" }}>
          <Typography sx={{ fontSize: "2rem", fontWeight: "bold", color: "#388E3C" }}>Employee Engagement Tracker</Typography>
          <Typography sx={{ fontSize: "1rem", color: "#666" }}>
            Track employee contributions, earned carbon credits, and gamified leaderboards.
          </Typography>
        </Paper>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={4} sx={{ p: 4, backgroundColor: "#FFFFFF", borderRadius: "12px" }}>
              <Typography sx={{ fontSize: "1.5rem", color: "#388E3C", mb: 2 }}>Add Engagement Activity</Typography>
              <TextField
                label="Activity Name"
                variant="outlined"
                fullWidth
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Participation Rate (%)"
                variant="outlined"
                fullWidth
                type="number"
                value={participationRate}
                onChange={(e) => setParticipationRate(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="primary" onClick={handleAddActivity}>
                Add Activity
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={4} sx={{ p: 4, backgroundColor: "#FFFFFF", borderRadius: "12px" }}>
              <Typography sx={{ fontSize: "1.5rem", color: "#388E3C", mb: 2 }}>Engagement Data Overview</Typography>
              <Stack spacing={2}>
                {engagementData.map((row, index) => (
                  <Chip key={index} label={`${row.activity} - ${row.participationRate} - ${row.carbonCredits} Carbon Credits`} sx={{ fontSize: "1rem", p: 1, backgroundColor: "#E8F5E9", color: "#388E3C" }} />
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>

       
      </Container>
    </Box>
  );
};

export default EmployeeEngagementTracker;
