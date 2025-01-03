import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import activities from "./Activity.json"; // Assuming the JSON file is in the same directory

const ActivityInput = ({ name, value, onChange }) => {
  const handleActivityChange = (event, newValue) => {
    onChange({ target: { name, value: newValue || "" } });
  };

  const handleActivityInputChange = (event, newInputValue) => {
    onChange({ target: { name, value: newInputValue || "" } });
  };

  return (
    <Autocomplete
      freeSolo
      options={activities}
      value={value}
      onChange={handleActivityChange}
      inputValue={value}
      onInputChange={handleActivityInputChange}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          label="Activity"
          variant="outlined"
          helperText="Type or select an activity from the list"
          fullWidth
        />
      )}
    />
  );
};

export default ActivityInput;
