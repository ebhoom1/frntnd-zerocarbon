import React, { useState } from 'react';
import {
  Accordion, AccordionSummary, AccordionDetails,
  Typography, TextField, Switch, Button, FormControlLabel, Grid
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from '../../../api/axios';

const questions = {
  "A: Company Governance & Statutory Compliance": [
    { key: "q1", text: "What is your company PAN, TAN, and CIN?", type: "multi", fields: ["PAN", "TAN", "CIN"] },
    { key: "q2", text: "Do you have a valid Trade License?", type: "boolean" },
    { key: "q3", text: "Is your Shops & Establishment Act registration active?", type: "boolean" },
    { key: "q4", text: "What is your ROC filing status?", type: "text" },
    { key: "q5", text: "When was your last Board Meeting or AGM held?", type: "text" },
    { key: "q6", text: "Is your Income Tax Return for the latest FY filed?", type: "boolean" },
    { key: "q7", text: "What is your GST registration number?", type: "text" },
    { key: "q8", text: "Are GSTR-1 and GSTR-3B filed for the last 3 months?", type: "boolean" },
    { key: "q9", text: "Are TDS returns (24Q/26Q) filed for the latest quarter?", type: "boolean" },
  ],
  "B: Environmental & Safety Compliance": [
    { key: "q10", text: "Do you have Consent to Establish (CTE) from PCB?", type: "boolean" },
    { key: "q11", text: "Do you have Consent to Operate (CTO)?", type: "boolean" },
    { key: "q12", text: "Have you submitted the Environmental Statement (Form V)?", type: "boolean" },
    { key: "q13", text: "Do you generate hazardous waste and submit Form 4?", type: "boolean" },
    { key: "q14", text: "Is your OCEMS connected to SPCB/CPCB servers?", type: "boolean" },
    { key: "q15", text: "Have you applied for LEED/IGBC/GRIHA green certifications?", type: "boolean" },
    { key: "q16", text: "Have you conducted an energy or water audit?", type: "boolean" },
    { key: "q17", text: "Do you have ISO 14001 or ISO 50001 certifications?", type: "boolean" },
    { key: "q18", text: "Do you have a valid Fire NOC?", type: "boolean" },
    { key: "q19", text: "Do you have a structural safety certificate?", type: "boolean" },
    { key: "q20", text: "Is your Emergency Preparedness Plan documented?", type: "boolean" },
  ],
  "C: HR & Labour Compliance": [
    { key: "q21", text: "Do you have EPFO and ESIC registration numbers?", type: "multi", fields: ["EPFO", "ESIC"] },
    { key: "q22", text: "Are monthly EPF and ESI challans being paid on time?", type: "boolean" },
    { key: "q23", text: "Are you registered under the Professional Tax Act?", type: "boolean" },
    { key: "q24", text: "Do you have a documented POSH Policy?", type: "boolean" },
    { key: "q25", text: "Is there a Code of Conduct for employees?", type: "boolean" },
    { key: "q26", text: "Do you conduct ESG, CSR, or POSH awareness trainings?", type: "boolean" },
  ],
  "D: Industry-Specific Licenses": [
    { key: "q27", text: "Do you hold a valid Factory License?", type: "boolean" },
    { key: "q28", text: "Are pressure vessel and boiler inspections up to date?", type: "boolean" },
    { key: "q29", text: "Do you have calibration certificates for all instruments?", type: "boolean" },
    { key: "q30", text: "Are you registered under STPI or SEZ?", type: "boolean" },
    { key: "q31", text: "Do you follow ISO 27001 or any cybersecurity framework?", type: "boolean" },
    { key: "q32", text: "Do you maintain software license agreements?", type: "boolean" },
    { key: "q33", text: "Do you have an FSSAI license?", type: "boolean" },
    { key: "q34", text: "Are you certified under GMP, HACCP, or ISO 22000?", type: "boolean" },
    { key: "q35", text: "Do you maintain lab test records for products?", type: "boolean" },
  ],
  "E: ESG & CSR": [
    { key: "q36", text: "Have you submitted BRSR/GRI/CDP reports?", type: "boolean" },
    { key: "q37", text: "Have you conducted a Carbon Footprint or LCA study?", type: "boolean" },
    { key: "q38", text: "Do you use renewable energy? If yes, how much (%)(if not leave it empty)?", type: "text" },
    { key: "q39", text: "Have you received any ESG ratings or certifications?", type: "boolean" },
    { key: "q40", text: "Are you required to spend under CSR rules?", type: "boolean" },
    { key: "q41", text: "Is your CSR policy and committee in place?", type: "boolean" },
    { key: "q42", text: "Was an impact assessment conducted for CSR activities?", type: "boolean" },
  ],
  "F: Local Government & LSGB": [
    { key: "q43", text: "Have you paid your latest Property Tax?", type: "boolean" },
    { key: "q44", text: "Is your municipal trade license current?", type: "boolean" },
    { key: "q45", text: "Do you follow local solid waste management rules?", type: "boolean" },
    { key: "q46", text: "Is a rainwater harvesting or STP plan implemented?", type: "boolean" },
  ],
  "G: Legal & Risk": [
    { key: "q47", text: "Do you have professional liability or general insurance?", type: "boolean" },
    { key: "q48", text: "Are there any active legal cases or notices?", type: "boolean" },
    { key: "q49", text: "Do you maintain vendor or customer MOUs or agreements?", type: "boolean" },
    { key: "q50", text: "Do you have NDAs or IP assignment clauses with staff?", type: "boolean" },
  ],
};

const GovernanceComplianceForm = ({ userId }) => {
  const [responses, setResponses] = useState({});
  const [files, setFiles] = useState({});
  const [expanded, setExpanded] = useState(false);

  const handleChange = (key, value) => {
    setResponses((prev) => ({ ...prev, [key]: value }));
  };

  const handleMultiFieldChange = (key, field, value) => {
    setResponses((prev) => ({
      ...prev,
      [key]: { ...(prev[key] || {}), [field]: value },
    }));
  };

  const handleFileChange = (key, file) => {
    setFiles((prev) => ({ ...prev, [key]: file }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("responses", JSON.stringify(responses));
  
    Object.entries(files).forEach(([key, file]) => {
      formData.append(key, file);
    });
  
    try {
      const res = await axios.post("/api/governance/submit", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
     console.log("response:",res.data);
     alert("Files uploaded")
    } catch (err) {
      console.error("Submission error:", err);
      
    }
  };
  

  return (
    <div style={{marginBottom:"20px"}}>
      <Typography sx={{fontSize:"16px",marginBottom:"20px",fontWeight: "bold" }}>Governance Compliance</Typography>
      {Object.entries(questions).map(([section, qlist]) => (
        <Accordion sx={{marginBottom:"20px"}} key={section} expanded={expanded === section} onChange={() => setExpanded(expanded === section ? false : section)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{fontSize:"16px"}}>{section}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {qlist.map(({ key, text, type, fields }) => (
              <div key={key} style={{ marginBottom: 20 }}>
                <Typography>{text}</Typography>
                {type === "text" && (
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={responses[key] || ''}
                    onChange={(e) => handleChange(key, e.target.value)}
                  />
                )}
                {type === "multi" && (
                  <Grid container spacing={2}>
                    {fields.map((field) => (
                      <Grid item xs={12} sm={4} key={field}>
                        <TextField
                          fullWidth
                          label={field}
                          variant="outlined"
                          value={responses[key]?.[field] || ''}
                          onChange={(e) => handleMultiFieldChange(key, field, e.target.value)}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )}
                {type === "boolean" && (
                  <>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={responses[key] || false}
                          onChange={(e) => handleChange(key, e.target.checked)}
                        />
                      }
                      label={responses[key] ? "Yes" : "No"}
                    />
                    {responses[key] && (
                      <input
                        type="file"
                        accept="application/pdf,image/*"
                        onChange={(e) => handleFileChange(key, e.target.files[0])}
                      />
                    )}
                  </>
                )}
              </div>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>Submit</Button>
    </div>
  );
};

export default GovernanceComplianceForm;
