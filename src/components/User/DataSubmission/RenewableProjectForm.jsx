import React, { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from '../../../api/axios';
import { useSelector } from "react-redux";

const jsonData = {
  "Renewable Project": {
    "General Project Details": [
      { "question": "Project Name", "type": "text" },
      { "question": "Project Location", "type": "text" },
      { "question": "Type of Renewable Energy", "type": "text" },
      { "question": "Installed Capacity (MW)", "type": "text" },
      { "question": "Annual Energy Generation (MWh/year)", "type": "text" },
      { "question": "Operational Status", "type": "text" },
      { "question": "Commissioning Year", "type": "text" }
    ],
    "Environmental & Carbon Impact": [
      { "question": "Total Carbon Savings (tCO₂e/year)", "type": "text" },
      { "question": "Grid-Connected or Off-Grid?", "type": "text" },
      { "question": "Does the project have Renewable Energy Certificates (RECs)?", "type": "boolean" },
      { "question": "Emission Factor Used (kgCO₂e/kWh)", "type": "text" }
    ],
    "Financial & Ownership": [
      { "question": "Investment Cost (INR or USD)", "type": "text" },
      { "question": "Funding Type", "type": "text" },
      { "question": "Ownership Model", "type": "text" },
      { "question": "Expected ROI Period (Years)", "type": "text" }
    ],
    "Compliance & Certifications": [
      { "question": "Is the project certified under any standards?", "type": "text" },
      { "question": "Does the project contribute to the company's RE100 target?", "type": "boolean" }
    ],
    "Additional Information": [
      { "question": "Challenges Faced in Implementation", "type": "text" },
      { "question": "Future Expansion Plans?", "type": "boolean" },
      { "question": "Any Government Subsidy or Incentives Received?", "type": "text" }
    ]
  }
};

const RenewableProjectForm = () => {
    const userId = useSelector((state) => state.auth.user?.id);

  const [formData, setFormData] = useState({});
  const [records, setRecords] = useState([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    if (userId) {
      axios.get(`/api/submissions/renewableproject/get/${userId}`)
        .then((res) => {
          setRecords(res.data.data || []);
        })
        .catch((error) => console.error("Error fetching records:", error));
    }
  }, [userId]);
  
  const handleChange = (question, value) => {
    setFormData({ ...formData, [question]: value }); 
  };

  const handleSubmit = async () => {
    try {
      const requestBody = { userId, formData };
      const response = await axios.post('/api/submissions/renewableproject/add', requestBody);
      console.log(response.data);
      setRecords([...records, response.data.data]);
      setFormData({});
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <Typography variant="h5" gutterBottom>Renewable Project</Typography>
      {Object.entries(jsonData["Renewable Project"]).map(([category, questions]) => (
        <Accordion key={category}  style={{ marginBottom: "10px" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{category}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {questions.map(({ question, type }) => (
              <TextField
                key={question}
                label={question}
                type={type === 'boolean' ? 'text' : type}
                fullWidth
                margin="dense"
                value={formData[question] || ''}
                onChange={(e) => handleChange(question, e.target.value)}
              />
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
      <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: 10 }}>Add Renewable Project</Button>
      <Button variant="contained" color="secondary" onClick={() => setShowTable(!showTable)} style={{ marginTop: 10, marginLeft: 10 }}>
        {showTable ? "Hide" : "View"} Renewable Projects
      </Button>
      {showTable && (
        <TableContainer component={Paper} style={{ marginTop: 20 }}>
          <Table>
            <TableHead>
              <TableRow>
                {Object.values(jsonData["Renewable Project"]).flat().map(({ question }) => (
                  <TableCell key={question}>{question}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record, index) => (
                <TableRow key={index}>
                  {Object.values(jsonData["Renewable Project"]).flat().map(({ question }) => (
                    <TableCell key={question}>{record.responses?.[question] || '-'}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default RenewableProjectForm;
