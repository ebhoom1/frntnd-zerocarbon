// import React, { useState } from 'react';
// import {
//   Dialog, DialogTitle, DialogContent, DialogActions,
//   Button, TextField, IconButton, Box, Typography
// } from '@mui/material';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
// import { useSelector } from 'react-redux';
// import axios from '../../../api/axios'; // adjust path as needed

// const AddSurveyQuestionDialog = ({ open, handleClose }) => {
//   const { user } = useSelector(state => state.auth);

//   const [question, setQuestion] = useState('');
//   const [section, setSection] = useState('');
//   const [options, setOptions] = useState(['']);

//   const handleOptionChange = (index, value) => {
//     const updated = [...options];
//     updated[index] = value;
//     setOptions(updated);
//   };

//   const addOption = () => setOptions([...options, '']);
//   const removeOption = index => {
//     const updated = [...options];
//     updated.splice(index, 1);
//     setOptions(updated);
//   };

//   const handleSubmit = async () => {
//     try {
//       const payload = {
//         question,
//         section,
//         options: options.filter(opt => opt.trim() !== ''),
//         userId: user.id,
//         userName: user.userName,
//       };

//       const res = await axios.post('/api/survey-questions', payload);
//       console.log(res.data.message);
//       alert(res.data.message)
//       handleClose(); // Close dialog after success
//     } catch (err) {
//         alert(err.response?.data?.error)
//       console.error('Error:', err.response?.data?.error || err.message);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={handleClose} fullWidth>
//       <DialogTitle>Add Survey Question</DialogTitle>
//       <DialogContent>
//         <Box mb={2} mt={2}>
//           <TextField
//             label="Question"
//             fullWidth
//             value={question}
//             onChange={e => setQuestion(e.target.value)}
//           />
//         </Box>
//         <Box mb={2}>
//           <TextField
//             label="Section"
//             fullWidth
//             value={section}
//             onChange={e => setSection(e.target.value)}
//           />
//         </Box>
//         <Typography variant="subtitle1">Options (optional for multiple choice)</Typography>
//         {options.map((opt, index) => (
//           <Box key={index} display="flex" alignItems="center" gap={1} mb={1}>
//             <TextField
//               label={`Option ${index + 1}`}
//               fullWidth
//               value={opt}
//               onChange={e => handleOptionChange(index, e.target.value)}
//             />
//             <IconButton onClick={() => removeOption(index)} disabled={options.length === 1}>
//               <RemoveCircleOutlineIcon />
//             </IconButton>
//           </Box>
//         ))}
//         <Button
//           startIcon={<AddCircleOutlineIcon />}
//           onClick={addOption}
//           variant="outlined"
//           size="small"
//         >
//           Add Option
//         </Button>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleClose} color="error">Cancel</Button>
//         <Button onClick={handleSubmit} variant="contained">Submit</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AddSurveyQuestionDialog;


import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, IconButton, Box, Typography, Divider
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useSelector } from 'react-redux';
import axios from '../../../api/axios'; // adjust as needed

const AddSurveyQuestionDialog = ({ open, handleClose }) => {
  const { user } = useSelector(state => state.auth);

  const [questions, setQuestions] = useState([
    { question: '', section: '', options: [''] }
  ]);

  const handleFieldChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const addOption = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].options.push('');
    setQuestions(updated);
  };

  const removeOption = (qIndex, oIndex) => {
    const updated = [...questions];
    updated[qIndex].options.splice(oIndex, 1);
    setQuestions(updated);
  };

  const addQuestionBlock = () => {
    setQuestions([...questions, { question: '', section: '', options: [''] }]);
  };

  const removeQuestionBlock = (index) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  const handleSubmit = async () => {
    try {
      const payloads = questions.map(q => ({
        question: q.question,
        section: q.section,
        options: q.options.filter(opt => opt.trim() !== ''),
        userId: user.id,
        companyName: user.companyName,
      }));

      for (let payload of payloads) {
        await axios.post('/api/survey-questions', payload);
      }

      alert('All questions submitted successfully.');
      handleClose();
      setQuestions([{ question: '', section: '', options: [''] }]); // reset form
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Failed to submit questions');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Add Multiple Survey Questions</DialogTitle>
      <DialogContent>
        {questions.map((q, qIndex) => (
          <Box key={qIndex} mb={3} p={2} border="1px solid #ccc" borderRadius={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Question {qIndex + 1}</Typography>
              {questions.length > 1 && (
                <IconButton onClick={() => removeQuestionBlock(qIndex)}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
              )}
            </Box>

            <TextField
              label="Question"
              fullWidth
              value={q.question}
              onChange={(e) => handleFieldChange(qIndex, 'question', e.target.value)}
              sx={{ my: 2 }}
            />
            <TextField
              label="Section"
              fullWidth
              value={q.section}
              onChange={(e) => handleFieldChange(qIndex, 'section', e.target.value)}
              sx={{ mb: 2 }}
            />

            <Typography variant="subtitle2">Options (optional for multiple choice)</Typography>
            {q.options.map((opt, oIndex) => (
              <Box key={oIndex} display="flex" alignItems="center" gap={2} my={2}>
                <TextField
                  fullWidth
                  label={`Option ${oIndex + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                />
                <IconButton
                  onClick={() => removeOption(qIndex, oIndex)}
                  disabled={q.options.length === 1}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </Box>
            ))}
            <Button
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => addOption(qIndex)}
              size="small"
              variant="outlined"
            >
              Add Option
            </Button>
          </Box>
        ))}

        <Divider />
        <Box mt={2}>
          <Button
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
            onClick={addQuestionBlock}
          >
            Add Another Question
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Submit All</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSurveyQuestionDialog;
