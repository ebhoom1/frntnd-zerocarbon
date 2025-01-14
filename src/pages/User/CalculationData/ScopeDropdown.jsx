import React from "react";
import { Box, MenuItem, Select } from "@mui/material";

const ScopeDropdown = ({ scopes, onSelectScope }) => {
  return (
    <Box sx={{ width: "100%", marginTop: 1 }}>
      <Select
        fullWidth
        defaultValue=""
        onChange={(e) => onSelectScope(scopes[e.target.value])}
        displayEmpty
      >
        <MenuItem value="" disabled>
          Select a Scope
        </MenuItem>
        {scopes.map((scope, index) => (
          <MenuItem key={index} value={index}>
            {`Scope ${index + 1}`}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default ScopeDropdown;
