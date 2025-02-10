import React, { useState } from "react";
import "./DecarbinizationRoadmap.css";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  Paper,
  LinearProgress,
  Grid,
  CardContent,
  Card,
  Slider,
  useMediaQuery,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { Chart } from "react-google-charts";
import { Flag } from "@mui/icons-material";

const industries = [
  "Manufacturing",
  "Technology",
  "Energy",
  "Retail",
  "Finance",
];

const sampleOutput = {
  milestones: [
    {
      year: "2025",
      milestone: "Adopt 50% renewable energy",
      reduction: 20,
      start: 2024,
      end: 2025,
    },
    {
      year: "2027",
      milestone: "Switch 60% of fleet to EVs",
      reduction: 35,
      start: 2025,
      end: 2027,
    },
    {
      year: "2030",
      milestone: "Engage suppliers in carbon-neutral practices",
      reduction: 50,
      start: 2027,
      end: 2030,
    },
    {
      year: "2035",
      milestone: "Improve energy efficiency by 30%",
      reduction: 75,
      start: 2030,
      end: 2035,
    },
    {
      year: "2040",
      milestone: "Achieve Net Zero",
      reduction: 100,
      start: 2035,
      end: 2040,
    },
  ],
};

const DecarbonisationRoadmap = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [industry, setIndustry] = useState("Manufacturing");
  const [targetYear, setTargetYear] = useState("2040");
  const [emissions, setEmissions] = useState("5000");
  const [roadmapData, setRoadmapData] = useState(sampleOutput.milestones);

  const generateRoadmap = () => {
    setRoadmapData(sampleOutput.milestones);
  };

  const ganttData = [
    [
      "ID",
      "Milestone",
      "Start Date",
      "End Date",
      "Duration",
      "Percent Complete",
      "Dependencies",
    ],
    ...roadmapData.map(({ milestone, start, end, reduction }, index) => {
      const startDate = new Date(start, 0, 1);
      const endDate = new Date(end, 11, 31);
      const duration = (endDate - startDate) / (1000 * 60 * 60 * 24); // Convert milliseconds to days

      return [
        `Task${index + 1}`,
        milestone,
        startDate,
        endDate,
        duration, // FIX: Provide a valid number instead of null
        reduction,
        null,
      ];
    }),
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4, px: 3,mt:3 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: "bold", letterSpacing: "1px", color: "#1B5E20" }}
        gutterBottom
      >
        Decarbonisation Roadmap
      </Typography>
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {/* Industry Type Selection */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              p: 3,
              borderRadius: "16px",
              boxShadow: 4,
              transition: "0.3s",
              "&:hover": { boxShadow: 8, transform: "scale(1.02)" },
              textAlign: "center",
              height: "180px", // Ensures uniform card size
            }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: "1rem", fontWeight: "bold", color: "#2E7D32" }}
              >
                Select Industry Type
              </Typography>
              <TextField
                select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                fullWidth
                sx={{ mt: 1 }}
              >
                {industries.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </CardContent>
          </Card>
        </Grid>

        {/* Target Year Selection */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              p: 3,
              borderRadius: "16px",
              boxShadow: 4,
              transition: "0.3s",
              "&:hover": { boxShadow: 8, transform: "scale(1.02)" },
              textAlign: "center",
              height: "180px", // Consistent size
            }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: "1rem", fontWeight: "bold", color: "#2E7D32" }}
              >
                Target Year for Net Zero
              </Typography>
              <Box mt={1}>
                <Slider
                  value={targetYear}
                  onChange={(e, newValue) => setTargetYear(newValue)}
                  min={2025}
                  max={2050}
                  step={1}
                  marks
                  valueLabelDisplay="auto"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Current Emissions */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              p: 3,
              borderRadius: "16px",
              boxShadow: 4,
              transition: "0.3s",
              "&:hover": { boxShadow: 8, transform: "scale(1.02)" },
              textAlign: "center",
              height: "180px", // Consistent size
            }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: "1rem", fontWeight: "bold", color: "#2E7D32" }}
              >
                Current Emissions (tonnes CO₂e)
              </Typography>
              <TextField
                type="number"
                value={emissions}
                onChange={(e) => setEmissions(e.target.value)}
                fullWidth
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Generate Roadmap Button */}
        <Grid item xs={12} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
              borderRadius: "8px",
              transition: "0.3s",
              "&:hover": { backgroundColor: "#1B5E20" },
            }}
            onClick={generateRoadmap}
          >
            Generate Roadmap
          </Button>
        </Grid>
      </Grid>

      <Box sx={{display: "flex",flexDirection:"column",
        justifyContent: isMobile ? "flex-start" : "center",  p: 3, borderRadius: "10px", mt: 4 }}>
        <Timeline position={isMobile ? "right" : "alternate"}>
          {roadmapData.map((milestone, index) => (
            <TimelineItem
              key={index}
              sx={{
                transition: "all 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
                mx: { xs: 0, sm: 2 }, // Remove margin on mobile
              }}
            >
              <TimelineSeparator>
                <TimelineDot
                  sx={{
                    backgroundColor: "#00c853",
                    boxShadow: "0 4px 10px rgba(0, 200, 83, 0.4)",
                  }}
                >
                  <Flag sx={{ color: "#fff" }} />
                </TimelineDot>
                {index < roadmapData.length - 1 && (
                  <TimelineConnector
                    sx={{
                      height: { xs: "40px", sm: "60px" }, // Shorter connectors for mobile
                    }}
                  />
                )}
              </TimelineSeparator>
              <TimelineContent
                sx={{
                  textAlign: { xs: "left", sm: "inherit" }, // Left-align on mobile
                }}
              >
                <Paper
                  elevation={2}
                  sx={{
                    p: { xs: 2, sm: 3 }, // Smaller padding on mobile
                    mb: 2,
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#444",
                      fontSize: { xs: "14px", sm: "16px" }, // Smaller font size on mobile
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        color: "#00c853",
                        fontWeight: "bold",
                        fontSize: { xs: "16px", sm: "18px" }, // Adjust year font size
                      }}
                    >
                      {milestone.year}
                    </Typography>
                    : {milestone.milestone}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={milestone.reduction}
                    sx={{
                      height: { xs: 8, sm: 10 }, // Thinner progress bar on mobile
                      mt: 1,
                      backgroundColor: "#ccc",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#00c853",
                        transition: "width 1s ease-in-out",
                      },
                    }}
                  />
                </Paper>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>

        <Typography
          gutterBottom
          sx={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333", mt: 4 }}
        >
          Emission Reduction Progress
        </Typography>
        <Chart
          chartType="Gantt"
          width="100%"
          height={`${roadmapData.length * 50 + 100}px`} // Dynamic height
          data={ganttData}
          options={{
            gantt: {
              trackHeight: 40, // Improve readability
              barHeight: 30,
              percentEnabled: true,
              criticalPathEnabled: true,
              criticalPathStyle: {
                stroke: "#00c853",
                strokeWidth: 3,
              },
            },
          }}
        />
      </Box>
    </Container>
  );
};

export default DecarbonisationRoadmap;
