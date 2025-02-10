import React from "react";
import { Card, CardContent, Avatar, Typography, Box, Button, Divider, Grid, Chip } from "@mui/material";
import {Forest,  Work, EmojiEvents, Star, People, VolunteerActivism } from "@mui/icons-material";

const EmployeeCard = ({ employee, onSelectEmployee }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
        textAlign: "center",
        boxShadow: 3,
        borderRadius: 3,
        transition: "0.3s",
        '&:hover': { boxShadow: 6 },
        width: "100%",
        minHeight: 320
      }}
    >
      {/* Employee Profile Image */}
      <Avatar src={employee.profilePic} alt={employee.name} sx={{ width: 90, height: 90 }} />

      {/* Employee Basic Info */}
      <CardContent sx={{ width: "100%", paddingBottom: "8px" }}>
        <Typography variant="h6" fontWeight="bold" sx={{ color: "#2C3E50" }}>
          {employee.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "#7F8C8D" }}>
          {employee.jobTitle} - {employee.department}
        </Typography>
        <Typography variant="body2" sx={{ color: "#7F8C8D", mb: 2 }}>
          {employee.location}
        </Typography>

        <Divider sx={{ marginBottom: 2, width: "100%" }} />

        {/* Employee Stats Section */}
        <Grid container spacing={1} sx={{ textAlign: "left" }}>
          <Grid item xs={6}>
            <Chip
              icon={<Forest sx={{ color: "green !important" }} />}
              label={`Carbon Credits: ${employee.carbonCredits}`}
              variant="outlined"
              sx={{ width: "100%", fontSize: "12px", fontWeight: 500 }}
            />
          </Grid>
          <Grid item xs={6}>
            <Chip
              icon={<EmojiEvents sx={{ color: "orange !important" }} />}
              label={`Eco-Level: ${employee.ecoLevel}`}
              variant="outlined"
              sx={{ width: "100%", fontSize: "12px", fontWeight: 500 }}
            />
          </Grid>
          <Grid item xs={6}>
            <Chip
              icon={<Work sx={{ color: "blue !important" }} />}
              label={`Training Hours: ${employee.trainingHours}`}
              variant="outlined"
              sx={{ width: "100%", fontSize: "12px", fontWeight: 500 }}
            />
          </Grid>
          <Grid item xs={6}>
            <Chip
              icon={<Star sx={{ color: "gold !important" }} />}
              label={`Satisfaction: ${employee.satisfactionScore}`}
              variant="outlined"
              sx={{ width: "100%", fontSize: "12px", fontWeight: 500 }}
            />
          </Grid>
          <Grid item xs={6}>
            <Chip
              icon={<People sx={{ color: "purple !important" }} />}
              label={`Community: ${employee.communityEngagement}`}
              variant="outlined"
              sx={{ width: "100%", fontSize: "12px", fontWeight: 500 }}
            />
          </Grid>
          {employee.volunteerHours > 0 && (
            <Grid item xs={6}>
              <Chip
                icon={<VolunteerActivism sx={{ color: "red !important" }} />}
                label={`Volunteer: ${employee.volunteerHours} hrs`}
                variant="outlined"
                sx={{ width: "100%", fontSize: "12px", fontWeight: 500 }}
              />
            </Grid>
          )}
        </Grid>

        {/* View Details Button */}
        <Button 
          variant="contained" 
          color="primary" 
          size="small" 
          sx={{ marginTop: 2, borderRadius: 2 }}
          onClick={() => onSelectEmployee(employee)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;
