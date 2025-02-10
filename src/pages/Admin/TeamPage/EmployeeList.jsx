import React from "react";
import { Grid } from "@mui/material";
import EmployeeCard from "./EmployeeCard";

const EmployeeList = ({ filters, onSelectEmployee }) => {
  const employees = [
    {
      id: 1,
      name: "John Doe",
      jobTitle: "Software Engineer",
      department: "Engineering",
      location: "New York",
      carbonCredits: 200,
      ecoChallenges: 15,
      ecoLevel: 3,
      satisfactionScore: 4.5,
      workLifeBalance: 4.2,
      trainingHours: 40,
      communityEngagement: "Yes",
      safetyTraining: "Yes",
      volunteerHours: 10,
      profilePic:
        "https://images.unsplash.com/photo-1639747280804-dd2d6b3d88ac?w=500&auto=format&fit=crop&q=60",
    },
    {
      id: 2,
      name: "Jane Smith",
      jobTitle: "Project Manager",
      department: "Operations",
      location: "San Francisco",
      carbonCredits: 350,
      ecoChallenges: 20,
      ecoLevel: 5,
      satisfactionScore: 4.8,
      workLifeBalance: 4.6,
      trainingHours: 50,
      communityEngagement: "No",
      safetyTraining: "Yes",
      volunteerHours: 15,
      profilePic:
        "https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?w=500&auto=format&fit=crop&q=60",
    },
    {
      id: 3,
      name: "Jane Smith",
      jobTitle: "Project Manager",
      department: "Operations",
      location: "San Francisco",
      carbonCredits: 350,
      ecoChallenges: 20,
      ecoLevel: 5,
      satisfactionScore: 4.8,
      workLifeBalance: 4.6,
      trainingHours: 50,
      communityEngagement: "No",
      safetyTraining: "Yes",
      volunteerHours: 15,
      profilePic:
        "https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?w=500&auto=format&fit=crop&q=60",
    },
  ];

  return (
    <Grid container spacing={3} sx={{ padding: 2 }}>
    {employees.map((employee) => (
      <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={employee.id}>
        {/* Now, two EmployeeCard components per row on sm (600px) screens */}
        <EmployeeCard employee={employee} onSelectEmployee={onSelectEmployee} />
      </Grid>
    ))}
  </Grid>
  );
};

export default EmployeeList;
