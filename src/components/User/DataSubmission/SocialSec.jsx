// import React, { useEffect, useState } from "react";
// import {
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Typography,
//   TextField,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormControl,
//   Button,
//   IconButton,
//   MenuItem,
//   Alert
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import AddIcon from "@mui/icons-material/Add";

// const SocialSec = ({ sectionName, subcategory, questions, handleInputChange }) => {
//   const [basicEntry, setBasicEntry] = useState({});
//   const [validationError, setValidationError] = useState("");

//   const handleBasicFieldChange = (id, value) => {
//     const updatedEntry = { ...basicEntry, [id]: value };
//     setBasicEntry(updatedEntry);
//     handleInputChange(`${sectionName.replace(/\s+/g, "")}_${subcategory.replace(/\s+/g, "")}`, updatedEntry);
//   };

//   const handleDynamicArrayChange = (fieldId, index, subFieldId, value) => {
//     const arrayData = [...(basicEntry[fieldId] || [])];
//     arrayData[index] = { ...arrayData[index], [subFieldId]: value };
//     handleBasicFieldChange(fieldId, arrayData);
//   };

//   const addDynamicField = (fieldId) => {
//     const current = [...(basicEntry[fieldId] || [])];
//     handleBasicFieldChange(fieldId, [...current, {}]);
//   };

//   useEffect(() => {
//     const totalEmp = parseInt(basicEntry["WorkforceComposition&Diversity(Management&HRData)_Q1"] || 0);

//     const genderBreakdown = ["_Q2_F1", "_Q2_F2", "_Q2_F3"].reduce((sum, key) => {
//       return sum + parseInt(basicEntry[`WorkforceComposition&Diversity(Management&HRData)${key}`] || 0);
//     }, 0);

//     const empTypeBreakdown = (basicEntry["WorkforceComposition&Diversity(Management&HRData)_Q3"] || []).reduce((sum, obj) => {
//       return (
//         sum +
//         Object.values(obj).reduce((acc, val) => acc + parseInt(val || 0), 0)
//       );
//     }, 0);

//     if (totalEmp && (genderBreakdown !== totalEmp || empTypeBreakdown !== totalEmp)) {
//       setValidationError("Gender breakdown or employment type count must equal total number of employees.");
//     } else {
//       setValidationError("");
//     }
//   }, [basicEntry]);

//   return (
//     <div style={{ marginBottom: '12px' }}>
//       <Accordion>
//       <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//         <Typography>{subcategory}</Typography>
//       </AccordionSummary>
//       <AccordionDetails>
//         {validationError && (
//           <Alert severity="error" style={{ marginBottom: "16px" }}>
//             {validationError}
//           </Alert>
//         )}

//         {questions.map((q, index) => {
//           const fieldId = `${subcategory.replace(/\s+/g, "")}_Q${index + 1}`;

//           if (q.type === "boolean") {
//             return (
//               <div key={fieldId} style={{ marginBottom: "16px" }}>
//                 <Typography variant="subtitle1">{q.question}</Typography>
//                 <FormControl component="fieldset">
//                   <RadioGroup
//                     row
//                     value={basicEntry[fieldId] || ""}
//                     onChange={(e) => handleBasicFieldChange(fieldId, e.target.value)}
//                   >
//                     <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
//                     <FormControlLabel value="No" control={<Radio />} label="No" />
//                   </RadioGroup>
//                 </FormControl>
//               </div>
//             );
//           }

//           if (q.type === "array" && q.nature === "dynamic") {
//             return (
//               <div key={fieldId} style={{ marginBottom: "16px" }}>
//                 <Typography variant="subtitle1">{q.question}</Typography>
//                 {(basicEntry[fieldId] || [{}]).map((entry, idx) => (
//                   <div
//                     key={`${fieldId}_entry_${idx}`}
//                     style={{ display: "flex", gap: "10px", marginBottom: "8px" }}
//                   >
//                     {q.fields.map((subField, subIdx) => {
//                       const subFieldId = `${fieldId}_F${subIdx + 1}`;
//                       return (
//                         <TextField
//                           key={subFieldId}
//                           label={subField.question}
//                           type={subField.type}
//                           variant="outlined"
//                           value={entry[subFieldId] || ""}
//                           onChange={(e) => handleDynamicArrayChange(fieldId, idx, subFieldId, e.target.value)}
//                         />
//                       );
//                     })}
//                   </div>
//                 ))}
//                 <IconButton onClick={() => addDynamicField(fieldId)} color="primary">
//                   <AddIcon />
//                 </IconButton>
//               </div>
//             );
//           }

//           if (q.type === "array" && q.align === "row") {
//             return (
//               <div
//                 key={fieldId}
//                 style={{ display: "flex", gap: "10px", marginBottom: "16px" }}
//               >
//                 {q.fields.map((field, subIdx) => {
//                   const subFieldId = `${fieldId}_F${subIdx + 1}`;
//                   return (
//                     <div key={subFieldId} style={{ flex: 1 }}>
//                       <Typography variant="subtitle1">{field.question}</Typography>
//                       <TextField
//                         fullWidth
//                         type={field.type === "number" ? "number" : "text"}
//                         variant="outlined"
//                         value={basicEntry[subFieldId] || ""}
//                         onChange={(e) => handleBasicFieldChange(subFieldId, e.target.value)}
//                       />
//                     </div>
//                   );
//                 })}
//               </div>
//             );
//           }

//           return (
//             <div key={fieldId} style={{ marginBottom: "16px" }}>
//               <Typography variant="subtitle1">{q.question}</Typography>
//               <TextField
//                 fullWidth
//                 type={q.type === "number" ? "number" : "text"}
//                 variant="outlined"
//                 value={basicEntry[fieldId] || ""}
//                 onChange={(e) => handleBasicFieldChange(fieldId, e.target.value)}
//               />
//             </div>
//           );
//         })}
//       </AccordionDetails>
//     </Accordion>
//     </div>
//   );
// };

// export default SocialSec;


import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  IconButton,
  MenuItem,
  Alert
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";

const SocialSec = ({ sectionName, subcategory, questions, handleInputChange }) => {
  const [basicEntry, setBasicEntry] = useState({});
  const [validationError, setValidationError] = useState("");

  const handleBasicFieldChange = (id, value) => { 
    const updatedEntry = { ...basicEntry, [id]: value };
    setBasicEntry(updatedEntry);
    // handleInputChange(`${sectionName.replace(/\s+/g, "")}_${subcategory.replace(/\s+/g, "")}`, updatedEntry);
    const key = `${sectionName.replace(/\s+/g, "")}_${subcategory.replace(/\s+/g, "")}`;
handleInputChange(key, [updatedEntry]); // 👈 wrap in array

  };

  const handleDynamicArrayChange = (fieldId, index, key, value) => {
    const arrayData = [...(basicEntry[fieldId] || [])];
    arrayData[index] = { ...arrayData[index], [key]: value };
    handleBasicFieldChange(fieldId, arrayData);
  };

  const addDynamicField = (fieldId) => {
    const current = [...(basicEntry[fieldId] || [])];
    handleBasicFieldChange(fieldId, [...current, { type: "", count: "" }]);
  };

  useEffect(() => {
    const empTotal = parseInt(basicEntry["WorkforceComposition&Diversity(Management&HRData)_Q1"] || 0);
    const empGenderSum = ["_Q2_F1", "_Q2_F2", "_Q2_F3"].reduce((sum, key) => {
      return sum + parseInt(basicEntry[`WorkforceComposition&Diversity(Management&HRData)${key}`] || 0);
    }, 0);
    const empTypeSum = (basicEntry["WorkforceComposition&Diversity(Management&HRData)_Q3"] || []).reduce((sum, obj) => {
      return sum + parseInt(obj.count || 0);
    }, 0);

    const workerTotal = parseInt(basicEntry["WorkforceComposition&Diversity(Management&HRData)_Q5"] || 0);
    const workerGenderSum = ["_Q6_F1", "_Q6_F2", "_Q6_F3"].reduce((sum, key) => {
      return sum + parseInt(basicEntry[`WorkforceComposition&Diversity(Management&HRData)${key}`] || 0);
    }, 0);
    const workerTypeSum = (basicEntry["WorkforceComposition&Diversity(Management&HRData)_Q7"] || []).reduce((sum, obj) => {
      return sum + parseInt(obj.count || 0);
    }, 0);

    if (
      (empTotal && (empGenderSum !== empTotal || empTypeSum !== empTotal)) ||
      (workerTotal && (workerGenderSum !== workerTotal || workerTypeSum !== workerTotal))
    ) {
      setValidationError("Mismatch in employee or worker count vs breakdown.");
    } else {
      setValidationError("");
    }
  }, [basicEntry]);

  return (
    <div style={{ marginBottom: '20px' }}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{subcategory}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {validationError && (
            <Alert severity="error" style={{ marginBottom: "16px" }}>
              {validationError}
            </Alert>
          )}

          {questions.map((q, index) => {
            const fieldId = `${subcategory.replace(/\s+/g, "")}_Q${index + 1}`;

            if (q.type === "boolean") {
              return (
                <div key={fieldId} style={{ marginBottom: "16px" }}>
                  <Typography variant="subtitle1">{q.question}</Typography>
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      value={basicEntry[fieldId] || ""}
                      onChange={(e) => handleBasicFieldChange(fieldId, e.target.value)}
                    >
                      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                </div>
              );
            }

            if (q.type === "array" && q.nature === "dynamic") {
              const entries = basicEntry[fieldId] || [{ type: "", count: "" }];
              return (
                <div key={fieldId} style={{ marginBottom: "16px" }}>
                  <Typography variant="subtitle1">{q.question}</Typography>
                  {entries.map((entry, idx) => (
                    <div
                      key={`${fieldId}_entry_${idx}`}
                      style={{ display: "flex", gap: "10px", marginBottom: "8px", alignItems: "center" }}
                    >
                      <TextField
                        label="Employment Type"
                        variant="outlined"
                        value={entry.type}
                        onChange={(e) => handleDynamicArrayChange(fieldId, idx, "type", e.target.value)}
                      />
                      <TextField
                        label="Count"
                        type="number"
                        variant="outlined"
                        value={entry.count}
                        onChange={(e) => handleDynamicArrayChange(fieldId, idx, "count", e.target.value)}
                      />
                      {entries.length > 1 && (
                        <IconButton
                          onClick={() => {
                            const updated = [...entries];
                            updated.splice(idx, 1);
                            handleBasicFieldChange(fieldId, updated);
                          }}
                          color="error"
                        >
                          ❌
                        </IconButton>
                      )}
                    </div>
                  ))}
                  <IconButton onClick={() => addDynamicField(fieldId)} color="primary">
                    <AddIcon />
                  </IconButton>
                </div>
              );
            }

            if (q.type === "array" && q.align === "row") {
              return (
                <div
                  key={fieldId}
                  style={{ display: "flex", gap: "10px", marginBottom: "16px" }}
                >
                  {q.fields.map((field, subIdx) => {
                    const subFieldId = `${fieldId}_F${subIdx + 1}`;
                    return (
                      <div key={subFieldId} style={{ flex: 1 }}>
                        <Typography variant="subtitle1">{field.question}</Typography>
                        <TextField
                          fullWidth
                          type={field.type === "number" ? "number" : "text"}
                          variant="outlined"
                          value={basicEntry[subFieldId] || ""}
                          onChange={(e) => handleBasicFieldChange(subFieldId, e.target.value)}
                        />
                      </div>
                    );
                  })}
                </div>
              );
            }

            return (
              <div key={fieldId} style={{ marginBottom: "16px" }}>
                <Typography variant="subtitle1">{q.question}</Typography>
                <TextField
                  fullWidth
                  type={q.type === "number" ? "number" : "text"}
                  variant="outlined"
                  value={basicEntry[fieldId] || ""}
                  onChange={(e) => handleBasicFieldChange(fieldId, e.target.value)}
                />
              </div>
            );
          })}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default SocialSec;
