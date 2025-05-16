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

const Principle8_Disclosure = ({ onSave }) => {
  const userId = useSelector((state) => state.auth.user.id);
  const [formData, setFormData] = useState({
    socialImpactAssessment: '',
    localCommunityGrievance: '',
    msmeSourcingPercent: '',
    csrInAspirationalDistricts: '',
    iprTraditionalKnowledge: '',
    csrBeneficiaries: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response=await axios.post("/api/sectionc", {
        userId,
        year: new Date().getFullYear(),
        data: {
          disclosures: [
            {
              principleNumber: 8,
              answers: formData,
            },
          ],
        },
      });
      console.log("response:",response.data);
      alert("Saved Principle 8 successfully");
      setFormData({
        socialImpactAssessment: '',
        localCommunityGrievance: '',
        msmeSourcingPercent: '',
        csrInAspirationalDistricts: '',
        iprTraditionalKnowledge: '',
        csrBeneficiaries: '',
      });
    } catch (err) {
      console.error("Failed to save Principle 8:", err);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Section C - Principle 8: Inclusive Growth and Equitable Development
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography gutterBottom>
            1. Has your company conducted any Social Impact Assessments (SIA)? If yes, describe the purpose, compliance with laws, and key findings.
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.socialImpactAssessment}
            onChange={(e) => handleChange('socialImpactAssessment', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            2. What mechanisms exist for receiving and addressing grievances from the local community?
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.localCommunityGrievance}
            onChange={(e) => handleChange('localCommunityGrievance', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            3. What percentage of your inputs are sourced from MSMEs, small producers, or cooperatives?
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.msmeSourcingPercent}
            onChange={(e) => handleChange('msmeSourcingPercent', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            4. Has your company undertaken CSR projects in aspirational districts? If yes, list the projects and locations.
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.csrInAspirationalDistricts}
            onChange={(e) => handleChange('csrInAspirationalDistricts', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            5. Does your company use or own any intellectual property based on traditional knowledge? If yes, describe benefit-sharing under ABS Rules 2014.
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.iprTraditionalKnowledge}
            onChange={(e) => handleChange('iprTraditionalKnowledge', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            6. For each CSR project, list total beneficiaries and the percentage from vulnerable/marginalized communities.
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.csrBeneficiaries}
            onChange={(e) => handleChange('csrBeneficiaries', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSubmit}>
            Save Principle 8 Disclosure
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Principle8_Disclosure;
