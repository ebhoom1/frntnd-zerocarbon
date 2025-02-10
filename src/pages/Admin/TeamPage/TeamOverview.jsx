import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import {
  People,
  Equalizer,
  EmojiNature,
  Score,
  AccessTime,
  HealthAndSafety,
  Groups,
  SentimentSatisfiedAlt,
  EventAvailable,

} from "@mui/icons-material";

const metrics = [
  { icon: <People />, title: "Total Employees", value: "XX", color: "#27667B" },
  {
    icon: <Equalizer />,
    title: "Diversity Ratio",
    value: (
        <Typography variant="body2" sx={{ whiteSpace: "wrap" }}>
          <Typography component="span" sx={{ fontSize: "0.875rem" }}>Male </Typography>
          <Typography component="span" sx={{ fontSize: "0.875rem", fontWeight: "bold" }}>X% </Typography> |  
          <Typography component="span" sx={{ fontSize: "0.875rem" }}>Female </Typography>
          <Typography component="span" sx={{ fontSize: "0.875rem", fontWeight: "bold" }}>X% </Typography> |  
          <Typography component="span" sx={{ fontSize: "0.875rem" }}>Non-Binary </Typography>
          <Typography component="span" sx={{ fontSize: "0.875rem", fontWeight: "bold" }}>X%</Typography>
        </Typography>
      ),
    color: "#FBA518",
  },
    { icon: <EmojiNature />, title: "Total Completed Eco-Challenges", value: "XXXX", color: "#4CAF50" },
  { icon: <Score />, title: "Total Earned Carbon Credits", value: "XXXXX", color: "#FFC107" },
  { icon: <AccessTime />, title: "Avg. Training Hours Per Employee", value: "XX hours", color: "#03A9F4" },
  { icon: <HealthAndSafety />, title: "Health & Safety Compliance Rate", value: "XX%", color: "#E53935" },
  { icon: <Groups />, title: "Community Engagement Score", value: "X/10", color: "#FF8383" },
  { icon: <SentimentSatisfiedAlt />, title: "Workplace Satisfaction Score", value: "X/10", color: "#640D5F" },
  { icon: <EventAvailable />, title: "Avg. Eco-Challenge Participation", value: "XX", color: "#4CAF50" },
];

const TeamOverview = () => {
  return (
    <Card
      sx={{
        marginBottom: 3,
        padding: 4,
        borderRadius: 3,
        boxShadow: 4,
        background: "linear-gradient(to right, #66CC66, #ffffff)",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "center", color: "#008000", mb: 3 }}
        >
  
  Team Overview
       
        </Typography>
        <Grid container spacing={3}>
          {metrics.map((metric, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                display="flex"
                alignItems="center"
                gap={2}
                sx={{
                  padding: 2,
                  borderRadius: 2,
                  boxShadow: 2,
                  backgroundColor: "#ffffff",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.05)", boxShadow: 4 },
                }}
              >
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    backgroundColor: metric.color + "20",
                  }}
                >
                  {React.cloneElement(metric.icon, { sx: { color: metric.color, fontSize: 30 } })}
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#555" }}>
                    {metric.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#333" }}>
                    {metric.value}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TeamOverview;
