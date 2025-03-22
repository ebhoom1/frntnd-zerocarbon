import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  Paper,
  Grid,
  CardContent,
  Card,
  Slider,
  useMediaQuery,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import {
  Timeline,
} from "@mui/lab";
import { Chart } from "react-google-charts";
import axios from "../../api/axios";
import { useSelector } from "react-redux";
import RoadmapTimelineItem from "./RoadmapTimeline";

const industries = [
  "Manufacturing",
  "Technology",
  "Energy",
  "Retail",
  "Finance",
];

const DecarbonisationRoadmap = () => {
  const userId = useSelector((state) => state.auth.user?.id);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [industry, setIndustry] = useState("");
  const [targetYear, setTargetYear] = useState(null);
  const [emissions, setEmissions] = useState(null);
  const [annualReduction, setAnnualReduction] = useState(null);
  const [energyMix, setEnergyMix] = useState("");
  const [technologyAdoption, setTechnologyAdoption] = useState("");
  const [operationalChanges, setOperationalChanges] = useState("");
  const [budgetConstraints, setBudgetConstraints] = useState(null);
  const [roadmapData, setRoadmapData] = useState([]);
  const [savedRoadmaps, setSavedRoadmaps] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  // ✅ ADD: State to track if saved roadmaps should be displayed
  const [showSavedRoadmaps, setShowSavedRoadmaps] = useState(false);
  console.log("roadmapData:", roadmapData);

  const generateRoadmap = async () => {
    if (
      !industry ||
      !targetYear ||
      !emissions ||
      !annualReduction ||
      !energyMix ||
      !technologyAdoption ||
      !operationalChanges ||
      !budgetConstraints
    ) {
      alert("Please fill in all fields before generating the roadmap.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/api/analyse-roadmap/calculate", {
        industry,
        targetYear,
        totalEmissions: emissions,
        annualReduction,
        energyMix,
        technologyAdoption,
        operationalChanges,
        budgetConstraints,
      });
      console.log("response:", response.data);

      setRoadmapData(response.data.analysedData.milestones);
    } catch (error) {
      console.error("Error generating roadmap:", error);
    } finally {
      setLoading(false);
    }
  };

  // const saveRoadmap = async () => {
  //   if (roadmapData.length === 0) {
  //     alert("Generate the roadmap before saving.");
  //     return;
  //   }
  //   setSaving(true);
  //   try {
  //     await axios.post("/api/analyse-roadmap/save", {
  //       userId:userId,
  //       industry,
  //       targetYear,
  //       totalEmissions: emissions,
  //       annualReduction,
  //       energyMix,
  //       technologyAdoption,
  //       operationalChanges,
  //       budgetConstraints,
  //       roadmapData,
  //     });
  //     alert("Roadmap saved successfully!");
  //   } catch (error) {
  //     console.error("Error saving roadmap:", error);
  //   } finally {
  //     setSaving(false);
  //   }
  // };

  const saveRoadmap = async () => {
    if (roadmapData.length === 0) {
      alert("Generate the roadmap before saving.");
      return;
    }
    setSaving(true);
    try {
      await axios.post("/api/analyse-roadmap/save", {
        userId,
        industry,
        targetYear,
        totalEmissions: emissions,
        annualReduction,
        energyMix,
        technologyAdoption,
        operationalChanges,
        budgetConstraints,
        roadmapData,
      });
      alert("Roadmap saved successfully!");
    } catch (error) {
      console.error("Error saving roadmap:", error);
      
      // Check if the error response contains a message
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("An error occurred while saving the roadmap. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };
  

  const fetchSavedRoadmaps = async () => {
    if (!showSavedRoadmaps) {
      setFetching(true);
      try {
        const response = await axios.get(`/api/analyse-roadmap/get/${userId}`);
        setRoadmapData([]);
        setSavedRoadmaps(response.data.roadmaps);
      } catch (error) {
        console.error("Error fetching saved roadmaps:", error);
      } finally {
        setFetching(false);
      }
    }
    setShowSavedRoadmaps(!showSavedRoadmaps); // Toggle visibility
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
      const duration = (endDate - startDate) / (1000 * 60 * 60 * 24);
      return [
        `Task${index + 1}`,
        milestone,
        startDate,
        endDate,
        duration,
        reduction,
        null,
      ];
    }),
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4, px: 3, mt: 3 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: "bold", color: "#1B5E20" }}
        gutterBottom
      >
        Decarbonisation Roadmap
      </Typography>
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: "16px", boxShadow: 4 }}>
            <CardContent>
              <Typography>Select Industry Type</Typography>
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

        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: "16px", boxShadow: 4 }}>
            <CardContent>
              <Typography>Target Year for Net Zero</Typography>
              <Slider
                value={targetYear || 2025}
                onChange={(e, newValue) => setTargetYear(newValue)}
                min={2025}
                max={2050}
                step={1}
                marks
                valueLabelDisplay="auto"
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: "16px", boxShadow: 4 }}>
            <CardContent>
              <Typography>Current Emissions (tonnes CO₂e)</Typography>
              <TextField
                type="text"
                value={emissions || ""}
                onChange={(e) => setEmissions(e.target.value)}
                fullWidth
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: "16px", boxShadow: 4 }}>
            <CardContent>
              <Typography>Annual Percentage Reduction Target</Typography>
              <TextField
                type="number"
                value={annualReduction || ""}
                onChange={(e) => setAnnualReduction(e.target.value)}
                fullWidth
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: "16px", boxShadow: 4 }}>
            <CardContent>
              <Typography>
                Current Energy Mix (Fossil vs. Renewables)
              </Typography>
              <TextField
                type="text"
                value={energyMix || ""}
                onChange={(e) => setEnergyMix(e.target.value)}
                fullWidth
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: "16px", boxShadow: 4 }}>
            <CardContent>
              <Typography>Planned Technology Adoption</Typography>
              <TextField
                type="text"
                value={technologyAdoption || ""}
                onChange={(e) => setTechnologyAdoption(e.target.value)}
                fullWidth
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: "16px", boxShadow: 4 }}>
            <CardContent>
              <Typography>Operational Changes</Typography>
              <TextField
                type="text"
                value={operationalChanges || ""}
                onChange={(e) => setOperationalChanges(e.target.value)}
                fullWidth
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: "16px", boxShadow: 4 }}>
            <CardContent>
              <Typography>Budget Constraints</Typography>
              <TextField
                type="number"
                value={budgetConstraints || ""}
                onChange={(e) => setBudgetConstraints(e.target.value)}
                fullWidth
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Button variant="contained" color="primary" onClick={generateRoadmap}>
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Generate Roadmap"
            )}
          </Button>
        </Grid>
        {roadmapData.length > 0 && (
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            sx={{ mt: 2 }}
          >
            <Button variant="contained" color="secondary" onClick={saveRoadmap}>
              {saving ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Save Roadmap"
              )}
            </Button>
          </Grid>
        )}
        {/* ✅ ADD: Toggle Button for Viewing Saved Roadmaps */}
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="center"
          sx={{ mt: 2 }}
        >
          <Button variant="contained" color="info" onClick={fetchSavedRoadmaps}>
            {fetching ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : showSavedRoadmaps ? (
              "Hide Saved Roadmaps"
            ) : (
              "View Saved Roadmaps"
            )}
          </Button>
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: isMobile ? "flex-start" : "center",
          p: 3,
          borderRadius: "10px",
          mt: 4,
        }}
      >
        {/* <Timeline position={isMobile ? "right" : "alternate"}>
          {roadmapData.map((milestone, index) => (
            <TimelineItem
              key={index}
              sx={{
                transition: "all 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
                mx: { xs: 0, sm: 2 },
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
                    sx={{ height: { xs: "40px", sm: "60px" } }}
                  />
                )}
              </TimelineSeparator>
              <TimelineContent
                sx={{ textAlign: { xs: "left", sm: "inherit" } }}
              >
                <Paper
                  elevation={2}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    mb: 2,
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                  }}
                >
                  <Typography
                    sx={{ color: "#444", fontSize: { xs: "14px", sm: "16px" } }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        color: "#00c853",
                        fontWeight: "bold",
                        fontSize: { xs: "16px", sm: "18px" },
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
                      height: { xs: 8, sm: 10 },
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
        </Timeline> */}

        {/* Generated Roadmap */}
        {roadmapData.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#333" }}
            >
              Generated Roadmap
            </Typography>
            <Timeline position={isMobile ? "right" : "alternate"}>
              {roadmapData.map((milestone, index) => (
                <RoadmapTimelineItem
                  key={index}
                  milestone={milestone}
                  index={index}
                  roadmapData={roadmapData}
                />
              ))}
            </Timeline>
          </Box>
        )}

        {/* Display Saved Roadmaps */}
        {showSavedRoadmaps &&  (
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#333" }}
            >
              Saved Roadmaps
            </Typography>
            {savedRoadmaps.length > 0 ? (
            savedRoadmaps.map((roadmap, index) => (
              <Box key={index} sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#00c853" }}
                >
                  {roadmap.industry} - Target Year: {roadmap.targetYear}
                </Typography>
                <Timeline position={isMobile ? "right" : "alternate"}>
                  {roadmap.milestones.map((milestone, i) => (
                    <RoadmapTimelineItem
                      key={i}
                      milestone={milestone}
                      index={i}
                      roadmapData={roadmap.milestones}
                    />
                  ))}
                </Timeline>
              </Box>
            )) 
            ):(
              // ✅ Display a message if no saved roadmaps exist
            <Typography sx={{ textAlign: "center", color: "#666", fontStyle: "italic", mt: 2 }}>
            No saved roadmaps available.
          </Typography>
            )}
          </Box>
        )}

        <Typography
          gutterBottom
          sx={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333", mt: 4 }}
        >
          Emission Reduction Progress
        </Typography>
        {roadmapData && roadmapData.length > 0 ? (
          <Chart
            chartType="Gantt"
            width="100%"
            height={`${roadmapData.length * 50 + 100}px`}
            data={ganttData}
            options={{
              gantt: {
                trackHeight: 40,
                barHeight: 30,
                percentEnabled: true,
                criticalPathEnabled: true,
                criticalPathStyle: { stroke: "#00c853", strokeWidth: 3 },
              },
            }}
          />
        ) : (
          <Typography>No data yet. Please generate the roadmap.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default DecarbonisationRoadmap;
