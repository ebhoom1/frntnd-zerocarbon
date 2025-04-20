// Principle6_Disclosure.jsx
import React, { useState } from 'react';
import {
  Typography,
  Paper,
  TextField,
  Grid,
  Button,
  Divider,
} from '@mui/material';

const Principle6_Disclosure = ({ onSave }) => {
  const [formData, setFormData] = useState({
    totalEnergyConsumption: '',
    patSchemeParticipation: '',
    renewableVsNonRenewable: '',
    scope1And2Emissions: '',
    scope3Emissions: '',
    airEmissions: '',
    totalWaterUse: '',
    waterStressAreas: '',
    waterDischarge: '',
    zeroLiquidDischargePolicy: '',
    wasteGenerated: '',
    wasteManagementPractices: '',
    eiaDetails: '',
    biodiversityImpact: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (onSave) onSave({ principle6: formData });
    setFormData({
      totalEnergyConsumption: '',
      patSchemeParticipation: '',
      renewableVsNonRenewable: '',
      scope1And2Emissions: '',
      scope3Emissions: '',
      airEmissions: '',
      totalWaterUse: '',
      waterStressAreas: '',
      waterDischarge: '',
      zeroLiquidDischargePolicy: '',
      wasteGenerated: '',
      wasteManagementPractices: '',
      eiaDetails: '',
      biodiversityImpact: '',
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Section C - Principle 6: Environmental Impact
      </Typography>

      {/* Energy Section */}
      <Typography variant="subtitle1">Energy</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>1. Report total electricity, fuel, and other energy consumption. What is your energy intensity per turnover?</Typography>
          <TextField fullWidth multiline value={formData.totalEnergyConsumption} onChange={(e) => handleChange('totalEnergyConsumption', e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <Typography>2. Is your entity covered under the PAT scheme? If yes, mention designated sites, targets, and performance.</Typography>
          <TextField fullWidth multiline value={formData.patSchemeParticipation} onChange={(e) => handleChange('patSchemeParticipation', e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <Typography>3. Give the breakdown of energy consumed from renewable vs. non-renewable sources.</Typography>
          <TextField fullWidth multiline value={formData.renewableVsNonRenewable} onChange={(e) => handleChange('renewableVsNonRenewable', e.target.value)} />
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />
      <Typography variant="subtitle1">Emissions</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>4. Report Scope 1 and 2 GHG emissions in tCO2e and intensity ratio. List standards and assumptions used.</Typography>
          <TextField fullWidth multiline value={formData.scope1And2Emissions} onChange={(e) => handleChange('scope1And2Emissions', e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <Typography>5. What are your Scope 3 GHG emissions (value chain)? Describe sources and methods used.</Typography>
          <TextField fullWidth multiline value={formData.scope3Emissions} onChange={(e) => handleChange('scope3Emissions', e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <Typography>6. What are your air pollutant emissions (e.g., PM, NOx, SOx, VOCs)? Describe the calculation method.</Typography>
          <TextField fullWidth multiline value={formData.airEmissions} onChange={(e) => handleChange('airEmissions', e.target.value)} />
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />
      <Typography variant="subtitle1">Water</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>7. Report total water withdrawn and consumed. What is your water intensity ratio per turnover?</Typography>
          <TextField fullWidth multiline value={formData.totalWaterUse} onChange={(e) => handleChange('totalWaterUse', e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <Typography>8. How much water was withdrawn, consumed, and discharged in water-stressed areas?</Typography>
          <TextField fullWidth multiline value={formData.waterStressAreas} onChange={(e) => handleChange('waterStressAreas', e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <Typography>9. Report total water discharged. Mention the destination and treatment level applied.</Typography>
          <TextField fullWidth multiline value={formData.waterDischarge} onChange={(e) => handleChange('waterDischarge', e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <Typography>10. Does your company follow a Zero Liquid Discharge policy? If yes, describe its implementation.</Typography>
          <TextField fullWidth multiline value={formData.zeroLiquidDischargePolicy} onChange={(e) => handleChange('zeroLiquidDischargePolicy', e.target.value)} />
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />
      <Typography variant="subtitle1">Waste</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>11. Report total waste generated, recycled, reused, and disposal methods (landfill, incineration).</Typography>
          <TextField fullWidth multiline value={formData.wasteGenerated} onChange={(e) => handleChange('wasteGenerated', e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <Typography>12. Describe your waste management practices. How do you monitor third-party waste disposal?</Typography>
          <TextField fullWidth multiline value={formData.wasteManagementPractices} onChange={(e) => handleChange('wasteManagementPractices', e.target.value)} />
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />
      <Typography variant="subtitle1">Impact Assessment & Biodiversity</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>13. Has your company conducted Environmental Impact Assessments (EIA)? Summarize key outcomes.</Typography>
          <TextField fullWidth multiline value={formData.eiaDetails} onChange={(e) => handleChange('eiaDetails', e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <Typography>14. Does your company operate in eco-sensitive zones? If yes, describe the impact on biodiversity.</Typography>
          <TextField fullWidth multiline value={formData.biodiversityImpact} onChange={(e) => handleChange('biodiversityImpact', e.target.value)} />
        </Grid>
      </Grid>

      <Grid item xs={12} sx={{ mt: 3 }}>
        <Button variant="contained" onClick={handleSubmit}>
          Save Principle 6 Disclosure
        </Button>
      </Grid>
    </Paper>
  );
};

export default Principle6_Disclosure;
