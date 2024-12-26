

import React, { useState } from "react";
import axios from '../../api/axios';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
} from "@mui/material";

const ActivityFormDialog = ({ open, onClose, categoryId, onActivityAdded }) => {
  const [formData, setFormData] = useState({
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
            reference: "DEFRA",
            source: "https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2024",
          },
        ],
      },
    ],
  });

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
      reference: "DEFRA",
      source: "https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2024",
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

  const handleSubmit = async () => {
    try {
      if (!categoryId) {
        alert("Category ID is required to add an activity.");
        return;
      }
  
      const response = await axios.post("/api/categories/activity", {
        categoryId,
        activity: formData.activities[0], // Since we're adding one activity at a time
      });
  
      alert("Activity added successfully!");
      console.log("Response:", response.data);
      onActivityAdded(); // Callback to refresh the table
      onClose(); // Close the dialog
    } catch (error) {
      console.error("Error adding activity:", error);
      alert("Failed to add activity.");
    }
  };
  

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add Activity</DialogTitle>
      <DialogContent>
        <form>
          <Grid container spacing={2}>
            {formData.activities.map((activity, activityIndex) => (
              <Grid item xs={12} key={activityIndex}>
                <Typography variant="h6">Activity</Typography>
                <TextField
                  fullWidth
                  label="Activity Name"
                  value={activity.name}
                  onChange={(e) =>
                    handleChange(e, `activities.${activityIndex}.name`)
                  }
                />
                {activity.fuels.map((fuel, fuelIndex) => (
                  <Box
                    key={fuelIndex}
                    sx={{
                      mt: 2,
                      pl: 2,
                      borderLeft: "2px solid gray",
                      "& .MuiTextField-root": { mb: 2 },
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
                    />
                    <TextField
                      fullWidth
                      label="Fuel Reference"
                      value={fuel.reference}
                      onChange={(e) =>
                        handleChange(
                          e,
                          `activities.${activityIndex}.fuels.${fuelIndex}.reference`
                        )
                      }
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
                    />
                    {fuel.units.map((unit, unitIndex) => (
                      <Box
                        key={unitIndex}
                        sx={{
                          mt: 2,
                          pl: 2,
                          borderLeft: "2px solid lightgray",
                        }}
                      >
                        <Typography variant="body1">
                          Unit {unitIndex + 1}
                        </Typography>
                        <TextField
                          fullWidth
                          label="Unit Type"
                          value={unit.type}
                          onChange={(e) =>
                            handleChange(
                              e,
                              `activities.${activityIndex}.fuels.${fuelIndex}.units.${unitIndex}.type`
                            )
                          }
                        />
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
              </Grid>
            ))}
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActivityFormDialog;
