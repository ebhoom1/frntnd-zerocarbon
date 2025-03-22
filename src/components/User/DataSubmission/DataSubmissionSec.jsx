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
//   MenuItem,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import axios from "../../../api/axios";
// import { useSelector } from "react-redux";
// import MobileCombustionEmissionDialog from "./MobileCombustionEmissionDialog"; // adjust path as needed
// import StationaryCombustionEmissionDialog from "./StationaryCombustionEmissionDialog";
// import IndustrialProcessEmissionDialog from "./IndustrialProcessEmissionDialog";
// import FugitiveEmissionDialog from "./FugitiveEmissionDialog";
// import PurchasedElectricityDialog from "./PurchasedElectricityDialog";
// import PurchasedSteamHeatCoolingEmissionDialog from "./PurchasedSteamHeatCoolingEmissionDialog";

// const EnvironmentSec = ({
//   sectionName,
//   subcategory,
//   questions,
//   handleInputChange,
// }) => {
//   const userId = useSelector((state) => state.auth.user?.id);

//   // Subcategories that require conditional question display
//   const conditionalCategories = [
//     "Mobile Combustion",
//     "Stationary Combustion",
//     "Industrial Processes",
//     "Fugitive Emissions",
//   ];

//   const isMultiEntry = [
//     "Purchased Goods & Services",
//     "Use of Sold Products",
//     "End-of-Life Treatment of Sold Products",
//     "Mobile Combustion",
//     "Stationary Combustion",
//     "Industrial Processes",
//     "Fugitive Emissions"
//   ].includes(subcategory);

//   const [entries, setEntries] = useState([]);
//   const [currentEntry, setCurrentEntry] = useState({});
//   const [basicEntry, setBasicEntry] = useState({});
//   const [firstQuestionAnswer, setFirstQuestionAnswer] = useState(null);
//   const [openEmissionDialog, setOpenEmissionDialog] = useState(false);
//   const [openStationaryDialog, setOpenStationaryDialog] = useState(false);
//   const [openIndustrialDialog, setOpenIndustrialDialog] = useState(false);
//   const [openFugitiveDialog, setOpenFugitiveDialog] = useState(false);
//   const [openPurchasedElectricityDialog, setOpenPurchasedElectricityDialog] = useState(false);
//   const [openPurchasedSteamDialog, setOpenPurchasedSteamDialog] = useState(false);

//   useEffect(() => {
//     const fetchPreviousData = async () => {
//       if (!userId) return;

//       try {
//         const response = await axios.get(`/api/submissions/${userId}`);
//         const userData =
//           response.data?.responses?.[`${sectionName}_${subcategory}`] || [];
//         setEntries(userData);
//       } catch (error) {
//         console.error("Error fetching previous submissions:", error);
//       }
//     };

//     fetchPreviousData();
//   }, [userId, sectionName, subcategory]);

//   const handleFirstQuestionChange = (value) => {
//     console.log("First Question Value Selected:", value);

//     setFirstQuestionAnswer(value); // ✅ Ensure state updates
//     setBasicEntry((prev) => {
//       const updatedEntry = {
//         [`${subcategory.replace(/\s+/g, "")}_Q1`]: value,
//         ...prev,
//       };
//       console.log("Updated Basic Entry with First Question:", updatedEntry);

//       // ✅ Ensure first question is stored in an array before sending to backend
//       const arrayEntries = [updatedEntry];

//       handleInputChange(
//         `${sectionName.replace(/\s+/g, "")}_${subcategory.replace(/\s+/g, "")}`,
//         arrayEntries
//       );

//       return updatedEntry; // ✅ Ensures latest state is returned
//     });
//   };

//   const handleFieldChange = (id, value) => {
//     setCurrentEntry((prev) => ({ ...prev, [id]: value }));
//   };

//   const handleBasicFieldChange = (id, value) => {
//     setBasicEntry((prev) => {
//       const updatedEntry = { ...prev, [id]: value }; // ✅ Correctly updates state
//       console.log("Updated basicEntry:", updatedEntry);

//       // ✅ Ensure basicEntry is stored in an array before sending to backend
//       // const arrayEntries = [updatedEntry];
//       const arrayEntries = [{ ...updatedEntry }];

//       console.log("arrayEntries before sending:", arrayEntries);

//       handleInputChange(
//         `${sectionName.replace(/\s+/g, "")}_${subcategory.replace(/\s+/g, "")}`,
//         arrayEntries
//       );
//       console.log("arrayentries:",arrayEntries);

//       return updatedEntry; // ✅ Ensures the latest state is returned
//     });
//   };

//   // const handleAddEntry = () => {
//   //   if (Object.keys(currentEntry).length > 0) {
//   //     const updatedEntries = [...entries, currentEntry];
//   //     setEntries(updatedEntries);
//   //     handleInputChange(`${sectionName}_${subcategory}`, updatedEntries);
//   //     setCurrentEntry({});
//   //   }
//   // };

//   const handleAddEntry = () => {
//     if (Object.keys(currentEntry).length > 0 || firstQuestionAnswer) {
//       const firstQuestionField = `${subcategory.replace(/\s+/g, "")}_Q1`; // Naming similar to other fields

//       const updatedEntry = {
//         [firstQuestionField]: firstQuestionAnswer, // Include first question with proper field name
//         ...currentEntry,
//       };

//       const updatedEntries = [...entries, updatedEntry];
//       setEntries(updatedEntries);
//       handleInputChange(
//         `${sectionName.replace(/\s+/g, "")}_${subcategory.replace(/\s+/g, "")}`,
//         updatedEntries
//       );
//       setCurrentEntry({});
//     }
//   };

//   return (
//     <div style={{ marginBottom: "10px" }}>
//       <Accordion>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               width: "100%",
//               alignItems: "center",
//             }}
//           >
//             <Typography>{subcategory}</Typography>
//             {subcategory === "Mobile Combustion" && (
//               <Button
//                 variant="outlined"
//                 size="small"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setOpenEmissionDialog(true);
//                 }}
//               >
//                 Emission Details
//               </Button>
//             )}
//             {subcategory === "Stationary Combustion" && (
//               <Button
//                 variant="outlined"
//                 size="small"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setOpenStationaryDialog(true);
//                 }}
//               >
//                 Emission Details
//               </Button>
//             )}
//             {subcategory === "Industrial Processes" && (
//               <Button
//                 variant="outlined"
//                 size="small"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setOpenIndustrialDialog(true);
//                 }}
//               >
//                 Emission Details
//               </Button>
//             )}
//             {subcategory === "Fugitive Emissions" && (
//               <Button
//                 variant="outlined"
//                 size="small"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setOpenFugitiveDialog(true);
//                 }}
//               >
//                 Emission Details
//               </Button>
//             )}
//             {subcategory === "Purchased Electricity" && (
//               <Button
//                 variant="outlined"
//                 size="small"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setOpenPurchasedElectricityDialog(true);
//                 }}
//               >
//                 Emission Details
//               </Button>
//             )}
//             {subcategory === "Purchased Steam, Heat, or Cooling" && (
//               <Button
//                 variant="outlined"
//                 size="small"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setOpenPurchasedSteamDialog(true);
//                 }}
//               >
//                 Emission Details
//               </Button>
//             )}
//           </div>
//         </AccordionSummary>
//         <AccordionDetails>
//           {questions.length > 0 && (
//             <>
//               {/* ✅ FIRST QUESTION (Always Displayed) */}
//               <div style={{ marginBottom: "16px" }}>
//                 <Typography variant="subtitle1">
//                   {questions[0].question}
//                 </Typography>

//                 {questions[0].type === "boolean" ? (
//                   <FormControl component="fieldset">
//                     <RadioGroup
//                       row
//                       value={firstQuestionAnswer || ""}
//                       onChange={(e) =>
//                         handleFirstQuestionChange(e.target.value)
//                       }
//                     >
//                       <FormControlLabel
//                         value="Yes"
//                         control={<Radio />}
//                         label="Yes"
//                       />
//                       <FormControlLabel
//                         value="No"
//                         control={<Radio />}
//                         label="No"
//                       />
//                     </RadioGroup>
//                   </FormControl>
//                 ) : (
//                   <TextField
//                     type={questions[0].type === "number" ? "number" : "text"}
//                     variant="outlined"
//                     fullWidth
//                     value={firstQuestionAnswer || ""}
//                     onChange={(e) => handleFirstQuestionChange(e.target.value)}
//                   />
//                 )}
//               </div>
//             </>
//           )}

//           {/* ✅ CONDITIONAL DISPLAY FOR SPECIFIC SUBCATEGORIES */}
//           {(!conditionalCategories.includes(subcategory) || // Always show for other subcategories
//             (firstQuestionAnswer &&
//               (questions[0].type !== "boolean" ||
//                 firstQuestionAnswer === "Yes"))) && ( // Show if answered & valid for boolean
//             <>
//               {isMultiEntry ? (
//                 <>

// {(() => {
//   let shouldRenderNext = true;

//   return questions.slice(1).map((q, index) => {
//     const fieldId = `${subcategory.replace(/\s+/g, "")}_Q${index + 2}`;
//     const prevQuestion = questions[index];
//     const prevFieldId = `${subcategory.replace(/\s+/g, "")}_Q${index + 1}`;
//     const prevAnswer = currentEntry[prevFieldId] || basicEntry[prevFieldId];

//     // If the previous question was boolean and the answer is NOT "Yes", stop rendering further questions
//     if (prevQuestion?.type === "boolean" && prevAnswer !== "Yes") {
//       shouldRenderNext = false;
//     }

//     // If we reached a condition to stop rendering, skip this question
//     if (!shouldRenderNext) return null;

//     return (
//       <div key={fieldId} style={{ marginBottom: "16px" }}>
//         <Typography variant="subtitle1">{q.question}</Typography>

//         {q.type === "boolean" ? (
//           <FormControl component="fieldset">
//             <RadioGroup
//               row
//               value={currentEntry[fieldId] || ""}
//               onChange={(e) => handleFieldChange(fieldId, e.target.value)}
//             >
//               <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
//               <FormControlLabel value="No" control={<Radio />} label="No" />
//             </RadioGroup>
//           </FormControl>
//         ) : q.type === "dropdown" ? (
//           <TextField
//             select
//             fullWidth
//             variant="outlined"
//             value={currentEntry[fieldId] || ""}
//             onChange={(e) => handleFieldChange(fieldId, e.target.value)}
//           >
//             {q.options.map((option, idx) => (
//               <MenuItem key={idx} value={option}>
//                 {option}
//               </MenuItem>
//             ))}
//           </TextField>
//         ) : (
//           <TextField
//             type={q.type === "number" ? "number" : "text"}
//             variant="outlined"
//             fullWidth
//             value={currentEntry[fieldId] || ""}
//             onChange={(e) => handleFieldChange(fieldId, e.target.value)}
//           />
//         )}
//       </div>
//     );
//   });
// })()}

//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleAddEntry}
//                     style={{ marginTop: "10px" }}
//                   >
//                     Add
//                   </Button>

//                   {/* Display Table */}
//                   {entries.length > 0 && (
//                     <TableContainer
//                       component={Paper}
//                       style={{ marginTop: "20px" }}
//                     >
//                       <Table>
//                         <TableHead>
//                           <TableRow>
//                             {questions.slice(1).map((q, index) => (
//                               <TableCell key={index}>{q.question}</TableCell>
//                             ))}
//                           </TableRow>
//                         </TableHead>
//                         <TableBody>
//                           {entries.map((entry, index) => (
//                             <TableRow key={index}>
//                               {questions.slice(1).map((q, qIndex) => {
//                                 const fieldId = `${subcategory.replace(
//                                   /\s+/g,
//                                   ""
//                                 )}_Q${qIndex + 2}`;
//                                 return (
//                                   <TableCell key={qIndex}>
//                                     {entry[fieldId]}
//                                   </TableCell>
//                                 );
//                               })}
//                             </TableRow>
//                           ))}
//                         </TableBody>
//                       </Table>
//                     </TableContainer>
//                   )}
//                 </>
//               ) : (
//                 // questions.slice(1).map((q, index) => {
//                 //   const fieldId = `${subcategory.replace(/\s+/g, "")}_Q${
//                 //     index + 2
//                 //   }`;

//                 //   // const fieldId = `${sectionName.replace(/\s+/g, "")}_${subcategory.replace(/\s+/g, "")}_Q${index+2 }`;
//                 //   return (
//                 //     <div key={fieldId} style={{ marginBottom: "16px" }}>
//                 //       <Typography variant="subtitle1">{q.question}</Typography>
//                 //       <TextField
//                 //         type={q.type === "number" ? "number" : "text"}
//                 //         variant="outlined"
//                 //         fullWidth
//                 //         // onChange={(e) => handleInputChange(fieldId, e.target.value)}
//                 //         onChange={(e) =>
//                 //           handleBasicFieldChange(fieldId, e.target.value)
//                 //         }
//                 //       />
//                 //     </div>
//                 //   );

//                 // })
//                 questions.slice(1).map((q, index) => {
//                   const fieldId = `${subcategory.replace(/\s+/g, "")}_Q${index + 2}`;

//                   return (
//                     <div key={fieldId} style={{ marginBottom: "16px" }}>
//                       <Typography variant="subtitle1">{q.question}</Typography>

//                       {q.type === "boolean" ? (
//                         <FormControl component="fieldset">
//                           <RadioGroup
//                             row
//                             onChange={(e) => handleBasicFieldChange(fieldId, e.target.value)}
//                           >
//                             <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
//                             <FormControlLabel value="No" control={<Radio />} label="No" />
//                           </RadioGroup>
//                         </FormControl>
//                       ) : (
//                         <TextField
//                           type={q.type === "number" ? "number" : "text"}
//                           variant="outlined"
//                           fullWidth
//                           onChange={(e) => handleBasicFieldChange(fieldId, e.target.value)}
//                         />
//                       )}
//                     </div>
//                   );
//                 })

//               )}
//             </>
//           )}
//         </AccordionDetails>
//         <MobileCombustionEmissionDialog
//           open={openEmissionDialog}
//           handleClose={() => setOpenEmissionDialog(false)}
//         />

//         <StationaryCombustionEmissionDialog
//           open={openStationaryDialog}
//           handleClose={() => setOpenStationaryDialog(false)}
//         />

//         <IndustrialProcessEmissionDialog
//           open={openIndustrialDialog}
//           handleClose={() => setOpenIndustrialDialog(false)}
//         />
//         <FugitiveEmissionDialog
//           open={openFugitiveDialog}
//           handleClose={() => setOpenFugitiveDialog(false)}
//         />
//         <PurchasedElectricityDialog
//           open={openPurchasedElectricityDialog}
//           handleClose={() => setOpenPurchasedElectricityDialog(false)}
//         />
//         <PurchasedSteamHeatCoolingEmissionDialog
//           open={openPurchasedSteamDialog}
//           handleClose={() => setOpenPurchasedSteamDialog(false)}
//         />
//       </Accordion>
//     </div>
//   );
// };

// export default EnvironmentSec;

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
  MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "../../../api/axios";
import { useSelector } from "react-redux";
import MobileCombustionEmissionDialog from "./MobileCombustionEmissionDialog";
import StationaryCombustionEmissionDialog from "./StationaryCombustionEmissionDialog";
import IndustrialProcessEmissionDialog from "./IndustrialProcessEmissionDialog";
import FugitiveEmissionDialog from "./FugitiveEmissionDialog";
import PurchasedElectricityDialog from "./PurchasedElectricityDialog";
import PurchasedSteamHeatCoolingEmissionDialog from "./PurchasedSteamHeatCoolingEmissionDialog";
import PurchasedGoodsServicesDialog from "./PurchasedGoodsServicesDialog";
import UseSoldProductEmissionDialog from "./UseSoldProductEmissionDialog";
import EndOfLifeTreatmentDialog from "./EndOfLifeTreatmentDialog";
import UserCustomEmissionFactorDialog from "./CustomMobileCombustionEmissionFactorDialog";

const EnvironmentSec = ({
  sectionName,
  subcategory,
  questions,
  handleInputChange,
  resetTrigger
}) => {
  const userId = useSelector((state) => state.auth.user?.id);

  const conditionalCategories = [
    "Mobile Combustion",
    "Stationary Combustion",
    "Industrial Processes",
    "Fugitive Emissions",
  ];

  const isMultiEntry = [
    "Purchased Goods Services",
    "Use of Sold Products",
    "End-of-Life Treatment of Sold Products",
    "Mobile Combustion",
    "Stationary Combustion",
    "Industrial Processes",
    "Fugitive Emissions",
  ].includes(subcategory);

  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState({});
  const [basicEntry, setBasicEntry] = useState({});
  const [openEmissionDialog, setOpenEmissionDialog] = useState(false);
  const [openStationaryDialog, setOpenStationaryDialog] = useState(false);
  const [openIndustrialDialog, setOpenIndustrialDialog] = useState(false);
  const [openFugitiveDialog, setOpenFugitiveDialog] = useState(false);
  const [openPurchasedElectricityDialog, setOpenPurchasedElectricityDialog] =
    useState(false);
  const [openPurchasedSteamDialog, setOpenPurchasedSteamDialog] =
    useState(false);
  const [
    openPurchasedGoodsServicesDialog,
    setOpenPurchasedGoodsServicesDialog,
  ] = useState(false);
  const [openUseofSoldProductsDialog, setOpenUseofSoldProductsDialog] =
    useState(false);
  const [openEndofLifeTreatmentDialog, setOpenEndofLifeTreatmentDialog] =
    useState(false);
  const [openCustomFactorDialog, setOpenCustomFactorDialog] = useState(false);
  const [vehicleTypeOptions, setVehicleTypeOptions] = useState([
    "Passenger Cars", "Heavy Trucks", "Buses", "Motorcycles", "other"
  ]);

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

  const handleFieldChange = (id, value) => {
    setCurrentEntry((prev) => ({ ...prev, [id]: value }));
  };

  const handleBasicFieldChange = (id, value) => {
    setBasicEntry((prev) => {
      const updatedEntry = { ...prev, [id]: value };
      const arrayEntries = [{ ...updatedEntry }];
      handleInputChange(
        `${sectionName.replace(/\s+/g, "")}_${subcategory.replace(/\s+/g, "")}`,
        arrayEntries
      );
      return updatedEntry;
    });
  };

  const handleAddEntry = () => {
    if (
      Object.keys(currentEntry).length > 0 ||
      Object.keys(basicEntry).length > 0
    ) {
      const updatedEntry = { ...basicEntry, ...currentEntry };
      const updatedEntries = [...entries, updatedEntry];
      setEntries(updatedEntries);
      handleInputChange(
        `${sectionName.replace(/\s+/g, "")}_${subcategory.replace(/\s+/g, "")}`,
        updatedEntries
      );
      setCurrentEntry({});
      setBasicEntry({});
    }
  };

  
  useEffect(() => {
    const fetchVehicleTypes = async () => {
      try {
        const res = await axios.get("/api/mobile-combustion/get");
        const records = res.data.records || [];
        const types = [...new Set(records.map(r => r.vehicleType).filter(Boolean))];
        setVehicleTypeOptions([...types, "other"]);
      } catch (error) {
        console.error("Error fetching vehicle types:", error);
      }
    };
  
    fetchVehicleTypes();
  }, [openCustomFactorDialog]);

  useEffect(() => {
    setEntries([]);
    setCurrentEntry({});
    setBasicEntry({});
  }, [resetTrigger]);
  
  return (
    <div style={{ marginBottom: "10px" }}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Typography>{subcategory}</Typography>
            {subcategory === "Mobile Combustion" && (
              <Button
                variant="outlined"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenEmissionDialog(true);
                }}
              >
                Emission Details
              </Button>
            )}
            {subcategory === "Stationary Combustion" && (
              <Button
                variant="outlined"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenStationaryDialog(true);
                }}
              >
                Emission Details
              </Button>
            )}
            {subcategory === "Industrial Processes" && (
              <Button
                variant="outlined"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndustrialDialog(true);
                }}
              >
                Emission Details
              </Button>
            )}
            {subcategory === "Fugitive Emissions" && (
              <Button
                variant="outlined"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenFugitiveDialog(true);
                }}
              >
                Emission Details
              </Button>
            )}
            {subcategory === "Purchased Electricity" && (
              <Button
                variant="outlined"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenPurchasedElectricityDialog(true);
                }}
              >
                Emission Details
              </Button>
            )}
            {subcategory === "Purchased Steam, Heat, or Cooling" && (
              <Button
                variant="outlined"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenPurchasedSteamDialog(true);
                }}
              >
                Emission Details
              </Button>
            )}
            {subcategory === "Purchased Goods Services" && (
              <Button
                variant="outlined"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenPurchasedGoodsServicesDialog(true);
                }}
              >
                Emission Details
              </Button>
            )}
            {subcategory === "Use of Sold Products" && (
              <Button
                variant="outlined"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenUseofSoldProductsDialog(true);
                }}
              >
                Emission Details
              </Button>
            )}
            {subcategory === "End-of-Life Treatment of Sold Products" && (
              <Button
                variant="outlined"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenEndofLifeTreatmentDialog(true);
                }}
              >
                Emission Details
              </Button>
            )}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          {questions.length > 0 && (
            <>
              {(() => {
                let shouldRenderNext = true;
                return questions.map((q, index) => {
                  const fieldId = `${subcategory.replace(/\s+/g, "")}_Q${
                    index + 1
                  }`;
                  const prevQuestion = questions[index - 1];
                  const prevFieldId = `${subcategory.replace(
                    /\s+/g,
                    ""
                  )}_Q${index}`;
                  const prevAnswer =
                    currentEntry[prevFieldId] || basicEntry[prevFieldId];

                  if (
                    index > 0 &&
                    prevQuestion?.type === "boolean" &&
                    prevAnswer !== "Yes"
                  ) {
                    shouldRenderNext = false;
                  }
                  if (!shouldRenderNext) return null;

                  const isMulti = isMultiEntry;
                  const optionsToRender = (q.question === "Type of vehicle?" && subcategory === "Mobile Combustion")
                  ? vehicleTypeOptions
                  : q.options;
                

                  return (
                    
                    <div key={fieldId} style={{ marginBottom: "16px" }}>
                      <Typography variant="subtitle1">{q.question}</Typography>
                      {q.type === "boolean" ? (
                        <FormControl component="fieldset">
                          <RadioGroup
                            row
                            value={
                              isMulti
                                ? currentEntry[fieldId] || ""
                                : basicEntry[fieldId] || ""
                            }
                            onChange={(e) =>
                              isMulti
                                ? handleFieldChange(fieldId, e.target.value)
                                : handleBasicFieldChange(
                                    fieldId,
                                    e.target.value
                                  )
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
                      ) : q.type === "dropdown" ? (
                        <div>
                          <TextField
  select
  fullWidth
  variant="outlined"
  value={isMulti ? currentEntry[fieldId] || "" : basicEntry[fieldId] || ""}
  onChange={(e) =>
    isMulti
      ? handleFieldChange(fieldId, e.target.value)
      : handleBasicFieldChange(fieldId, e.target.value)
  }
>
  {optionsToRender.map((option, idx) => (
    <MenuItem key={idx} value={option}>
      {option}
    </MenuItem>
  ))}
                            {/* {q.options.map((option, idx) => (
                            <MenuItem key={idx} value={option}>
                              {option}
                            </MenuItem>
                          ))} */}
                           
                          </TextField>
                          {q.question === "Type of vehicle?" &&
  (isMulti ? currentEntry[fieldId] : basicEntry[fieldId]) === "other" && (
    <div style={{ marginTop: "10px" }}>
      <Button
        variant="outlined"
        size="small"
        color="primary"
        onClick={() => setOpenCustomFactorDialog(true)}
      >
        Add Other Vehicle Details
      </Button>
    </div>
)}

                        </div>
                      ) : q.type === "array" ? (
                        <div>
                          {(
                            (isMulti
                              ? currentEntry[fieldId]
                              : basicEntry[fieldId]) || []
                          ).map((methodEntry, methodIndex) => (
                            <div
                              key={methodIndex}
                              style={{
                                marginBottom: "16px",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                              }}
                            >
                              {q.fields.map((field, fIdx) => {
                                const nestedFieldId = `${fieldId}_method_${methodIndex}_F${
                                  fIdx + 1
                                }`;
                                return (
                                  <div
                                    key={nestedFieldId}
                                    style={{ marginBottom: "12px" }}
                                  >
                                    <Typography variant="subtitle2">
                                      {field.question}
                                    </Typography>
                                    {field.type === "dropdown" ? (
                                      <TextField
                                        select
                                        fullWidth
                                        variant="outlined"
                                        value={methodEntry[nestedFieldId] || ""}
                                        onChange={(e) => {
                                          const updatedArray = [
                                            ...((isMulti
                                              ? currentEntry[fieldId]
                                              : basicEntry[fieldId]) || []),
                                          ];
                                          updatedArray[methodIndex] = {
                                            ...updatedArray[methodIndex],
                                            [nestedFieldId]: e.target.value,
                                          };
                                          if (isMulti)
                                            handleFieldChange(
                                              fieldId,
                                              updatedArray
                                            );
                                          else
                                            handleBasicFieldChange(
                                              fieldId,
                                              updatedArray
                                            );
                                        }}
                                      >
                                        {field.options.map((option, idx) => (
                                          <MenuItem key={idx} value={option}>
                                            {option}
                                          </MenuItem>
                                        ))}
                                      </TextField>
                                    ) : (
                                      <TextField
                                        fullWidth
                                        variant="outlined"
                                        type={
                                          field.type === "number"
                                            ? "number"
                                            : "text"
                                        }
                                        value={methodEntry[nestedFieldId] || ""}
                                        onChange={(e) => {
                                          const updatedArray = [
                                            ...((isMulti
                                              ? currentEntry[fieldId]
                                              : basicEntry[fieldId]) || []),
                                          ];
                                          updatedArray[methodIndex] = {
                                            ...updatedArray[methodIndex],
                                            [nestedFieldId]: e.target.value,
                                          };
                                          if (isMulti)
                                            handleFieldChange(
                                              fieldId,
                                              updatedArray
                                            );
                                          else
                                            handleBasicFieldChange(
                                              fieldId,
                                              updatedArray
                                            );
                                        }}
                                      />
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          ))}
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => {
                              const updatedArray = [
                                ...((isMulti
                                  ? currentEntry[fieldId]
                                  : basicEntry[fieldId]) || []),
                                {},
                              ];
                              if (isMulti)
                                handleFieldChange(fieldId, updatedArray);
                              else
                                handleBasicFieldChange(fieldId, updatedArray);
                            }}
                          >
                            Add Treatment Method
                          </Button>
                        </div>
                      ) : (
                        <TextField
                          type={q.type === "number" ? "number" : "text"}
                          variant="outlined"
                          fullWidth
                          value={
                            isMulti
                              ? currentEntry[fieldId] || ""
                              : basicEntry[fieldId] || ""
                          }
                          onChange={(e) =>
                            isMulti
                              ? handleFieldChange(fieldId, e.target.value)
                              : handleBasicFieldChange(fieldId, e.target.value)
                          }
                        />
                      )}
                    </div>
                  );
                });
              })()}
              {isMultiEntry && (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddEntry}
                    style={{ marginTop: "10px" }}
                  >
                    Add
                  </Button>
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
                        {/* <TableBody>
                          {entries.map((entry, index) => (
                            <TableRow key={index}>
                              {questions.map((q, qIndex) => {
                                const fieldId = `${subcategory.replace(/\s+/g, "")}_Q${qIndex + 1}`;
                                return <TableCell key={qIndex}>{entry[fieldId]}</TableCell>;
                              })}
                            </TableRow>
                          ))}
                        </TableBody> */}
                        <TableBody>
                          {entries.map((entry, index) => (
                            <TableRow key={index}>
                              {questions.map((q, qIndex) => {
                                const fieldId = `${subcategory.replace(
                                  /\s+/g,
                                  ""
                                )}_Q${qIndex + 1}`;
                                const value = entry[fieldId];

                                let displayValue = "";

                                // Handle array of objects (e.g., Treatment Methods & Percentages)
                                if (Array.isArray(value)) {
                                  // Try to detect treatment method & percentage fields
                                  const lines = value.map((item) => {
                                    const method = Object.entries(item).find(
                                      ([key]) => key.includes("_F1")
                                    );
                                    const percentage = Object.entries(
                                      item
                                    ).find(([key]) => key.includes("_F2"));
                                    return method && percentage
                                      ? `${method[1]}: ${percentage[1]}`
                                      : JSON.stringify(item);
                                  });
                                  displayValue = lines.join("\n");
                                } else if (
                                  typeof value === "object" &&
                                  value !== null
                                ) {
                                  displayValue = Object.entries(value)
                                    .map(([k, v]) => `${k}: ${v}`)
                                    .join(", ");
                                } else {
                                  displayValue = value;
                                }

                                return (
                                  <TableCell
                                    key={qIndex}
                                    style={{ whiteSpace: "pre-line" }}
                                  >
                                    {displayValue}
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
              )}
            </>
          )}
        </AccordionDetails>
        <MobileCombustionEmissionDialog
          open={openEmissionDialog}
          handleClose={() => setOpenEmissionDialog(false)}
          userId={userId}
        />
        <StationaryCombustionEmissionDialog
          open={openStationaryDialog}
          handleClose={() => setOpenStationaryDialog(false)}
          userId={userId}
        />
        <IndustrialProcessEmissionDialog
          open={openIndustrialDialog}
          handleClose={() => setOpenIndustrialDialog(false)}
          userId={userId}

        />
        <FugitiveEmissionDialog
          open={openFugitiveDialog}
          handleClose={() => setOpenFugitiveDialog(false)}
          userId={userId}

        />
        <PurchasedElectricityDialog
          open={openPurchasedElectricityDialog}
          handleClose={() => setOpenPurchasedElectricityDialog(false)}
          userId={userId}

        />
        <PurchasedSteamHeatCoolingEmissionDialog
          open={openPurchasedSteamDialog}
          handleClose={() => setOpenPurchasedSteamDialog(false)}
          userId={userId}

        />
        <PurchasedGoodsServicesDialog
          open={openPurchasedGoodsServicesDialog}
          handleClose={() => setOpenPurchasedGoodsServicesDialog(false)}
          userId={userId}

        />
        <UseSoldProductEmissionDialog
          open={openUseofSoldProductsDialog}
          handleClose={() => setOpenUseofSoldProductsDialog(false)}
          userId={userId}

        />
        <EndOfLifeTreatmentDialog
          open={openEndofLifeTreatmentDialog}
          handleClose={() => setOpenEndofLifeTreatmentDialog(false)}
          userId={userId}

        />
        <UserCustomEmissionFactorDialog
          open={openCustomFactorDialog}
          handleClose={() => setOpenCustomFactorDialog(false)}
          userId={userId}

        />
      </Accordion>
    </div>
  );
};

export default EnvironmentSec;
