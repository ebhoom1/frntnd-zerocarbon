import React, { useState } from "react";
import { Paper, Typography, Box, Button } from "@mui/material";

const NodeCard = ({ node, onScopeSelect }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  const handleScopeSelect = (scope) => {
    onScopeSelect(scope);
    setExpanded(false); // Collapse the dropdown after selecting a scope
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        border: "2px solid green",
        cursor: "pointer",
        position: "relative",
      }}
      onClick={handleToggleExpand}
    >
      <Typography variant="h6">{node.data.label}</Typography>

      {expanded && (
        <Box sx={{ marginTop: 2 }}>
          {node.data.details.scopeDetails.map((scope, index) => (
            <Button
              key={index}
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginBottom: 1 }}
              onClick={(e) => {
                e.stopPropagation(); // Prevent click from collapsing the card
                handleScopeSelect(scope);
              }}
            >
              {`Scope ${index + 1}`}
            </Button>
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default NodeCard;
