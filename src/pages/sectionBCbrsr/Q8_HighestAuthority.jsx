import React, { useState } from 'react';
import {
  Typography,
  Paper,
  TextField,
  Grid,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from '@mui/material';

const Q8_HighestAuthority = ({ onSave }) => {
  const [formData, setFormData] = useState({
    implementationAuthorityType: '',
    implementationIndividual: { name: '', designation: '' },
    implementationCommittee: [],
    oversightAuthorityType: '',
    oversightIndividual: { name: '', designation: '' },
    oversightCommittee: [],
  });

  const handleTypeChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleIndividualChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleCommitteeChange = (section, index, field, value) => {
    const updated = [...formData[section]];
    updated[index][field] = value;
    setFormData(prev => ({
      ...prev,
      [section]: updated,
    }));
  };

  const addCommitteeMember = (section) => {
    setFormData(prev => ({
      ...prev,
      [section]: [
        ...prev[section],
        { name: '', designation: '', DIN: '', category: '' },
      ],
    }));
  };

  const removeCommitteeMember = (section, index) => {
    const updated = [...formData[section]];
    updated.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      [section]: updated,
    }));
  };

  const handleSubmit = () => {
    if (onSave) onSave({ highestAuthority: formData });
    setFormData({
        implementationAuthorityType: '',
        implementationIndividual: { name: '', designation: '' },
        implementationCommittee: [],
        oversightAuthorityType: '',
        oversightIndividual: { name: '', designation: '' },
        oversightCommittee: [],
      });
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Q8. Highest Authority for Business Responsibility Policy
      </Typography>

      {/* Implementation Authority */}
      <Typography variant="subtitle1" gutterBottom>
        A. Implementation Authority
      </Typography>

      <RadioGroup
        row
        value={formData.implementationAuthorityType}
        onChange={(e) => handleTypeChange('implementationAuthorityType', e.target.value)}
      >
        <FormControlLabel value="Individual" control={<Radio />} label="Individual" />
        <FormControlLabel value="Committee" control={<Radio />} label="Committee" />
      </RadioGroup>

      {formData.implementationAuthorityType === 'Individual' && (
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Name"
              value={formData.implementationIndividual.name}
              onChange={(e) => handleIndividualChange('implementationIndividual', 'name', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Designation"
              value={formData.implementationIndividual.designation}
              onChange={(e) => handleIndividualChange('implementationIndividual', 'designation', e.target.value)}
            />
          </Grid>
        </Grid>
      )}

      {formData.implementationAuthorityType === 'Committee' && (
        <>
          {formData.implementationCommittee.map((member, index) => (
            <Grid container spacing={2} key={index} sx={{ mt: 1 }}>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Name"
                  value={member.name}
                  onChange={(e) => handleCommitteeChange('implementationCommittee', index, 'name', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Designation"
                  value={member.designation}
                  onChange={(e) => handleCommitteeChange('implementationCommittee', index, 'designation', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="DIN (if director)"
                  value={member.DIN}
                  onChange={(e) => handleCommitteeChange('implementationCommittee', index, 'DIN', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Category (Chair / ED / NED / ID)"
                  value={member.category}
                  onChange={(e) => handleCommitteeChange('implementationCommittee', index, 'category', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
      <Button color="error" onClick={() => removeCommitteeMember('implementationCommittee', index)}>
        Remove Member
      </Button>
    </Grid>
            </Grid>
          ))}
          <Button onClick={() => addCommitteeMember('implementationCommittee')} sx={{ mt: 1 }}>
            + Add Member
          </Button>
        </>
      )}

      {/* Oversight Authority */}
      <Typography variant="subtitle1" sx={{ mt: 4 }} gutterBottom>
        B. Oversight Authority
      </Typography>

      <RadioGroup
        row
        value={formData.oversightAuthorityType}
        onChange={(e) => handleTypeChange('oversightAuthorityType', e.target.value)}
      >
        <FormControlLabel value="Individual" control={<Radio />} label="Individual" />
        <FormControlLabel value="Committee" control={<Radio />} label="Committee" />
      </RadioGroup>

      {formData.oversightAuthorityType === 'Individual' && (
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Name"
              value={formData.oversightIndividual.name}
              onChange={(e) => handleIndividualChange('oversightIndividual', 'name', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Designation"
              value={formData.oversightIndividual.designation}
              onChange={(e) => handleIndividualChange('oversightIndividual', 'designation', e.target.value)}
            />
          </Grid>
        </Grid>
      )}

      {formData.oversightAuthorityType === 'Committee' && (
        <>
          {formData.oversightCommittee.map((member, index) => (
            <Grid container spacing={2} key={index} sx={{ mt: 1 }}>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Name"
                  value={member.name}
                  onChange={(e) => handleCommitteeChange('oversightCommittee', index, 'name', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Designation"
                  value={member.designation}
                  onChange={(e) => handleCommitteeChange('oversightCommittee', index, 'designation', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="DIN (if director)"
                  value={member.DIN}
                  onChange={(e) => handleCommitteeChange('oversightCommittee', index, 'DIN', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Category (Chair / ED / NED / ID)"
                  value={member.category}
                  onChange={(e) => handleCommitteeChange('oversightCommittee', index, 'category', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
      <Button color="error" onClick={() => removeCommitteeMember('oversightCommittee', index)}>
        Remove Member
      </Button>
    </Grid>
            </Grid>
          ))}
          <Button onClick={() => addCommitteeMember('oversightCommittee')} sx={{ mt: 1 }}>
            + Add Member
          </Button>
        </>
      )}

      <Box sx={{ mt: 3 }}>
        <Button variant="contained" onClick={handleSubmit}>
          Save Authority Info
        </Button>
      </Box>
    </Paper>
  );
};

export default Q8_HighestAuthority;
