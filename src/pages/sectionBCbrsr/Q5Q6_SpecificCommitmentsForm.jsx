import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';

const principles = [
  'Principle 1', 'Principle 2', 'Principle 3', 'Principle 4', 'Principle 5',
  'Principle 6', 'Principle 7', 'Principle 8', 'Principle 9',
];

const emptyGoal = {
  principle: '',
  goalTitle: '',
  baselineContext: '',
  coveredEntities: '',
  expectedOutcome: '',
  timeline: '',
  mandatoryOrVoluntary: '',
  referenceLegislation: '',
  performanceAchieved: '',
  remarks: '',
};

const SpecificCommitmentsForm = ({ onSave }) => {
  const [hasCommitments, setHasCommitments] = useState('');
  const [goals, setGoals] = useState([emptyGoal]);

  const handleChange = (index, field, value) => {
    const updated = [...goals];
    updated[index][field] = value;
    setGoals(updated);
  };

  const handleAddGoal = () => {
    setGoals([...goals, { ...emptyGoal }]);
  };

  const handleRemoveGoal = (index) => {
    const updated = [...goals];
    updated.splice(index, 1);
    setGoals(updated);
  };

  const handleSubmit = () => {
    if (onSave) onSave({ specificCommitments: hasCommitments === 'Yes' ? goals : [] });
    setHasCommitments('');
    setGoals([emptyGoal]);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Q5 & Q6. Specific Commitments, Goals and Performance
      </Typography>

      <Typography sx={{ mb: 1 }}>
        Has your organization set any specific commitments, goals or targets related to ESG (Environmental, Social, and Governance) aspects under any of the 9 BRSR Principles?
      </Typography>

      <RadioGroup
        row
        value={hasCommitments}
        onChange={(e) => setHasCommitments(e.target.value)}
        sx={{ mb: 2 }}
      >
        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="No" control={<Radio />} label="No" />
      </RadioGroup>

      {hasCommitments === 'Yes' && goals.map((goal, index) => (
        <Grid container spacing={2} key={index} sx={{ mb: 2, borderBottom: '1px solid #ccc', pb: 2 }}>
          <Grid item xs={12}>
            <Typography variant="subtitle2">Commitment #{index + 1}</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="1. Which BRSR Principle does this goal relate to?"
              value={goal.principle}
              onChange={(e) => handleChange(index, 'principle', e.target.value)}
            >
              {principles.map((p) => (
                <MenuItem key={p} value={p}>{p}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="2. What is the title or description of this goal/commitment?"
              value={goal.goalTitle}
              onChange={(e) => handleChange(index, 'goalTitle', e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="3. What is the baseline or context for this goal? (e.g., current status)"
              multiline
              value={goal.baselineContext}
              onChange={(e) => handleChange(index, 'baselineContext', e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="4. Which entities are covered under this goal?"
              placeholder="e.g., parent company, subsidiaries, value chain"
              multiline
              value={goal.coveredEntities}
              onChange={(e) => handleChange(index, 'coveredEntities', e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="5. What are the expected results/outcomes (quantitative or qualitative)?"
              multiline
              value={goal.expectedOutcome}
              onChange={(e) => handleChange(index, 'expectedOutcome', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="6. What is the timeline to achieve the goal?"
              value={goal.timeline}
              onChange={(e) => handleChange(index, 'timeline', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="7. Is this goal mandatory or voluntary?"
              value={goal.mandatoryOrVoluntary}
              onChange={(e) => handleChange(index, 'mandatoryOrVoluntary', e.target.value)}
            />
          </Grid>

          {goal.mandatoryOrVoluntary?.toLowerCase() === 'mandatory' && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="If mandatory, under which law or regulation?"
                value={goal.referenceLegislation}
                onChange={(e) => handleChange(index, 'referenceLegislation', e.target.value)}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="8. What performance has been achieved so far?"
              multiline
              value={goal.performanceAchieved}
              onChange={(e) => handleChange(index, 'performanceAchieved', e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="9. Are there any remarks, challenges, delays, or changes to the goal?"
              multiline
              value={goal.remarks}
              onChange={(e) => handleChange(index, 'remarks', e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            {goals.length > 1 && (
              <Button color="error" onClick={() => handleRemoveGoal(index)}>
                Remove Goal
              </Button>
            )}
          </Grid>
        </Grid>
      ))}

      {hasCommitments === 'Yes' && (
        <Button onClick={handleAddGoal} sx={{ mt: 1, mr: 2 }}>
          + Add Another Goal
        </Button>
      )}

      <Button variant="contained" onClick={handleSubmit}>
        Save Commitments
      </Button>
    </Paper>
  );
};

export default SpecificCommitmentsForm;
