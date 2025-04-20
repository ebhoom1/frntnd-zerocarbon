// Principle3_Disclosure.jsx
import React, { useState } from 'react';
import {
  Typography,
  Paper,
  TextField,
  Grid,
  Button,
} from '@mui/material';

const Principle3_Disclosure = ({ onSave }) => {
  const [formData, setFormData] = useState({
    wellbeingMeasures: '',
    accessibilityOfWorkplace: '',
    parentalLeaveReturnAndRetentionRates: '',
    trainingOnHealthSafetyAndSkill: '',
    performanceAndCareerReview: '',
    healthAndSafetyManagementSystem: '',
    safetyIncidents: '',
    rehabilitationAndAlternateEmployment: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (onSave) onSave({ principle3: formData });

    setFormData({
      wellbeingMeasures: '',
      accessibilityOfWorkplace: '',
      parentalLeaveReturnAndRetentionRates: '',
      trainingOnHealthSafetyAndSkill: '',
      performanceAndCareerReview: '',
      healthAndSafetyManagementSystem: '',
      safetyIncidents: '',
      rehabilitationAndAlternateEmployment: '',
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Section C - Principle 3: Employee Wellbeing, Diversity & Equality
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography gutterBottom>
            1. What measures has your entity undertaken to ensure the well-being of employees and workers? (e.g., health insurance, wellness programs, flexible work)
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.wellbeingMeasures}
            onChange={(e) => handleChange('wellbeingMeasures', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            2. What accessibility measures are in place for persons with disabilities (physical and digital)?
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.accessibilityOfWorkplace}
            onChange={(e) => handleChange('accessibilityOfWorkplace', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            3. What are your return-to-work and retention rates after parental leave for male/female/other employees?
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.parentalLeaveReturnAndRetentionRates}
            onChange={(e) => handleChange('parentalLeaveReturnAndRetentionRates', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            4. What trainings were provided on health & safety, and skill upgradation?
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.trainingOnHealthSafetyAndSkill}
            onChange={(e) => handleChange('trainingOnHealthSafetyAndSkill', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            5. How often are employee performance and career development reviews conducted?
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.performanceAndCareerReview}
            onChange={(e) => handleChange('performanceAndCareerReview', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            6. Describe your occupational health and safety management system and how OHS risks are identified and addressed.
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.healthAndSafetyManagementSystem}
            onChange={(e) => handleChange('healthAndSafetyManagementSystem', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            7. Provide details of safety-related incidents and Lost Time Injury Frequency Rate (LTIFR).
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.safetyIncidents}
            onChange={(e) => handleChange('safetyIncidents', e.target.value)}
          />
        </Grid>

        {/* Leadership Indicator */}
        <Grid item xs={12}>
          <Typography gutterBottom>
            8. How many employees with high consequence injury/illness were rehabilitated or given alternate employment? (Include family support if applicable)
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.rehabilitationAndAlternateEmployment}
            onChange={(e) => handleChange('rehabilitationAndAlternateEmployment', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSubmit}>
            Save Principle 3 Disclosure
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Principle3_Disclosure;
