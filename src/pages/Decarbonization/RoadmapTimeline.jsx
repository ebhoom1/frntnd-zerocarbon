import React from "react";
import {
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { Flag } from "@mui/icons-material";
import { Typography, Paper, LinearProgress } from "@mui/material";

const RoadmapTimelineItem = ({ milestone, index, roadmapData }) => {
  return (
    <TimelineItem
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
          <TimelineConnector sx={{ height: { xs: "40px", sm: "60px" } }} />
        )}
      </TimelineSeparator>
      <TimelineContent sx={{ textAlign: { xs: "left", sm: "inherit" } }}>
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
            <strong style={{ color: "#00c853", fontSize: "16px" }}>
              {milestone.end}
            </strong>
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
  );
};

export default RoadmapTimelineItem;
