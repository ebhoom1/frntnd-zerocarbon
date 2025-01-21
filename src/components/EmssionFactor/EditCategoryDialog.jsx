import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
  Box,
  MenuItem,
} from "@mui/material";
import axios from "../../api/axios";

const EditCategoryDialog = ({ open, onClose, category, onCategoryEdited }) => {
  const [formData, setFormData] = useState({
    name: "",
    activities: [
      {
        name: "",
        fuels: [
          {
            name: "",
            units: [
              {
                type: "",
                kgCO2e: "",
                kgCO2: "",
                kgCH4: "",
                kgN2O: "",
                // kgHFC: "",
                // kgPFC: "",
                // kgSF6: "",
                // kgNF3: "",
              },
            ],
            reference: "",
            source:
              "",
          },
        ],
      },
    ],
  });

  useEffect(() => {
    if (category) {
      setFormData(category);
    }
  }, [category]);

  const handleChange = (e, path) => {
    const keys = path.split(".");
    const lastKey = keys.pop();

    const updatedForm = { ...formData };
    let temp = updatedForm;
    keys.forEach((key) => (temp = temp[key]));
    temp[lastKey] = e.target.value;

    setFormData(updatedForm);
  };

  const handleAddFuel = (activityIndex) => {
    const updatedForm = { ...formData };
    updatedForm.activities[activityIndex].fuels.push({
      name: "",
      units: [],
      reference: "",
      source:
        "",
    });
    setFormData(updatedForm);
  };

  const handleAddUnit = (activityIndex, fuelIndex) => {
    const updatedForm = { ...formData };
    updatedForm.activities[activityIndex].fuels[fuelIndex].units.push({
      type: "",
      kgCO2e: "",
      kgCO2: "",
      kgCH4: "",
      kgN2O: "",
      // kgHFC: "",
      // kgPFC: "",
      // kgSF6: "",
      // kgNF3: "",
    });
    setFormData(updatedForm);
  };

  // const handleSave = async () => {
  //   try {
  //     await axios.patch(`/api/categories/${category._id}`, formData);
  //     alert("Activity added successfully!");
  //     onCategoryEdited();
  //   } catch (error) {
  //     console.error("Error updating category:", error);
  //   }
  // };

  const handleSave = async () => {
    // Deep copy formData to avoid mutating the original state
    const cleanedFormData = JSON.parse(JSON.stringify(formData));

    // Validation and Cleanup
    let hasEmptyFields = false; // To track incomplete inputs

    cleanedFormData.activities.forEach((activity, activityIndex) => {
      // Check for empty fuels
      activity.fuels = activity.fuels.filter((fuel, fuelIndex) => {
        const isValidFuel = fuel.name && fuel.name.trim(); // Validate fuel name
        if (!isValidFuel) {
          hasEmptyFields = true; // Track empty fields
        }

        // Check for empty units
        fuel.units = fuel.units.filter((unit, unitIndex) => {
          const isValidUnit =
            unit.type &&
            unit.type.trim() &&
            unit.kgCO2e &&
            unit.kgCO2e.toString().trim();
          if (!isValidUnit) {
            hasEmptyFields = true; // Track empty fields
          }
          return isValidUnit; // Keep valid units
        });

        return isValidFuel; // Keep valid fuels
      });

      activity.fuels.forEach((fuel) => {
        // Ensure reference and source are populated
        if (!fuel.reference) {
          fuel.reference = "DEFRA"; // Default value if missing
        }
        if (!fuel.source) {
          fuel.source =
            ""; // Default value if missing
        }
      });
    });

    // Alert if there are empty fields
    if (hasEmptyFields) {
      const proceed = window.confirm(
        "Some fuels or units are incomplete or missing. Do you want to proceed with saving?"
      );
      if (!proceed) {
        return; // Stop saving if the user cancels
      }
    }

    // Proceed with saving cleaned data
    try {
      await axios.patch(`/api/categories/${category._id}`, cleanedFormData);
      alert("Category updated successfully!");
      onCategoryEdited(); // Callback to refresh the parent view
    } catch (error) {
      console.error("Error updating category:", error);
      alert("An error occurred while updating the category.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Edit Category</DialogTitle>
      <DialogContent>
        <Box>
          <TextField
            fullWidth
            label="Category Name"
            value={formData.name}
            onChange={(e) => handleChange(e, "name")}
            margin="normal"
          />
          {formData.activities.map((activity, activityIndex) => (
            <Box key={activityIndex} sx={{ mt: 2 }}>
              <Typography variant="h6">Activity {activityIndex + 1}</Typography>
              <TextField
                fullWidth
                label="Activity Name"
                value={activity.name}
                onChange={(e) =>
                  handleChange(e, `activities.${activityIndex}.name`)
                }
                margin="normal"
              />
              {activity.fuels.map((fuel, fuelIndex) => (
                <Box
                  key={fuelIndex}
                  sx={{
                    mt: 2,
                    pl: 2,
                    borderLeft: "2px solid gray",
                  }}
                >
                  <Typography variant="subtitle1">
                    Fuel {fuelIndex + 1}
                  </Typography>
                  <TextField
                    fullWidth
                    label="Fuel Name"
                    value={fuel.name}
                    onChange={(e) =>
                      handleChange(
                        e,
                        `activities.${activityIndex}.fuels.${fuelIndex}.name`
                      )
                    }
                    margin="normal"
                  />
                  {/* <TextField
                    fullWidth
                    label="Fuel Reference"
                    value={fuel.reference}
                    onChange={(e) =>
                      handleChange(
                        e,
                        `activities.${activityIndex}.fuels.${fuelIndex}.reference`
                      )
                    }
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Fuel Source"
                    value={fuel.source}
                    onChange={(e) =>
                      handleChange(
                        e,
                        `activities.${activityIndex}.fuels.${fuelIndex}.source`
                      )
                    }
                    margin="normal"
                  /> */}
                  <TextField
                    fullWidth
                    label="Fuel Reference"
                    value={fuel.reference || "DEFRA"} // Display "DEFRA" if value is empty
                    onChange={(e) =>
                      handleChange(
                        e,
                        `activities.${activityIndex}.fuels.${fuelIndex}.reference`
                      )
                    }
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Fuel Source"
                    value={
                      fuel.source 
                    } // Display default value if empty
                    onChange={(e) =>
                      handleChange(
                        e,
                        `activities.${activityIndex}.fuels.${fuelIndex}.source`
                      )
                    }
                    margin="normal"
                  />

                  {fuel.units.map((unit, unitIndex) => (
                    <Box
                      key={unitIndex}
                      sx={{ mt: 2, pl: 2, borderLeft: "2px solid lightgray" }}
                    >
                      <Typography variant="body1">
                        Unit {unitIndex + 1}
                      </Typography>
                      {/* <TextField
                        fullWidth
                        label="Unit Type"
                        value={unit.type}
                        onChange={(e) =>
                          handleChange(
                            e,
                            `activities.${activityIndex}.fuels.${fuelIndex}.units.${unitIndex}.type`
                          )
                        }
                        margin="normal"
                      /> */}

                      <TextField
                        select
                        fullWidth
                        label="Unit Type"
                        value={unit.type}
                        onChange={(e) =>
                          handleChange(
                            e,
                            `activities.${activityIndex}.fuels.${fuelIndex}.units.${unitIndex}.type`
                          )
                        }
                        sx={{ mb: 2 }}
                      >
                        <MenuItem value="tonnes">tonnes</MenuItem>
                        <MenuItem value="litres">litres</MenuItem>
                        <MenuItem value="kWh (Net CV)">kWh (Net CV)</MenuItem>
                        <MenuItem value="kWh (Gross CV)">
                          kWh (Gross CV)
                        </MenuItem>
                        <MenuItem value="cubic metres">
                        cubic metres
                        </MenuItem>
                      </TextField>
                      <TextField
                        fullWidth
                        label="kgCO2e"
                        value={unit.kgCO2e}
                        onChange={(e) =>
                          handleChange(
                            e,
                            `activities.${activityIndex}.fuels.${fuelIndex}.units.${unitIndex}.kgCO2e`
                          )
                        }
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="kgCO2"
                        value={unit.kgCO2}
                        onChange={(e) =>
                          handleChange(
                            e,
                            `activities.${activityIndex}.fuels.${fuelIndex}.units.${unitIndex}.kgCO2`
                          )
                        }
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="kgCH4"
                        value={unit.kgCH4}
                        onChange={(e) =>
                          handleChange(
                            e,
                            `activities.${activityIndex}.fuels.${fuelIndex}.units.${unitIndex}.kgCH4`
                          )
                        }
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="kgN2O"
                        value={unit.kgN2O}
                        onChange={(e) =>
                          handleChange(
                            e,
                            `activities.${activityIndex}.fuels.${fuelIndex}.units.${unitIndex}.kgN2O`
                          )
                        }
                        margin="normal"
                      />
                      {/* <TextField
                        fullWidth
                        label="kgHFC"
                        value={unit.kgHFC}
                        onChange={(e) =>
                          handleChange(
                            e,
                            `activities.${activityIndex}.fuels.${fuelIndex}.units.${unitIndex}.kgHFC`
                          )
                        }
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="kgPFC"
                        value={unit.kgPFC}
                        onChange={(e) =>
                          handleChange(
                            e,
                            `activities.${activityIndex}.fuels.${fuelIndex}.units.${unitIndex}.kgPFC`
                          )
                        }
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="kgSF6"
                        value={unit.kgSF6}
                        onChange={(e) =>
                          handleChange(
                            e,
                            `activities.${activityIndex}.fuels.${fuelIndex}.units.${unitIndex}.kgSF6`
                          )
                        }
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="kgNF3"
                        value={unit.kgNF3}
                        onChange={(e) =>
                          handleChange(
                            e,
                            `activities.${activityIndex}.fuels.${fuelIndex}.units.${unitIndex}.kgNF3`
                          )
                        }
                        margin="normal"
                      /> */}
                    </Box>
                  ))}
                  <Button
                    variant="outlined"
                    onClick={() => handleAddUnit(activityIndex, fuelIndex)}
                  >
                    Add Unit
                  </Button>
                </Box>
              ))}
              <Button
                sx={{ mt: 2 }}
                variant="outlined"
                onClick={() => handleAddFuel(activityIndex)}
              >
                Add Fuel
              </Button>
            </Box>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCategoryDialog;
