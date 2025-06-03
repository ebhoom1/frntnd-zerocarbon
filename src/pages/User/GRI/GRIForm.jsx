// import React, { useState } from "react";
// import {
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   TextField,
//   Typography,
//   Button,
//   Box,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import griQuestions from "../../../assets/data/DataSubmission/griQuestions.json";
// import axios from "../../../api/axios";
// import { useSelector } from "react-redux";
// import CustomAlert from "../../../components/Alert/Sweetalert";

// const GRIForm = () => {
//   const [responses, setResponses] = useState({});
//   const [alert, setAlert] = useState(null);
//   const userId = useSelector((state) => state.auth.user?.id);

//   const handleChange = (id, value) => {
//     setResponses((prev) => ({
//       ...prev,
//       [id]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     if (!userId) {
//       return setAlert({
//         type: "error",
//         title: "Unauthorized",
//         text: "User ID missing. Please log in again.",
//       });
//     }

//     try {
//       const res = await axios.post("api/gri/save", {
//         userId,
//         responses,
//       });

//       if (res.data.success) {
//         setAlert({
//           type: "success",
//           title: "Success",
//           text: res.data.message || "GRI responses saved successfully",
//         });
//       } else {
//         setAlert({
//           type: "error",
//           title: "Failed",
//           text: res.data.message || "Could not save responses",
//         });
//       }
//     } catch (error) {
//       console.error("Submission error:", error);
//       setAlert({
//         type: "error",
//         title: "Server Error",
//         text: "An error occurred while saving responses.",
//       });
//     }
//   };

//   const renderField = (q) => {
//     const value = responses[q.id] || "";
//     const lowerText = q.text.toLowerCase();

//     if (
//       lowerText.includes("yes or no") ||
//       lowerText.includes("available") ||
//       lowerText.startsWith("does")
//     ) {
//       return (
//         <FormControl fullWidth>
//           <InputLabel>{q.text}</InputLabel>
//           <Select
//             value={value}
//             label={q.text}
//             onChange={(e) => handleChange(q.id, e.target.value)}
//           >
//             <MenuItem value="Yes">Yes</MenuItem>
//             <MenuItem value="No">No</MenuItem>
//           </Select>
//         </FormControl>
//       );
//     }

//     if (
//       lowerText.includes("ratio") ||
//       lowerText.includes("percentage") ||
//       lowerText.includes("intensity") ||
//       lowerText.includes("total") ||
//       lowerText.includes("value") ||
//       lowerText.includes("hours") ||
//       lowerText.includes("number")
//     ) {
//       return (
//         <TextField
//           type="number"
//           fullWidth
//           label={q.text}
//           variant="outlined"
//           value={value}
//           onChange={(e) => handleChange(q.id, e.target.value)}
//         />
//       );
//     }

//     if (lowerText.includes("ownership")) {
//       return (
//         <FormControl fullWidth>
//           <InputLabel>{q.text}</InputLabel>
//           <Select
//             value={value}
//             label={q.text}
//             onChange={(e) => handleChange(q.id, e.target.value)}
//           >
//             <MenuItem value="Private Limited">Private Limited</MenuItem>
//             <MenuItem value="Public Listed">Public Listed</MenuItem>
//             <MenuItem value="Partnership">Partnership</MenuItem>
//             <MenuItem value="Sole Proprietor">Sole Proprietor</MenuItem>
//             <MenuItem value="Other">Other</MenuItem>
//           </Select>
//         </FormControl>
//       );
//     }

//     if (
//       lowerText.includes("location") ||
//       lowerText.includes("market") ||
//       lowerText.includes("regions")
//     ) {
//       return (
//         <TextField
//           fullWidth
//           label={q.text}
//           variant="outlined"
//           placeholder="List countries/regions separated by commas"
//           value={value}
//           onChange={(e) => handleChange(q.id, e.target.value)}
//         />
//       );
//     }

//     return (
//       <TextField
//         fullWidth
//         multiline
//         minRows={3}
//         label={q.text}
//         variant="outlined"
//         value={value}
//         onChange={(e) => handleChange(q.id, e.target.value)}
//       />
//     );
//   };

//   return (
//     <Box p={3}>
//       <Typography variant="h4" gutterBottom>
//         GRI Report - Data Collection
//       </Typography>

//       {griQuestions.map((section, idx) => (
//         <Accordion key={idx} >
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Typography variant="h6">{section.section}</Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             {section.questions.map((q) => (
//               <Box key={q.id} mb={3}>
//                 {renderField(q)}
//               </Box>
//             ))}
//           </AccordionDetails>
//         </Accordion>
//       ))}

//       <Box mt={4}>
//         <Button variant="contained" color="primary" onClick={handleSubmit}>
//           Save GRI Responses
//         </Button>
//       </Box>

//       <CustomAlert alert={alert} setAlert={setAlert} />
//     </Box>
//   );
// };

// export default GRIForm;

import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import axios from "../../../api/axios";

import griDisclosureData from "../../../assets/data/DataSubmission/gri.json";
import CustomAlert from "../../../components/Alert/Sweetalert";

const GRIForm = () => {
  const [responses, setResponses] = useState({});
  const [alert, setAlert] = useState(null);

  const userId = useSelector((state) => state.auth.user?.id);

  const handleInputChange = (section, disclosure, value) => {
    setResponses((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [disclosure]: value,
      },
    }));
  };

  const handleSave = async () => {
    if (!userId) {
      setAlert({
        type: "error",
        title: "Unauthorized",
        text: "User not found. Please log in again.",
      });
      return;
    }

    try {
      const response = await axios.post("/api/griform/save", {
        userId,
        responses,
      });

      console.log("response:", response);
      console.log("responses:", responses);
      setAlert({
        type: "success",
        title: "Success",
        text: "GRI responses saved successfully!",
      });
    } catch (err) {
      console.error(err);
      setAlert({
        type: "error",
        title: "Error",
        text: "Failed to save GRI responses.",
      });
    }
  };


  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5"  gutterBottom>
        GRI Reporting Form
      </Typography>

      {Object.entries(griDisclosureData).map(([standard, disclosures]) => (
        <Accordion key={standard} sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">{standard}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {disclosures.map((disclosure, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  {disclosure}
                </Typography>
                <TextField
                  multiline
                  fullWidth
                  minRows={3}
                  variant="outlined"
                  placeholder="Enter your response"
                  value={responses?.[standard]?.[disclosure] || ""}
                  onChange={(e) =>
                    handleInputChange(standard, disclosure, e.target.value)
                  }
                />
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}

      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save All Responses
        </Button>
      </Box>

      <CustomAlert alert={alert} setAlert={setAlert} />
    </Box>
  );
};

export default GRIForm;
