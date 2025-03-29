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
//   Alert,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import AddIcon from "@mui/icons-material/Add";
// import DeleteIcon from "@mui/icons-material/Delete";

// const GovernanceSec = ({ sectionName, subcategory, questions, handleInputChange }) => {
//   const [basicEntry, setBasicEntry] = useState({});

//   const handleBasicFieldChange = (id, value) => {
//     const updatedEntry = { ...basicEntry, [id]: value };
//     setBasicEntry(updatedEntry);
//     const key = `${sectionName.replace(/\s+/g, "")}_${subcategory.replace(/\s+/g, "")}`;
//     handleInputChange(key, [updatedEntry]);
//   };

//   const handleDynamicArrayChange = (fieldIds, index, key, value) => {
//     const currentArray = [...(basicEntry[fieldIds[0]] || basicEntry[fieldIds[1]] || [])];
//     currentArray[index] = {
//       ...currentArray[index],
//       [key]: value,
//     };
//     fieldIds.forEach((fieldId) => handleBasicFieldChange(fieldId, currentArray));
//   };

//   const addDynamicRow = (fieldIds) => {
//     const current = [...(basicEntry[fieldIds[0]] || basicEntry[fieldIds[1]] || [])];
//     const newEntry = fieldIds.reduce((acc, id) => ({ ...acc, [id]: "" }), {});
//     const updated = [...current, newEntry];
//     fieldIds.forEach((fieldId) => handleBasicFieldChange(fieldId, updated));
//   };

//   const deleteDynamicRow = (fieldIds, index) => {
//     const updated = [...(basicEntry[fieldIds[0]] || basicEntry[fieldIds[1]] || [])];
//     updated.splice(index, 1);
//     fieldIds.forEach((fieldId) => handleBasicFieldChange(fieldId, updated));
//   };

//   const showAll = subcategory !== "Details of Holding/ Subsidiary/ Associate Companies/ Joint Ventures" || basicEntry["DetailsofHolding/Subsidiary/AssociateCompanies/JointVentures_Q1"] === "Yes";

//   return (
//     <div style={{ marginBottom: "20px" }}>
//       <Accordion>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography>{subcategory}</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           {(() => {
//             const rows = [];
//             for (let i = 0; i < questions.length; i++) {
//               const q = questions[i];
//               const fieldId = `${subcategory.replace(/\s+/g, "")}_Q${i + 1}`;

//               if (
//                 subcategory === "Details of Holding/ Subsidiary/ Associate Companies/ Joint Ventures" &&
//                 i > 0 &&
//                 basicEntry["DetailsofHolding/Subsidiary/AssociateCompanies/JointVentures_Q1"] !== "Yes"
//               ) {
//                 continue;
//               }

//               if (q.type === "boolean") {
//                 rows.push(
//                   <div key={fieldId} style={{ marginBottom: "16px" }}>
//                     <Typography variant="subtitle1">{q.question}</Typography>
//                     <FormControl component="fieldset">
//                       <RadioGroup
//                         row
//                         value={basicEntry[fieldId] || ""}
//                         onChange={(e) => handleBasicFieldChange(fieldId, e.target.value)}
//                       >
//                         <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
//                         <FormControlLabel value="No" control={<Radio />} label="No" />
//                       </RadioGroup>
//                     </FormControl>
//                   </div>
//                 );
//                 continue;
//               }

//               if (
//                 q.type === "array" &&
//                 q.align === "row" &&
//                 q.nature === "dynamic" &&
//                 i + 1 < questions.length &&
//                 questions[i + 1].type === "array" &&
//                 questions[i + 1].align === "row" &&
//                 questions[i + 1].nature === "dynamic"
//               ) {
//                 const q2 = questions[i + 1];
//                 const fieldId2 = `${subcategory.replace(/\s+/g, "")}_Q${i + 2}`;
//                 const data = basicEntry[fieldId] || basicEntry[fieldId2] || [{ [fieldId]: "", [fieldId2]: "" }];
//                 rows.push(
//                   <div key={fieldId + fieldId2} style={{ marginBottom: "16px" }}>
//                     {data.map((entry, idx) => (
//                       <div
//                         key={`${fieldId}_${idx}`}
//                         style={{ display: "flex", gap: "10px", marginBottom: "8px" }}
//                       >
//                         <TextField
//                           fullWidth
//                           placeholder={q.question}
//                           variant="outlined"
//                           value={entry[fieldId] || ""}
//                           onChange={(e) =>
//                             handleDynamicArrayChange([fieldId, fieldId2], idx, fieldId, e.target.value)
//                           }
//                         />
//                         <TextField
//                           fullWidth
//                           placeholder={q2.question}
//                           variant="outlined"
//                           value={entry[fieldId2] || ""}
//                           onChange={(e) =>
//                             handleDynamicArrayChange([fieldId, fieldId2], idx, fieldId2, e.target.value)
//                           }
//                         />
//                         <IconButton
//                           onClick={() => deleteDynamicRow([fieldId, fieldId2], idx)}
//                           color="error"
//                         >
//                           <DeleteIcon />
//                         </IconButton>
//                       </div>
//                     ))}
//                     <Button
//                       startIcon={<AddIcon />}
//                       onClick={() => addDynamicRow([fieldId, fieldId2])}
//                       variant="outlined"
//                       color="success"
//                     >
//                       Add Row
//                     </Button>
//                   </div>
//                 );
//                 i++;
//                 continue;
//               }

//               if (
//                 q.align === "row" &&
//                 (!q.type || q.type === "text" || q.type === "number") &&
//                 i + 1 < questions.length &&
//                 questions[i + 1].align === "row"
//               ) {
//                 const q2 = questions[i + 1];
//                 const fieldId2 = `${subcategory.replace(/\s+/g, "")}_Q${i + 2}`;
//                 rows.push(
//                   <div
//                     key={fieldId + fieldId2}
//                     style={{ display: "flex", gap: "10px", marginBottom: "16px" }}
//                   >
//                     {[q, q2].map((qq, idx) => {
//                       const fid = idx === 0 ? fieldId : fieldId2;
//                       return (
//                         <TextField
//                           key={fid}
//                           fullWidth
//                           placeholder={qq.question}
//                           variant="outlined"
//                           value={basicEntry[fid] || ""}
//                           onChange={(e) => handleBasicFieldChange(fid, e.target.value)}
//                         />
//                       );
//                     })}
//                   </div>
//                 );
//                 i++;
//                 continue;
//               }

//               rows.push(
//                 <div key={fieldId} style={{ marginBottom: "16px" }}>
//                   <Typography variant="subtitle1">{q.question}</Typography>
//                   <TextField
//                     fullWidth
//                     type={q.type === "number" ? "number" : "text"}
//                     variant="outlined"
//                     value={basicEntry[fieldId] || ""}
//                     onChange={(e) => handleBasicFieldChange(fieldId, e.target.value)}
//                   />
//                 </div>
//               );
//             }
//             return rows;
//           })()}
//         </AccordionDetails>
//       </Accordion>
//     </div>
//   );
// };

// export default GovernanceSec;


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
  Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const GovernanceSec = ({ sectionName, subcategory, questions, handleInputChange }) => {
  const [basicEntry, setBasicEntry] = useState({});

  const handleBasicFieldChange = (id, value) => {
    const updatedEntry = { ...basicEntry, [id]: value };
    setBasicEntry(updatedEntry);
    const key = `${sectionName.replace(/\s+/g, "")}_${subcategory.replace(/\s+/g, "")}`;
    handleInputChange(key, [updatedEntry]);
  };

  const handleDynamicArrayChange = (fieldId, index, key, value) => {
    const currentArray = [...(basicEntry[fieldId] || [])];
    currentArray[index] = {
      ...currentArray[index],
      [key]: value,
    };
    handleBasicFieldChange(fieldId, currentArray);
  };

  const addDynamicRow = (fieldId, fieldCount) => {
    const current = [...(basicEntry[fieldId] || [])];
    const newEntry = {};
    for (let i = 0; i < fieldCount; i++) {
      newEntry[`${fieldId}_F${i + 1}`] = "";
    }
    const updated = [...current, newEntry];
    handleBasicFieldChange(fieldId, updated);
  };

  const deleteDynamicRow = (fieldId, index) => {
    const updated = [...(basicEntry[fieldId] || [])];
    updated.splice(index, 1);
    handleBasicFieldChange(fieldId, updated);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{subcategory}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {(() => {
            const rows = [];
            for (let i = 0; i < questions.length; i++) {
              const q = questions[i];
              const fieldId = `${subcategory.replace(/\s+/g, "")}_Q${i + 1}`;

              if (q.type === "boolean") {
                rows.push(
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
                continue;
              }

              if (q.type === "array" && q.align === "row" && q.nature === "dynamic" && q.fields) {
                const data = basicEntry[fieldId] || [{ ...q.fields.reduce((acc, _, idx) => ({ ...acc, [`${fieldId}_F${idx + 1}`]: "" }), {}) }];
                rows.push(
                  <div key={fieldId} style={{ marginBottom: "16px" }}>
                    <Typography variant="subtitle1">{q.question}</Typography>
                    {data.map((entry, idx) => (
                      <div
                        key={`${fieldId}_${idx}`}
                        style={{ display: "flex", gap: "10px", marginBottom: "8px" }}
                      >
                        {q.fields.map((field, fIdx) => {
                          const nestedFieldId = `${fieldId}_F${fIdx + 1}`;
                          return (
                            <div key={nestedFieldId} style={{ flex: 1 }}>
                              <TextField
                                fullWidth
                                placeholder={field.question}
                                type={field.type === "number" ? "number" : "text"}
                                variant="outlined"
                                value={entry[nestedFieldId] || ""}
                                onChange={(e) =>
                                  handleDynamicArrayChange(fieldId, idx, nestedFieldId, e.target.value)
                                }
                              />
                            </div>
                          );
                        })}
                        <IconButton onClick={() => deleteDynamicRow(fieldId, idx)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    ))}
                    <Button
                      startIcon={<AddIcon />}
                      onClick={() => addDynamicRow(fieldId, q.fields.length)}
                      variant="outlined"
                      color="success"
                    >
                      Add Row
                    </Button>
                  </div>
                );
                continue;
              }

              if (
                q.align === "row" &&
                (!q.type || q.type === "text" || q.type === "number") &&
                i + 1 < questions.length &&
                questions[i + 1].align === "row"
              ) {
                const q2 = questions[i + 1];
                const fieldId2 = `${subcategory.replace(/\s+/g, "")}_Q${i + 2}`;
                rows.push(
                  <div
                    key={fieldId + fieldId2}
                    style={{ display: "flex", gap: "10px", marginBottom: "16px" }}
                  >
                    {[q, q2].map((qq, idx) => {
                      const fid = idx === 0 ? fieldId : fieldId2;
                      return (
                        <div key={fid} style={{ flex: 1 }}>
                          <Typography variant="subtitle2">{qq.question}</Typography>
                          <TextField
                            fullWidth
                            placeholder={qq.question}
                            variant="outlined"
                            value={basicEntry[fid] || ""}
                            onChange={(e) => handleBasicFieldChange(fid, e.target.value)}
                          />
                        </div>
                      );
                    })}
                  </div>
                );
                i++;
                continue;
              }

              rows.push(
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
            }
            return rows;
          })()}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default GovernanceSec;
