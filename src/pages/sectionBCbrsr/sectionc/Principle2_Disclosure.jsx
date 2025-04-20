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
    innovationForSustainability: '',
    consumerFeedbackMechanism: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  
  const handleSubmit = async () => {
    try {
      await axios.post("/api/sectionc", {
        userId,
        data: {
          disclosures: [
            {
              principleNumber: 2, // for P1; change accordingly for P2–P9
              answers: formData, // your state
            },
          ],
        },
      });
      alert("Saved Principle 1 successfully");
      setFormData({
        sustainablePolicy: '',
        lifecycleRiskAssessment: '',
        percentSustainableDesign: '',
        circularEconomyPractices: '',
        innovationForSustainability: '',
        consumerFeedbackMechanism: '',
      });
    } catch (err) {
      console.error("Failed to save Principle 1:", err);
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
            5. Mention any innovation, collaboration, or investment in sustainable product development:
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={3}
            value={formData.innovationForSustainability}
            onChange={(e) => handleChange('innovationForSustainability', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            6. What feedback or grievance mechanisms exist for consumers regarding product responsibility?
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={3}
            value={formData.consumerFeedbackMechanism}
            onChange={(e) => handleChange('consumerFeedbackMechanism', e.target.value)}
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
