import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import fuels from "./Fuel.json"; // Import the Fuel JSON file

const FuelInput = ({ name, value, onChange }) => {
  const handleFuelChange = (event, newValue) => {
    onChange({ target: { name, value: newValue || "" } });
  };

  const handleFuelInputChange = (event, newInputValue) => {
    onChange({ target: { name, value: newInputValue || "" } });
  };

  return (
    <Autocomplete
      freeSolo
      options={fuels}
      value={value}
      onChange={handleFuelChange}
      inputValue={value}
      onInputChange={handleFuelInputChange}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          label="Fuel"
          variant="outlined"
          helperText="Type or select a fuel from the list"
          fullWidth
        />
      )}
    />
  );
};

export default FuelInput;
