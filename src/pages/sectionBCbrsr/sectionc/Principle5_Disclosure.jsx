// Principle5_Disclosure.jsx
import React, { useState } from 'react';
import {
  Typography,
  Paper,
  TextField,
  Grid,
  Button,
} from '@mui/material';

const Principle5_Disclosure = ({ onSave }) => {
  const [formData, setFormData] = useState({
    humanRightsComplaints: '',
    humanRightsPreventionMechanisms: '',
    humanRightsPolicy: '',
    humanRightsTraining: '',
    humanRightsReviewMechanism: '',
    humanRightsStakeholderEngagement: '',
    humanRightsRemediation: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (onSave) onSave({ principle5: formData });

    setFormData({
      humanRightsComplaints: '',
      humanRightsPreventionMechanisms: '',
      humanRightsPolicy: '',
      humanRightsTraining: '',
      humanRightsReviewMechanism: '',
      humanRightsStakeholderEngagement: '',
      humanRightsRemediation: '',
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Section C - Principle 5: Human Rights
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography gutterBottom>
            1. How many human rights-related complaints were filed by employees or external stakeholders during the year? Indicate resolved and pending.
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.humanRightsComplaints}
            onChange={(e) => handleChange('humanRightsComplaints', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            2. Describe the mechanisms your organization has in place to prevent adverse impacts on human rights (e.g., risk identification, escalation, third-party reviews).
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.humanRightsPreventionMechanisms}
            onChange={(e) => handleChange('humanRightsPreventionMechanisms', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            3. Does your organization have a human rights policy? What does it cover and how is it implemented?
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.humanRightsPolicy}
            onChange={(e) => handleChange('humanRightsPolicy', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            4. What kind of human rights training is conducted? Who is it provided to and how frequently?
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.humanRightsTraining}
            onChange={(e) => handleChange('humanRightsTraining', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            5. Are your human rights practices reviewed internally or externally? Describe the review/audit mechanism.
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.humanRightsReviewMechanism}
            onChange={(e) => handleChange('humanRightsReviewMechanism', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            6. Describe any stakeholder engagement undertaken to address or identify human rights-related concerns (e.g., civil society, workers, vulnerable groups).
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.humanRightsStakeholderEngagement}
            onChange={(e) => handleChange('humanRightsStakeholderEngagement', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            7. What remediation mechanisms exist for addressing human rights violations (e.g., grievance handling, rehabilitation, prevention of recurrence)?
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.humanRightsRemediation}
            onChange={(e) => handleChange('humanRightsRemediation', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSubmit}>
            Save Principle 5 Disclosure
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Principle5_Disclosure;
