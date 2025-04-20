// Principle4_Disclosure.jsx
import React, { useState } from 'react';
import {
  Typography,
  Paper,
  TextField,
  Grid,
  Button,
} from '@mui/material';

const Principle4_Disclosure = ({ onSave }) => {
  const [formData, setFormData] = useState({
    stakeholderIdentificationProcess: '',
    keyStakeholderGroupsInfo: '',
    stakeholderConsultationImpact: '',
    vulnerableGroupConcerns: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (onSave) onSave({ principle4: formData });

    setFormData({
      stakeholderIdentificationProcess: '',
      keyStakeholderGroupsInfo: '',
      stakeholderConsultationImpact: '',
      vulnerableGroupConcerns: '',
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Section C - Principle 4: Stakeholder Engagement and Inclusive Growth
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography gutterBottom>
            1. What process does the entity follow to identify and prioritize stakeholders (including vulnerable/marginalized)?
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.stakeholderIdentificationProcess}
            onChange={(e) => handleChange('stakeholderIdentificationProcess', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            2. How do key stakeholder groups access relevant information about the entity? Is it localized or available in accessible formats? List identified vulnerable/marginalized groups.
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.keyStakeholderGroupsInfo}
            onChange={(e) => handleChange('keyStakeholderGroupsInfo', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            3. How has stakeholder consultation been used to identify and manage environmental and social topics? What were the key topics raised and your response?
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.stakeholderConsultationImpact}
            onChange={(e) => handleChange('stakeholderConsultationImpact', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            4. What were the key concerns raised by vulnerable/marginalized stakeholders and what actions did the entity take in response?
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.vulnerableGroupConcerns}
            onChange={(e) => handleChange('vulnerableGroupConcerns', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSubmit}>
            Save Principle 4 Disclosure
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Principle4_Disclosure;
