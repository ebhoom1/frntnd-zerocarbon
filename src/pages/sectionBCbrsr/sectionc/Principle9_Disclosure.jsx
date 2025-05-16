import React, { useState } from 'react';
import {
  Typography,
  Paper,
  TextField,
  Grid,
  Button,
} from '@mui/material';
import axios from '../../../api/axios';
import { useSelector } from 'react-redux';

const Principle9_Disclosure = ({ onSave }) => {
  const userId = useSelector((state) => state.auth.user.id);
  const [formData, setFormData] = useState({
    productRecalls: '',
    consumerInfoChannels: '',
    consumerComplaintMechanism: '',
    consumerAwarenessEfforts: '',
    dataPrivacyPolicy: '',
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/api/sectionc', {
        userId,
        year: new Date().getFullYear(),
        data: {
          disclosures: [
            {
              principleNumber: 9,
              answers: formData,
            },
          ],
        },
      });
      alert('Saved Principle 9 successfully');
      setFormData({
        productRecalls: '',
        consumerInfoChannels: '',
        consumerComplaintMechanism: '',
        consumerAwarenessEfforts: '',
        dataPrivacyPolicy: '',
      });
    } catch (err) {
      console.error('Failed to save Principle 9:', err);
    }
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
          <Typography gutterBottom>
            3. What mechanisms are in place to handle customer complaints and ensure redressal?
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.consumerComplaintMechanism}
            onChange={(e) => handleChange('consumerComplaintMechanism', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            4. Describe initiatives undertaken to educate or create awareness among consumers about your products/services.
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.consumerAwarenessEfforts}
            onChange={(e) => handleChange('consumerAwarenessEfforts', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            5. What are your policies and practices related to the privacy and protection of consumer data?
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.dataPrivacyPolicy}
            onChange={(e) => handleChange('dataPrivacyPolicy', e.target.value)}
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
