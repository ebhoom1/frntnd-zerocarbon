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

const Principle7_Disclosure = ({ onSave }) => {
  const userId = useSelector((state) => state.auth.user.id);
  const [formData, setFormData] = useState({
    policyIssuesAdvocated: '',
    advocacyMethods: '',
    isDisclosurePublic: '',
    boardReviewFrequency: '',
    disclosureLink: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post("/api/sectionc", {
        userId,
        year: new Date().getFullYear(),
        data: {
          disclosures: [
            {
              principleNumber: 7,
              answers: formData,
            },
          ],
        },
      });
      alert("Saved Principle 7 successfully");
      setFormData({
        policyIssuesAdvocated: '',
        advocacyMethods: '',
        isDisclosurePublic: '',
        boardReviewFrequency: '',
        disclosureLink: '',
      });
    } catch (err) {
      console.error("Failed to save Principle 7:", err);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Section C - Principle 7: Responsible Policy Advocacy
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography gutterBottom>
            1. What public policy issues did your entity advocate for during the year?
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.policyIssuesAdvocated}
            onChange={(e) => handleChange('policyIssuesAdvocated', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            2. Through which platforms or methods was the advocacy carried out (e.g., trade associations, direct engagement)?
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.advocacyMethods}
            onChange={(e) => handleChange('advocacyMethods', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            3. Is the advocacy disclosure available in the public domain? (Yes/No)
          </Typography>
          <TextField
            fullWidth
            value={formData.isDisclosurePublic}
            onChange={(e) => handleChange('isDisclosurePublic', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            4. How frequently does the Board review the public policy positions taken by the entity?
          </Typography>
          <TextField
            fullWidth
            value={formData.boardReviewFrequency}
            onChange={(e) => handleChange('boardReviewFrequency', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            5. Provide a public link to policy advocacy disclosures (if applicable):
          </Typography>
          <TextField
            fullWidth
            value={formData.disclosureLink}
            onChange={(e) => handleChange('disclosureLink', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSubmit}>
            Save Principle 7 Disclosure
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Principle7_Disclosure;
