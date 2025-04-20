// Principle1_Disclosure.jsx
import React, { useState } from "react";
import { Typography, Paper, TextField, Grid, Button } from "@mui/material";
import axios from "../../../api/axios";
import { useSelector } from "react-redux";

const Principle1_Disclosure = ({ onSave }) => {
  const userId = useSelector((state) => state.auth.user.id);
  const [formData, setFormData] = useState({
    finesPenaltiesDetails: "",
    antiCorruptionRiskAssessment: "",
    antiCorruptionInternalControls: "",
    antiCorruptionComplaintMechanism: "",
    antiCorruptionTrainingCoverage: "",
    conflictOfInterestProcesses: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // const handleSubmit = () => {
  //   if (onSave) onSave({ principle1: formData });

  //   setFormData({
  //     finesPenaltiesDetails: '',
  //     antiCorruptionRiskAssessment: '',
  //     antiCorruptionInternalControls: '',
  //     antiCorruptionComplaintMechanism: '',
  //     antiCorruptionTrainingCoverage: '',
  //     conflictOfInterestProcesses: '',
  //   });
  // };
  const handleSubmit = async () => {
    try {
      await axios.post("/api/sectionc", {
        userId,
        data: {
          disclosures: [
            {
              principleNumber: 1, // for P1; change accordingly for P2–P9
              answers: formData, // your state
            },
          ],
        },
      });
      alert("Saved Principle 1 successfully");
      setFormData({
        finesPenaltiesDetails: "",
        antiCorruptionRiskAssessment: "",
        antiCorruptionInternalControls: "",
        antiCorruptionComplaintMechanism: "",
        antiCorruptionTrainingCoverage: "",
        conflictOfInterestProcesses: "",
      });
    } catch (err) {
      console.error("Failed to save Principle 1:", err);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Section C - Principle 1: Ethics, Transparency and Accountability
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography gutterBottom>
            1. Details of fines / penalties / punishments / awards / compounding
            fees / settlement amount for the year:
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={3}
            value={formData.finesPenaltiesDetails}
            onChange={(e) =>
              handleChange("finesPenaltiesDetails", e.target.value)
            }
            placeholder="Disclose based on materiality under SEBI LODR Reg. 30 or disclosures made on your website."
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            2. Provide details of your Anti-Corruption or Anti-Bribery Policy:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            a. Does the entity have procedures to assess corruption-related
            risks?
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.antiCorruptionRiskAssessment}
            onChange={(e) =>
              handleChange("antiCorruptionRiskAssessment", e.target.value)
            }
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            b. What internal controls are in place to mitigate corruption risks?
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.antiCorruptionInternalControls}
            onChange={(e) =>
              handleChange("antiCorruptionInternalControls", e.target.value)
            }
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            c. What is the grievance redressal mechanism in case of
            bribery/corruption complaints?
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.antiCorruptionComplaintMechanism}
            onChange={(e) =>
              handleChange("antiCorruptionComplaintMechanism", e.target.value)
            }
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            d. What proportion of employees/officers/Board members have been
            trained on anti-corruption?
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.antiCorruptionTrainingCoverage}
            onChange={(e) =>
              handleChange("antiCorruptionTrainingCoverage", e.target.value)
            }
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            3. Processes in place to avoid/manage conflict of interests
            involving Board/KMPs:
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={3}
            value={formData.conflictOfInterestProcesses}
            onChange={(e) =>
              handleChange("conflictOfInterestProcesses", e.target.value)
            }
            placeholder="Disclose if such processes exist, and how they function."
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSubmit}>
            Save Principle 1 Disclosure
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Principle1_Disclosure;
