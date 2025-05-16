// Principle4_Disclosure.jsx
import React, { useState } from 'react';
import {
  Typography,
  Paper,
  TextField,
  Grid,
  Button,
} from '@mui/material';
import axios from "../../../api/axios";
import { useSelector } from "react-redux";

const Principle4_Disclosure = ({ onSave }) => {
  const userId = useSelector((state) => state.auth.user.id);
  const [formData, setFormData] = useState({
    stakeholderIdentificationProcess: '',
    keyStakeholderGroupsInfo: '',
    stakeholderConsultationImpact: '',
    vulnerableGroupConcerns: '',
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
              principleNumber: 4,
              answers: formData,
            },
          ],
        },
      });
      alert("Saved Principle 4 successfully");
      setFormData({
        stakeholderIdentificationProcess: '',
        keyStakeholderGroupsInfo: '',
        stakeholderConsultationImpact: '',
        vulnerableGroupConcerns: '',
      });
    } catch (err) {
      console.error("Failed to save Principle 4:", err);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Section C - Principle 4: Stakeholder Engagement and Inclusive Growth
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography gutterBottom>
            1. Process for identification of key stakeholders
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
            2. Key stakeholder groups: channels for access, localization of info, and identification of vulnerable/marginalized groups
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
            3. Using stakeholder consultation to support the identification and management of environmental and social topics
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
            4. Details of instances of engagement with and actions taken to address the concerns of vulnerable/marginalized groups
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
