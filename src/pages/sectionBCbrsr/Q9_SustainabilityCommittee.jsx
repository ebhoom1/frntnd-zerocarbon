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

const Q9_SustainabilityCommittee = ({ onSave }) => {
  const [hasCommittee, setHasCommittee] = useState('');
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const [mandate, setMandate] = useState('');

  const handleMemberChange = (index, field, value) => {
    const updated = [...committeeMembers];
    updated[index][field] = value;
    setCommitteeMembers(updated);
  };

  const addMember = () => {
    setCommitteeMembers([
      ...committeeMembers,
      { name: '', designation: '', DIN: '', category: '' },
    ]);
  };

  const removeMember = (index) => {
    const updated = [...committeeMembers];
    updated.splice(index, 1);
    setCommitteeMembers(updated);
  };

  const handleSubmit = () => {
    if (onSave) {
      onSave({
        sustainabilityCommittee: {
          hasCommittee,
          committeeMembers: hasCommittee === 'Yes' ? committeeMembers : [],
          mandate: hasCommittee === 'Yes' ? mandate : '',
        },
      });
    }

    setHasCommittee('');
  setCommitteeMembers([]);
  setMandate('');
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Q9. Sustainability Committee
      </Typography>

      <Typography gutterBottom>
        Does the company have a committee of the Board or a Director responsible for sustainability-related decisions and oversight?
      </Typography>

      <RadioGroup
        row
        value={hasCommittee}
        onChange={(e) => setHasCommittee(e.target.value)}
        sx={{ mb: 2 }}
      >
        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="No" control={<Radio />} label="No" />
      </RadioGroup>

      {hasCommittee === 'Yes' && (
        <>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Provide the composition of the Committee (Name, Designation, DIN, Category)
          </Typography>

          {committeeMembers.map((member, index) => (
            <Grid container spacing={2} key={index} sx={{ mt: 1 }}>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Name"
                  value={member.name}
                  onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Designation"
                  value={member.designation}
                  onChange={(e) => handleMemberChange(index, 'designation', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="DIN (if Director)"
                  value={member.DIN}
                  onChange={(e) => handleMemberChange(index, 'DIN', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Category (Chair / ED / NED / ID)"
                  value={member.category}
                  onChange={(e) => handleMemberChange(index, 'category', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button color="error" onClick={() => removeMember(index)}>
                  Remove Member
                </Button>
              </Grid>
            </Grid>
          ))}

          <Button onClick={addMember} sx={{ mt: 2, mb: 2 }}>
            + Add Committee Member
          </Button>

          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            What is the mandate/scope of the Committee?
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={3}
            value={mandate}
            onChange={(e) => setMandate(e.target.value)}
            placeholder="Describe responsibilities, reporting, and scope of the sustainability committee"
          />
        </>
      )}

      <Box sx={{ mt: 3 }}>
        <Button variant="contained" onClick={handleSubmit}>
          Save Sustainability Committee Info
        </Button>
      </Box>
    </Paper>
  );
};

export default Q9_SustainabilityCommittee;
