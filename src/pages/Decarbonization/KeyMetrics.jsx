import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  useTheme,
  Box,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Sample Data
const sampleEmissionsData = [
  { year: 2020, emissions: 120 },
  { year: 2021, emissions: 110 },
  { year: 2022, emissions: 100 },
  { year: 2023, emissions: 90 },
  { year: 2024, emissions: 75 },
];

const industryBenchmark = 85; // Industry average emissions

const KeyMetrics = () => {
  const theme = useTheme(); // Get current theme

  return (
    <Grid container spacing={2} sx={{ mt: 2, px: 2 }}>
      {/* Line Chart - Left Side */}
      <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
        <Card
          sx={{
            position: "relative", // Needed for overlay positioning
            backgroundImage: "url('/linechart-bg.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "#fff",
            p: 3,
            borderRadius: "16px",
            boxShadow: 6,
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": { transform: "scale(1.03)", boxShadow: 10 },
            width: "95%",
            maxWidth: "600px",
            overflow: "hidden", // Ensures nothing overflows
          }}
        >
          {/* Full Overlay */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.4)", // Dark overlay with reduced opacity
              borderRadius: "16px", // Matches the card border radius
              zIndex: 1, // Ensures it's above the background
            }}
          />

          <CardContent
            sx={{
              position: "relative", // Keeps content above overlay
              zIndex: 2, // Ensures content is on top
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ fontSize: "1.4rem", fontWeight: "bold", color: "#fff", textAlign: "center" }}>
              Annual Emissions Trend
            </Typography>
            <Box sx={{ width: "90%", maxWidth: "500px", mt: 2 }}>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={sampleEmissionsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.5)" />
                  <XAxis dataKey="year" tick={{ fill: "#fff", fontSize: 14, fontWeight: "bold" }} />
                  <YAxis tick={{ fill: "#fff", fontSize: 14, fontWeight: "bold" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#333",
                      color: "#fff",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="emissions"
                    stroke="#FFEB3B"
                    strokeWidth={4}
                    dot={{ r: 7, fill: "#FFEB3B", strokeWidth: 2, stroke: "#fff" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Right Side - Metrics Cards */}
<Grid item xs={12} md={6} container spacing={2}>
  {[
    {
      title: "Current Carbon Footprint",
      value: "75 tons CO₂e",
      image: "/footprint.webp",
    },
    {
      title: "Projected Net Zero Year",
      value: "Estimated: 2040",
      image: "/netzero.webp",
    },
    {
      title: "Target Reduction Rate",
      value: "Goal: 4.5% Annual Reduction",
      image: "/reduction.webp",
    },
    {
      title: "Industry Benchmark Comparison",
      value: `Your Emissions: 75 tons CO₂e \n Industry Average: ${industryBenchmark} tons CO₂e`,
      image: null, 
    },
  ].map((card, index) => (
    <Grid item xs={12} md={6} key={index}>
      <Card
        sx={{
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          p: 2,
          borderRadius: "16px",
          boxShadow: 3,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
          height: "180px", // Consistent card height
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative", // Enables positioning the image
        }}
      >
        <CardContent>
          <Typography
            fontWeight="bold"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "1.2rem",
              color: "#2E7D32",
            }}
          >
            {card.title}
          </Typography>
          <Typography sx={{ mt: 1 }}>
            {card.value.split("\n").map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </Typography>
        </CardContent>

        {/* Image in Bottom-Right Corner */}
        {card.image && (
        <Box
          component="img"
          src={card.image}
        alt=""
          sx={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            width: "100px", // Adjusted for proper fit
            height: "100px", // Keeps it proportional
            opacity: 0.7, // Slight transparency for aesthetics
          }}
        />
        )}
      </Card>
    </Grid>
  ))}
</Grid>

    </Grid>
  );
};

export default KeyMetrics;
