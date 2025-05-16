// Principle2_Disclosure.jsx
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

const Principle2_Disclosure = ({ onSave }) => {
  const userId = useSelector((state) => state.auth.user.id);
  const [formData, setFormData] = useState({
    sustainablePolicy: '',
    lifecycleRiskAssessment: '',
    percentSustainableDesign: '',
    circularEconomyPractices: '',
    eprPlan: '',
    reclaimedProductData: '',
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
              principleNumber: 2,
              answers: {
                sustainablePolicy: formData.sustainablePolicy,
                lifecycleRiskAssessment: formData.lifecycleRiskAssessment,
                percentSustainableDesign: formData.percentSustainableDesign,
                circularEconomyPractices: formData.circularEconomyPractices,
                eprPlan: formData.eprPlan,
                reclaimedProductData: formData.reclaimedProductData,
              },
            },
          ],
        },
      });
      alert("Saved Principle 2 successfully");
      setFormData({
        sustainablePolicy: '',
        lifecycleRiskAssessment: '',
        percentSustainableDesign: '',
        circularEconomyPractices: '',
        eprPlan: '',
        reclaimedProductData: '',
      });
    } catch (err) {
      console.error("Failed to save Principle 2:", err);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Section C - Principle 2: Product Lifecycle Sustainability
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography gutterBottom>
            1. Does the entity have policies related to sustainable sourcing, eco-design, safety, and quality of products/services?
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={3}
            value={formData.sustainablePolicy}
            onChange={(e) => handleChange('sustainablePolicy', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            2. Describe any procedures to assess and manage environmental and social risks across the product/service lifecycle:
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={3}
            value={formData.lifecycleRiskAssessment}
            onChange={(e) => handleChange('lifecycleRiskAssessment', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            3. What percentage of products/services are designed with sustainability (e.g., environmental/social considerations)?
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.percentSustainableDesign}
            onChange={(e) => handleChange('percentSustainableDesign', e.target.value)}
            placeholder="Enter approximate % or explain methodology."
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            4. Describe practices aligned with circular economy (e.g., reuse, recycling, minimizing waste):
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={3}
            value={formData.circularEconomyPractices}
            onChange={(e) => handleChange('circularEconomyPractices', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            5. Mention your Extended Producer Responsibility (EPR) plan if applicable:
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={3}
            value={formData.eprPlan}
            onChange={(e) => handleChange('eprPlan', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            6. What percentage of reclaimed products and packaging materials (as a percentage of products sold) do you track per product category?
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={3}
            value={formData.reclaimedProductData}
            onChange={(e) => handleChange('reclaimedProductData', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSubmit}>
            Save Principle 2 Disclosure
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Principle2_Disclosure;
