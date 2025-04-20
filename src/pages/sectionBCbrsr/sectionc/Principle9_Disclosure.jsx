// Principle9_Disclosure.jsx
import React, { useState } from 'react';
import {
  Typography,
  Paper,
  TextField,
  Grid,
  Button,
} from '@mui/material';

const Principle9_Disclosure = ({ onSave }) => {
  const [formData, setFormData] = useState({
    productRecalls: '',
    consumerInfoChannels: '',
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (onSave) onSave({ principle9: formData });
    setFormData({
      productRecalls: '',
      consumerInfoChannels: '',
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Section C - Principle 9: Consumer Value and Protection
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography gutterBottom>
            1. Have there been any product recalls due to safety issues? If yes, mention the number of instances and reasons.
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.productRecalls}
            onChange={(e) => handleChange('productRecalls', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            2. Through which channels can customers access information about your products/services (e.g., website, app, call center)? Provide a public link if available.
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.consumerInfoChannels}
            onChange={(e) => handleChange('consumerInfoChannels', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSubmit}>
            Save Principle 9 Disclosure
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Principle9_Disclosure;
