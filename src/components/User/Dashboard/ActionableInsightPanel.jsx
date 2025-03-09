import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import ForestIcon from "@mui/icons-material/Forest";
import GroupsIcon from "@mui/icons-material/Groups";
import AssessmentIcon from "@mui/icons-material/Assessment";

const actionableInsights = [
  {
    title: "Suggested Carbon Offset Projects",
    icon: <ForestIcon style={{ color: "#388E3C", fontSize: 30 }} />,
    items: [
      "🌍 Tree Plantation Initiative - 10,000 trees",
      "☀️ Solar Energy Integration - 500 panels",
      "♻️ Waste-to-Energy - Convert 30% office waste",
    ],
  },
  {
    title: "Employee Engagement in ESG Activities",
    icon: <GroupsIcon style={{ color: "#1976D2", fontSize: 30 }} />,
    items: [
      "📅 Volunteer Hours: 1,200 hrs in cleanups",
      "🏆 Green Champion Awards: 50 employees",
      "🚲 Eco-Transport: 300 employees switched",
    ],
  },
  {
    title: "ESG Reporting Status",
    icon: <AssessmentIcon style={{ color: "#D32F2F", fontSize: 30 }} />,
    items: [
      "✅ Q1 ESG Report Submitted (March 2025)",
      "⚠️ Pending Carbon Audit (Due: April 15)",
      "📈 Sustainability Score: 85/100 (+10%)",
    ],
  },
];

const ActionableInsightsPanel = () => {
  return (
    <Grid container spacing={3}>
      {actionableInsights.map((section, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Card
            sx={{
              borderRadius: "12px",
              boxShadow: 3,
              backgroundColor: "#F8FAFC",
            }}
          >
            <CardContent>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>{section.icon}</Grid>
                <Grid item>
                  <Typography variant="h7" fontWeight="bold">
                    {section.title}
                  </Typography>
                </Grid>
              </Grid>
              <ul style={{ paddingLeft: "20px", marginTop: "10px" }}>
                {section.items.map((item, i) => (
                  <li key={i}>
                    <Typography variant="body2" color="gray">{item}</Typography>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ActionableInsightsPanel;
