import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, Grid } from "@mui/material";
import axios from "../../api/axios";

const EmissionFactorForm = () => {
    const navigate=useNavigate();
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
                kgHFC: "",
                kgPFC: "",
                kgSF6: "",
                kgNF3: "",
              },
            ],
            reference: "",
            source: "",
          },
        ],
      },
    ],
  });


  const initialFormData = {
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
                kgHFC: "",
                kgPFC: "",
                kgSF6: "",
                kgNF3: "",
              },
            ],
            reference: "",
            source: "",
          },
        ],
      },
    ],
  };
  

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
      source: "",
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
      kgHFC: "",
      kgPFC: "",
      kgSF6: "",
      kgNF3: "",
    });
    setFormData(updatedForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/categories", formData);
      alert("Emission Factor Created Successfully!");
      console.log(response.data);

      setFormData(initialFormData);
    } catch (error) {
      console.error("Error creating emission factor:", error);
    }
  };

  return (
    <Box 
    sx={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    }}
    >
      <Typography variant="h5" mb={3} textAlign="center">
        Emission Factor Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Emission Factor Name"
              value={formData.name}
              onChange={(e) => handleChange(e, "name")}              
            />
          </Grid>
          {formData.activities.map((activity, activityIndex) => (
            <Grid item xs={12} key={activityIndex}>
              <Typography variant="h6" sx={{ borderBottom: '1px solid #ccc', paddingBottom: '4px' }}>Activity {activityIndex + 1}</Typography>
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
                    "& .MuiTextField-root": { mb: 2 }, // Adds margin-bottom to all TextFields inside the Box
                  }}                >
                  <Typography variant="subtitle1" sx={{  mb: 2 }}>
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
                      sx={{ mt: 2, pl: 2, borderLeft: "2px solid lightgray" }}
                    >
                      <Typography variant="body1" sx={{  mb: 2 }}>
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
                      <TextField
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
                      />
                    </Box>
                  ))}

                  <Button
                    variant="outlined"                   
                    sx={{ mt: 2 }}
                    onClick={() => handleAddUnit(activityIndex, fuelIndex)}
                  >
                    Add Unit
                  </Button>
                 
                </Box>
              ))}
               {/*Add fuel*/}
                  <Button
                  sx={{ mt: 4 }}
                  variant="outlined"
                  onClick={() => handleAddFuel(activityIndex)}
                  >
                 Add Fuel
                </Button>
                {/*Add fuel*/}
            </Grid>
          ))}
        </Grid>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 4 }}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4 ,ml:4}}
          onClick={()=>{navigate('/adminemissionfactor-table')}}
        >
         View Table
        </Button>
      </form>
    </Box>
  );
};

export default EmissionFactorForm;
