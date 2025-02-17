// import React from "react";
// import {
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Typography,
//   TextField,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormControl
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// const Section = ({ sectionName, subcategory, questions, handleInputChange }) => {
//   return (
//     <div style={{ marginBottom: "20px" }}>
//       {/* Subcategory Accordion inside Section */}
//       <Accordion>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography sx={{color:"#5A6C57"}} variant="h6">{subcategory}</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           {questions.map((q) => (
//             <div key={q.id} style={{ marginBottom: "16px" }}>
//               <Typography variant="subtitle1">{q.question}</Typography>

//               {/* Number Input */}
//               {q.type === "number" && (
//                 <TextField
//                   type="number"
//                   variant="outlined"
//                   fullWidth
//                   onChange={(e) => handleInputChange(q.id, e.target.value)}
//                 />
//               )}

//               {/* Text Input */}
//               {q.type === "text" && (
//                 <TextField
//                   type="text"
//                   variant="outlined"
//                   fullWidth
//                   onChange={(e) => handleInputChange(q.id, e.target.value)}
//                 />
//               )}

//               {/* Yes/No Radio Buttons */}
//               {q.type === "boolean" && (
//                 <FormControl component="fieldset">
//                   <RadioGroup
//                     row
//                     onChange={(e) => handleInputChange(q.id, e.target.value)}
//                   >
//                     <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
//                     <FormControlLabel value="No" control={<Radio />} label="No" />
//                   </RadioGroup>
//                 </FormControl>
//               )}
//             </div>
//           ))}
//         </AccordionDetails>
//       </Accordion>
//     </div>
//   );
// };

// export default Section;

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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "../../../api/axios";
import { useSelector } from "react-redux";

const Section = ({
  sectionName,
  subcategory,
  questions,
  handleInputChange,
}) => {
  const userId = useSelector((state) => state.auth.user?.id);
  const isMultiEntry = [
    "Purchased Goods & Services",
    "Use of Sold Products",
    "End-of-Life Treatment of Sold Products",
  ].includes(subcategory);

  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState({});

  // Fetch previously submitted data
  useEffect(() => {
    const fetchPreviousData = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(`/api/submissions/${userId}`);
        const userData =
          response.data?.responses?.[`${sectionName}_${subcategory}`] || [];
        setEntries(userData);
      } catch (error) {
        console.error("Error fetching previous submissions:", error);
      }
    };

    fetchPreviousData();
  }, [userId, sectionName, subcategory]);

  // Handle field changes
  const handleFieldChange = (id, value) => {
    setCurrentEntry((prev) => ({ ...prev, [id]: value }));
  };

  // Add new entry to the list
  const handleAddEntry = () => {
    if (Object.keys(currentEntry).length > 0) {
      const updatedEntries = [...entries, currentEntry];
      setEntries(updatedEntries);
      handleInputChange(`${sectionName}_${subcategory}`, updatedEntries);
      setCurrentEntry({});
    }
  };

  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography >
              {subcategory}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* Render fields for Multi-entry sections */}
            {isMultiEntry ? (
              <>
                {questions.map((q, index) => {
                  const fieldId = `${subcategory.replace(/\s+/g, "")}_Q${
                    index + 1
                  }`;
                  return (
                    <div key={fieldId} style={{ marginBottom: "16px" }}>
                      <Typography variant="subtitle1">{q.question}</Typography>

                      {q.type === "boolean" ? (
                        <FormControl component="fieldset">
                          <RadioGroup
                            row
                            value={currentEntry[fieldId] || ""}
                            onChange={(e) =>
                              handleFieldChange(fieldId, e.target.value)
                            }
                          >
                            <FormControlLabel
                              value="Yes"
                              control={<Radio />}
                              label="Yes"
                            />
                            <FormControlLabel
                              value="No"
                              control={<Radio />}
                              label="No"
                            />
                          </RadioGroup>
                        </FormControl>
                      ) : (
                        <TextField
                          type={q.type === "number" ? "number" : "text"}
                          variant="outlined"
                          fullWidth
                          value={currentEntry[fieldId] || ""}
                          onChange={(e) =>
                            handleFieldChange(fieldId, e.target.value)
                          }
                        />
                      )}
                    </div>
                  );
                })}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddEntry}
                  style={{ marginTop: "10px" }}
                >
                  Add
                </Button>

                {/* Display Table with Fetched Data */}
                {entries.length > 0 && (
                  <TableContainer
                    component={Paper}
                    style={{ marginTop: "20px" }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          {questions.map((q, index) => (
                            <TableCell key={index}>{q.question}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {entries.map((entry, index) => (
                          <TableRow key={index}>
                            {questions.map((q, qIndex) => {
                              const fieldId = `${subcategory.replace(
                                /\s+/g,
                                ""
                              )}_Q${qIndex + 1}`;
                              return (
                                <TableCell key={qIndex}>
                                  {entry[fieldId]}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </>
            ) : (
              // Render Normal Fields for Other Sections
              questions.map((q, index) => {
                const dynamicId = `${sectionName.replace(
                  /\s+/g,
                  ""
                )}_${subcategory.replace(/\s+/g, "")}_Q${index + 1}`;
                return (
                  <div key={dynamicId} style={{ marginBottom: "16px" }}>
                    <Typography variant="subtitle1">{q.question}</Typography>

                    {q.type === "boolean" ? (
                      <FormControl component="fieldset">
                        <RadioGroup
                          row
                          onChange={(e) =>
                            handleInputChange(dynamicId, e.target.value)
                          }
                        >
                          <FormControlLabel
                            value="Yes"
                            control={<Radio />}
                            label="Yes"
                          />
                          <FormControlLabel
                            value="No"
                            control={<Radio />}
                            label="No"
                          />
                        </RadioGroup>
                      </FormControl>
                    ) : (
                      <TextField
                        type={q.type === "number" ? "number" : "text"}
                        variant="outlined"
                        fullWidth
                        onChange={(e) =>
                          handleInputChange(dynamicId, e.target.value)
                        }
                      />
                    )}
                  </div>
                );
              })
            )}
          </AccordionDetails>
        </Accordion>
      </div>

      
    </>
  );
};

export default Section;
