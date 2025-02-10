import React, { useState } from "react";
import { Container, Grid, Typography, Box, Chip ,Divider} from "@mui/material";
import { PeopleAlt, Forest, SentimentSatisfiedAlt } from "@mui/icons-material";
import EmployeeList from "./EmployeeList";
import TeamOverview from "./TeamOverview";
import EmployeeDetail from "./EmployeeDetail";
import Leaderboard from "./Leaderboard";
import Filters from "./Filters";

const TeamPage = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [filters, setFilters] = useState({ department: "", jobTitle: "", location: "", carbonCredits: "", ecoChallenges: "" });

  return (
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      {/* Minimal Header */}
      <Box 
        sx={{
          textAlign: "center",
          bgcolor: "primary.light",
          p: 3,
          borderRadius: 2,
          boxShadow: 2,
          mb: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="#008000">
          🌱 Team Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Track Employee Sustainability & Well-being
        </Typography>
        <Divider sx={{ mt: 2, width: "50%", mx: "auto", bgcolor: "primary.main", height: 2 }} />
      </Box>

      {/* Team Overview & Leaderboard */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <TeamOverview />
        </Grid>
        <Grid item xs={12} md={4}>
          <Leaderboard />
        </Grid>
      </Grid>

      {/* Filter & Search Section */}
      <Filters filters={filters} setFilters={setFilters} />

      {/* Employee List */}
      <Grid container spacing={2} sx={{ mt: "15px" }}>
        <Grid item xs={12}>
          <EmployeeList filters={filters} onSelectEmployee={setSelectedEmployee} />
        </Grid>
      </Grid>

      {/* Employee Detail Popup */}
      {selectedEmployee && (
        <EmployeeDetail 
          employee={selectedEmployee} 
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </Container>
  );
};

export default TeamPage;
