// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   CircularProgress,
//   Box,
// } from "@mui/material";
// import axios from "../../../api/axios";
// import { useSelector } from "react-redux";

// const EmissionDialog = ({ open, onClose, node, scope }) => {
//     const userId=useSelector((state)=>state.auth.user?.id)
//   const [formData, setFormData] = useState({
//     periodOfDate: "monthly",
//     startDate: "",
//     consumedData: "",
//     assessmentType: "AR6",
//     uncertaintyLevelConsumedData: "",
//     uncertaintyLevelEmissionFactor: "",
//     comments: "",
//     fuelSupplier: "",
//     document: null,
//     userId
//   });
//   const [submitLoading, setSubmitLoading] = useState(false);
//   const [formError, setFormError] = useState("");

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleFileChange = (e) => {
//     setFormData((prev) => ({ ...prev, document: e.target.files[0] }));
//   };

//   const handleSubmit = async () => {
//     if (!formData.startDate || !formData.consumedData) {
//       setFormError("Please fill in all required fields.");
//       return;
//     }

//     setSubmitLoading(true);
//     try {
//     //   const siteId = node.id;

//       const calculationData = {
//         scopeDetails: scope.scopeType,
//         combustionType: scope.category,
//         standards: scope.emissionFactor,
//         activity: scope.activity,
//         fuel: scope.fuel,
//         unit: scope.units,
//         source: scope.source,
//         reference: scope.reference,
//         userId,
//       };

//       console.log("Sending calculation data:", calculationData);

//       await axios.post("/api/calculation-data", calculationData);

//       const formDataToSend = new FormData();
//       Object.entries(formData).forEach(([key, value]) => {
//         if (value) {
//           formDataToSend.append(key, value);
//         }
//       });
//     //   formDataToSend.append("siteId", siteId);

//       console.log("Sending emission data:", formDataToSend);

//       const response = await axios.post("/api/calculate-emission", formDataToSend, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       console.log("Emission calculated:", response.data);
//       onClose();
//     } catch (err) {
//       console.error("Error calculating emissions:", err);
//       setFormError(err.response?.data?.message || "An error occurred.");
//     } finally {
//       setSubmitLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
//       <DialogTitle>{`Calculate Emission for ${node?.data.label}`}</DialogTitle>
//       <DialogContent>
//         <TextField
//           label="Period of Date"
//           select
//           value={formData.periodOfDate}
//           onChange={(e) => handleInputChange("periodOfDate", e.target.value)}
//           fullWidth
//           margin="normal"
//         >
//           <option value="weekly">Weekly</option>
//           <option value="monthly">Monthly</option>
//           <option value="3-months">3 Months</option>
//           <option value="yearly">Yearly</option>
//         </TextField>
//         <TextField
//           label="Start Date"
//           type="date"
//           fullWidth
//           value={formData.startDate}
//           onChange={(e) => handleInputChange("startDate", e.target.value)}
//           InputLabelProps={{ shrink: true }}
//           margin="normal"
//         />
//         <TextField
//           label="Consumed Data"
//           type="number"
//           fullWidth
//           value={formData.consumedData}
//           onChange={(e) => handleInputChange("consumedData", e.target.value)}
//           margin="normal"
//         />
//         <TextField
//           label="Assessment Type"
//           select
//           value={formData.assessmentType}
//           onChange={(e) => handleInputChange("assessmentType", e.target.value)}
//           fullWidth
//           margin="normal"
//         >
//           <option value="AR6">AR6</option>
//           <option value="AR5">AR5</option>
//         </TextField>
//         <TextField
//           label="Uncertainty Level (Consumed Data) (%)"
//           type="number"
//           fullWidth
//           value={formData.uncertaintyLevelConsumedData}
//           onChange={(e) => handleInputChange("uncertaintyLevelConsumedData", e.target.value)}
//           margin="normal"
//         />
//         <TextField
//           label="Uncertainty Level (Emission Factor) (%)"
//           type="number"
//           fullWidth
//           value={formData.uncertaintyLevelEmissionFactor}
//           onChange={(e) => handleInputChange("uncertaintyLevelEmissionFactor", e.target.value)}
//           margin="normal"
//         />
//         <TextField
//           label="Comments"
//           multiline
//           rows={3}
//           fullWidth
//           value={formData.comments}
//           onChange={(e) => handleInputChange("comments", e.target.value)}
//           margin="normal"
//         />
//         <TextField
//           label="Fuel Supplier"
//           fullWidth
//           value={formData.fuelSupplier}
//           onChange={(e) => handleInputChange("fuelSupplier", e.target.value)}
//           margin="normal"
//         />
//         <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginTop: 2 }}>
//           <Button variant="contained" component="label">
//             Upload Document
//             <input type="file" hidden onChange={handleFileChange} />
//           </Button>
//           {formData.document && <span>{formData.document.name}</span>}
//         </Box>
//         {formError && <p style={{ color: "red" }}>{formError}</p>}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="secondary">
//           Cancel
//         </Button>
//         <Button onClick={handleSubmit} color="primary" disabled={submitLoading}>
//           {submitLoading ? <CircularProgress size={24} /> : "Submit"}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default EmissionDialog;


import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  Box,
  MenuItem,
} from "@mui/material";
import axios from "../../../api/axios";
import { useSelector } from "react-redux";

const EmissionDialog = ({ open, onClose, node, scope, mode, editingData }) => {
  const userId = useSelector((state) => state.auth.user?.id);
  const siteId = node?.id;
console.log("siteId:",siteId);
  // Initial state for form data
  const defaultState = {
    periodOfDate: "monthly",
    startDate: "",
    consumedData: "",
    assessmentType: "AR6",
    uncertaintyLevelConsumedData: "",
    uncertaintyLevelEmissionFactor: "",
    comments: "",
    fuelSupplier: "",
    document: null,
    userId,
    siteId,
  };

  const [formData, setFormData] = useState(defaultState);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (mode === "edit" && editingData) {
      // Populate form fields with editingData for edit mode
      setFormData({
        ...defaultState,
        ...editingData,
        document: null, // Reset document field (file upload doesn't persist)
      });
    } else if (mode === "submit") {
      setFormData(defaultState);
    }
  }, [mode, editingData]); // Only run when mode or editingData changes

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, document: e.target.files[0] }));
  };

  const handleSubmit = async () => {
    if (!formData.startDate || !formData.consumedData) {
      setFormError("Please fill in all required fields.");
      return;
    }
  
    setSubmitLoading(true);
    try {
      if (mode === "submit") {
        // First POST request: Sending calculation data
        const calculationData = {
          scopeDetails: scope?.scopeType,
          combustionType: scope?.category,
          standards: scope?.emissionFactor,
          activity: scope?.activity,
          fuel: scope?.fuel,
          unit: scope?.units,
          source: scope?.source,
          reference: scope?.reference,
          userId,
        };
  
        console.log("Sending calculation data:", calculationData);
        await axios.post("/api/calculation-data", calculationData);
  
        // Second POST request: Sending emission data
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (value) {
            formDataToSend.append(key, value);
          }
        });
  
        console.log("Sending emission data:", formDataToSend);
  
        const response = await axios.post("/api/calculate-emission", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        console.log("Emission calculated:", response.data);
      } else if (mode === "edit") {
        // PUT request for editing
        const endpoint = `/api/calculate-emission/${editingData._id}`;
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (value) {
            formDataToSend.append(key, value);
          }
        });
  
        console.log("Sending edit request to:", endpoint);
        const response = await axios.put(endpoint, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        console.log("Emission data updated:", response.data);
      }
  
      // Close dialog after successful submission
      onClose();
    } catch (err) {
      console.error("Error processing emissions:", err);
      setFormError(err.response?.data?.message || "An error occurred.");
    } finally {
      setSubmitLoading(false);
    }
  };
  

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {mode === "edit"
          ? `Edit Emission Data for ${node?.data.label}`
          : `Calculate Emission for ${node?.data.label}`}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Period of Date"
          select
          value={formData.periodOfDate}
          onChange={(e) => handleInputChange("periodOfDate", e.target.value)}
          fullWidth
          margin="normal"
        >
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="3-months">3 Months</MenuItem>
          <MenuItem value="yearly">Yearly</MenuItem>
        </TextField>
        <TextField
          label="Start Date"
          type="date"
          fullWidth
          value={formData.startDate}
          onChange={(e) => handleInputChange("startDate", e.target.value)}
          InputLabelProps={{ shrink: true }}
          margin="normal"
        />
        <TextField
          label="Consumed Data"
          type="number"
          fullWidth
          value={formData.consumedData}
          onChange={(e) => handleInputChange("consumedData", e.target.value)}
          margin="normal"
        />
        <TextField
          label="Assessment Type"
          select
          value={formData.assessmentType}
          onChange={(e) => handleInputChange("assessmentType", e.target.value)}
          fullWidth
          margin="normal"
        >
          <MenuItem value="AR6">AR6</MenuItem>
          <MenuItem value="AR5">AR5</MenuItem>
        </TextField>
        <TextField
          label="Uncertainty Level (Consumed Data) (%)"
          type="number"
          fullWidth
          value={formData.uncertaintyLevelConsumedData}
          onChange={(e) =>
            handleInputChange("uncertaintyLevelConsumedData", e.target.value)
          }
          margin="normal"
        />
        <TextField
          label="Uncertainty Level (Emission Factor) (%)"
          type="number"
          fullWidth
          value={formData.uncertaintyLevelEmissionFactor}
          onChange={(e) =>
            handleInputChange("uncertaintyLevelEmissionFactor", e.target.value)
          }
          margin="normal"
        />
        <TextField
          label="Comments"
          multiline
          rows={3}
          fullWidth
          value={formData.comments}
          onChange={(e) => handleInputChange("comments", e.target.value)}
          margin="normal"
        />
        <TextField
          label="Fuel Supplier"
          fullWidth
          value={formData.fuelSupplier}
          onChange={(e) => handleInputChange("fuelSupplier", e.target.value)}
          margin="normal"
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginTop: 2 }}>
          <Button variant="contained" component="label">
            Upload Document
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {formData.document && <span>{formData.document.name}</span>}
        </Box>
        {formError && <p style={{ color: "red" }}>{formError}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={submitLoading}>
          {submitLoading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmissionDialog;
