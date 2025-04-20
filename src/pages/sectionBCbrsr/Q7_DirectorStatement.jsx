import React, { useState } from 'react';
import {
  Typography,
  Paper,
  TextField,
  Grid,
  Button,
} from '@mui/material';

const Q7_DirectorStatement = ({ onSave }) => {
  const [formData, setFormData] = useState({
    visionStrategy: '',
    strategicPriorities: '',
    broaderTrends: '',
    keyEvents: '',
    performanceView: '',
    futureOutlook: '',
    additionalNotes: '',
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    if (onSave) onSave({ directorESGStatement: formData });
    setFormData({
        visionStrategy: '',
        strategicPriorities: '',
        broaderTrends: '',
        keyEvents: '',
        performanceView: '',
        futureOutlook: '',
        additionalNotes: '',
      });  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Q7. Statement by Director on ESG Issues
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography gutterBottom>
            1. What is your organization's vision and strategy regarding ESG for short/medium/long-term?
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={2}
            value={formData.visionStrategy}
            onChange={(e) => handleChange('visionStrategy', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            2. What are the key priorities and topics identified under ESG?
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={2}
            value={formData.strategicPriorities}
            onChange={(e) => handleChange('strategicPriorities', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            3. What are the broader trends influencing your ESG approach?
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={2}
            value={formData.broaderTrends}
            onChange={(e) => handleChange('broaderTrends', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            4. Can you share any key achievements, events, or failures related to ESG during the reporting period?
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={2}
            value={formData.keyEvents}
            onChange={(e) => handleChange('keyEvents', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            5. What is your assessment of performance against ESG goals and targets?
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={2}
            value={formData.performanceView}
            onChange={(e) => handleChange('performanceView', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            6. What is your outlook for the future, and what are the main challenges?
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={2}
            value={formData.futureOutlook}
            onChange={(e) => handleChange('futureOutlook', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            7. Any additional notes you'd like to include?
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={2}
            value={formData.additionalNotes}
            onChange={(e) => handleChange('additionalNotes', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSubmit}>
            Save ESG Statement
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Q7_DirectorStatement;
