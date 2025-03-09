

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

const EnvironmentSec = ({
  sectionName,
  subcategory,
  questions,
  handleInputChange,
}) => {
  const userId = useSelector((state) => state.auth.user?.id);

  // Subcategories that require conditional question display
  const conditionalCategories = [
    "Mobile Combustion",
    "Stationary Combustion",
    "Industrial Processes",
    "Fugitive Emissions",
  ];

  const isMultiEntry = [
    "Purchased Goods & Services",
    "Use of Sold Products",
    "End-of-Life Treatment of Sold Products",
    "Mobile Combustion",
    "Stationary Combustion",
    "Industrial Processes",
  ].includes(subcategory);

  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState({});
  const [basicEntry, setBasicEntry] = useState({});
  const [firstQuestionAnswer, setFirstQuestionAnswer] = useState(null);

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

  const handleFirstQuestionChange = (value) => {
    console.log("First Question Value Selected:", value);
  
    setFirstQuestionAnswer(value); // ✅ Ensure state updates
    setBasicEntry((prev) => {
      const updatedEntry = {  [`${subcategory.replace(/\s+/g, "")}_Q1`]: value,...prev };
      console.log("Updated Basic Entry with First Question:", updatedEntry);
  
      // ✅ Ensure first question is stored in an array before sending to backend
      const arrayEntries = [updatedEntry];
  
      handleInputChange(
        `${sectionName.replace(/\s+/g, "")}_${subcategory.replace(/\s+/g, "")}`,
        arrayEntries
      );
  
      return updatedEntry; // ✅ Ensures latest state is returned
    });
  };
  
  const handleFieldChange = (id, value) => {
    setCurrentEntry((prev) => ({ ...prev, [id]: value }));
   
  };

  const handleBasicFieldChange = (id, value) => {
    setBasicEntry((prev) => {
      const updatedEntry = { ...prev, [id]: value }; // ✅ Correctly updates state
      console.log("Updated basicEntry:", updatedEntry);
  
      // ✅ Ensure basicEntry is stored in an array before sending to backend
      const arrayEntries = [updatedEntry];
      console.log("arrayEntries before sending:", arrayEntries);
  
      handleInputChange(
        `${sectionName.replace(/\s+/g, "")}_${subcategory.replace(/\s+/g, "")}`,
        arrayEntries
      );
  
      return updatedEntry; // ✅ Ensures the latest state is returned
    });
  };
  
  // const handleAddEntry = () => {
  //   if (Object.keys(currentEntry).length > 0) {
  //     const updatedEntries = [...entries, currentEntry];
  //     setEntries(updatedEntries);
  //     handleInputChange(`${sectionName}_${subcategory}`, updatedEntries);
  //     setCurrentEntry({});
  //   }
  // };

  const handleAddEntry = () => {
    if (Object.keys(currentEntry).length > 0 || firstQuestionAnswer) {
      const firstQuestionField = `${subcategory.replace(/\s+/g, "")}_Q1`; // Naming similar to other fields

      const updatedEntry = {
        [firstQuestionField]: firstQuestionAnswer, // Include first question with proper field name
        ...currentEntry,
      };

      const updatedEntries = [...entries, updatedEntry];
      setEntries(updatedEntries);
      handleInputChange(
        `${sectionName.replace(/\s+/g, "")}_${subcategory.replace(/\s+/g, "")}`,
        updatedEntries
      );
      setCurrentEntry({});
    }
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{subcategory}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {questions.length > 0 && (
            <>
              {/* ✅ FIRST QUESTION (Always Displayed) */}
              <div style={{ marginBottom: "16px" }}>
                <Typography variant="subtitle1">
                  {questions[0].question}
                </Typography>

                {questions[0].type === "boolean" ? (
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      value={firstQuestionAnswer || ""}
                      onChange={(e) =>
                        handleFirstQuestionChange(e.target.value)
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
                    type={questions[0].type === "number" ? "number" : "text"}
                    variant="outlined"
                    fullWidth
                    value={firstQuestionAnswer || ""}
                    onChange={(e) => handleFirstQuestionChange(e.target.value)}
                  />
                )}
              </div>
            </>
          )}

          {/* ✅ CONDITIONAL DISPLAY FOR SPECIFIC SUBCATEGORIES */}
          {(!conditionalCategories.includes(subcategory) || // Always show for other subcategories
            (firstQuestionAnswer &&
              (questions[0].type !== "boolean" ||
                firstQuestionAnswer === "Yes"))) && ( // Show if answered & valid for boolean
            <>
              {isMultiEntry ? (
                <>
                  {questions.slice(1).map((q, index) => {
                    const fieldId = `${subcategory.replace(/\s+/g, "")}_Q${
                      index + 2
                    }`;
                    return (
                      <div key={fieldId} style={{ marginBottom: "16px" }}>
                        <Typography variant="subtitle1">
                          {q.question}
                        </Typography>

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

                  {/* Display Table */}
                  {entries.length > 0 && (
                    <TableContainer
                      component={Paper}
                      style={{ marginTop: "20px" }}
                    >
                      <Table>
                        <TableHead>
                          <TableRow>
                            {questions.slice(1).map((q, index) => (
                              <TableCell key={index}>{q.question}</TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {entries.map((entry, index) => (
                            <TableRow key={index}>
                              {questions.slice(1).map((q, qIndex) => {
                                const fieldId = `${subcategory.replace(
                                  /\s+/g,
                                  ""
                                )}_Q${qIndex + 2}`;
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
                questions.slice(1).map((q, index) => {
                  const fieldId = `${subcategory.replace(/\s+/g, "")}_Q${
                    index + 2
                  }`;

                  // const fieldId = `${sectionName.replace(/\s+/g, "")}_${subcategory.replace(/\s+/g, "")}_Q${index+2 }`;
                  return (
                    <div key={fieldId} style={{ marginBottom: "16px" }}>
                      <Typography variant="subtitle1">{q.question}</Typography>
                      <TextField
                        type={q.type === "number" ? "number" : "text"}
                        variant="outlined"
                        fullWidth
                        // onChange={(e) => handleInputChange(fieldId, e.target.value)}
                        onChange={(e) =>
                          handleBasicFieldChange(fieldId, e.target.value)
                        }
                      />
                    </div>
                  );
                })
              )}
            </>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default EnvironmentSec;

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
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import axios from "../../../api/axios";
// import { useSelector } from "react-redux";

// const EnvironmentSec = ({ sectionName, subcategory, questions, handleInputChange }) => {
//   const userId = useSelector((state) => state.auth.user?.id);

//   const isMultiEntry = true; // ✅ All fields should now store as arrays

//   const [entries, setEntries] = useState([]);
//   const [currentEntry, setCurrentEntry] = useState({});

//   useEffect(() => {
//     const fetchPreviousData = async () => {
//       if (!userId) return;

//       try {
//         const response = await axios.get(`/api/submissions/${userId}`);
//         const userData = response.data?.responses?.[`${sectionName}_${subcategory}`] || [];
//         setEntries(Array.isArray(userData) ? userData : [userData]); // Ensure it's always an array
//       } catch (error) {
//         console.error("Error fetching previous submissions:", error);
//       }
//     };

//     fetchPreviousData();
//   }, [userId, sectionName, subcategory]);

//   const handleFieldChange = (id, value) => {
//     setCurrentEntry((prev) => ({ ...prev, [id]: value }));
//   };

//   const handleAddEntry = () => {
//     if (Object.keys(currentEntry).length > 0) {
//       const updatedEntries = [...entries, currentEntry];
//       setEntries(updatedEntries);
//       handleInputChange(`${sectionName.replace(/\s+/g, "")}_${subcategory.replace(/\s+/g, "")}`, updatedEntries);
//       setCurrentEntry({});
//     }
//   };

//   return (
//     <div style={{ marginBottom: "10px" }}>
//       <Accordion>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography>{subcategory}</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           {isMultiEntry ? (
//             <>
//               {questions.map((q, index) => {
//                 const fieldId = `${subcategory.replace(/\s+/g, "")}_Q${index + 1}`;
//                 return (
//                   <div key={fieldId} style={{ marginBottom: "16px" }}>
//                     <Typography variant="subtitle1">{q.question}</Typography>
//                     {q.type === "boolean" ? (
//                       <FormControl component="fieldset">
//                         <RadioGroup
//                           row
//                           value={currentEntry[fieldId] || ""}
//                           onChange={(e) => handleFieldChange(fieldId, e.target.value)}
//                         >
//                           <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
//                           <FormControlLabel value="No" control={<Radio />} label="No" />
//                         </RadioGroup>
//                       </FormControl>
//                     ) : (
//                       <TextField
//                         type={q.type === "number" ? "number" : "text"}
//                         variant="outlined"
//                         fullWidth
//                         value={currentEntry[fieldId] || ""}
//                         onChange={(e) => handleFieldChange(fieldId, e.target.value)}
//                       />
//                     )}
//                   </div>
//                 );
//               })}

//               <Button variant="contained" color="primary" onClick={handleAddEntry} style={{ marginTop: "10px" }}>
//                 Add
//               </Button>

//               {/* Display Table */}
//               {entries.length > 0 && (
//                 <TableContainer component={Paper} style={{ marginTop: "20px" }}>
//                   <Table>
//                     <TableHead>
//                       <TableRow>
//                         {questions.map((q, index) => (
//                           <TableCell key={index}>{q.question}</TableCell>
//                         ))}
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {entries.map((entry, index) => (
//                         <TableRow key={index}>
//                           {questions.map((q, qIndex) => {
//                             const fieldId = `${subcategory.replace(/\s+/g, "")}_Q${qIndex + 1}`;
//                             return <TableCell key={qIndex}>{entry[fieldId] || "N/A"}</TableCell>;
//                           })}
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               )}
//             </>
//           ) : null}
//         </AccordionDetails>
//       </Accordion>
//     </div>
//   );
// };

// export default EnvironmentSec;
