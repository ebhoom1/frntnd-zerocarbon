// Principle5_Disclosure.jsx
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

const Principle5_Disclosure = ({ onSave }) => {
  const userId = useSelector((state) => state.auth.user.id);
  const [formData, setFormData] = useState({
    humanRightsTraining: '',
    remunerationPractices: '',
    humanRightsComplaintsDisclosure: '',
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
              principleNumber: 5,
              answers: formData,
            },
          ],
        },
      });
      alert("Saved Principle 5 successfully");
      setFormData({
        humanRightsTraining: '',
        remunerationPractices: '',
        humanRightsComplaintsDisclosure: '',
      });
    } catch (err) {
      console.error("Failed to save Principle 5:", err);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Section C - Principle 5: Respect and Promote Human Rights
      </Typography>

      <Grid container spacing={3}>
        {/* Q1 - Human Rights Training */}
        <Grid item xs={12}>
          <Typography gutterBottom>
            Q1. Human rights training programs and policies
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.humanRightsTraining}
            onChange={(e) => handleChange('humanRightsTraining', e.target.value)}
            placeholder="Include applicable human rights training modules, frequency, and target audiences."
          />
        </Grid>

        {/* Q3 - Remuneration / Salary / Wages Practices */}
        <Grid item xs={12}>
          <Typography gutterBottom>
            Q3. Details of remuneration, salary, and wages (including differently abled)
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.remunerationPractices}
            onChange={(e) => handleChange('remunerationPractices', e.target.value)}
            placeholder="Mention practices around wages, salaries, compliance with Code on Wages, and treatment of differently abled."
          />
        </Grid>

        {/* Q6 - Complaints related to Human Rights */}
        <Grid item xs={12}>
          <Typography gutterBottom>
            Q6. Disclosure of complaints: sexual harassment, child labour, forced labour, wages or related human rights issues
          </Typography>
          <TextField
            fullWidth
            multiline
            value={formData.humanRightsComplaintsDisclosure}
            onChange={(e) => handleChange('humanRightsComplaintsDisclosure', e.target.value)}
            placeholder="Mention complaints received, actions taken, grievance channels, and legal references if any."
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSubmit}>
            Save Principle 5 Disclosure
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Principle5_Disclosure;
