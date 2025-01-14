// import React, { useEffect, useState } from "react";
// import {
//   Grid,
//   Paper,
//   Typography,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   MenuItem,
//   CircularProgress,
//   Box,
// } from "@mui/material";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// import { useDispatch, useSelector } from "react-redux";
// import { fetchFlowchart } from "../../../redux/features/flowchart/flowchartSlice";
// import axios from "../../../api/axios";

// const NodeListPage = () => {
//   const dispatch = useDispatch();
//   const userId = useSelector((state) => state.auth.user?.id);
//   const { nodes, isLoading, error } = useSelector((state) => state.flowchart);

//   const [selectedNode, setSelectedNode] = useState(null);
//   const [selectedScope, setSelectedScope] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
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
//   });
//   const [submitLoading, setSubmitLoading] = useState(false);
//   const [formError, setFormError] = useState("");

//   useEffect(() => {
//     if (userId) {
//       dispatch(fetchFlowchart(userId));
//     }
//   }, [dispatch, userId]);

//   const handleNodeClick = (node) => {
//     console.log("Node clicked:", node);
//     setSelectedNode(node);
//     setSelectedScope(null); // Reset selected scope when a new node is selected
//     setFormError(""); // Clear any errors
//   };

//   const handleScopeClick = (scope,e) => {
//     e.stopPropagation();  
//     if (!scope) {
//       console.error("No scope provided to handleScopeClick");
//       return;
//     }
//     console.log("Scope clicked:", scope);
//     setSelectedScope(scope);
//     setFormError(""); // Clear any errors
//     openEmissionDialog();
//   };

//   const openEmissionDialog = () => {
//     setOpenDialog(true);
//   };


//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedScope(null); 
//     setFormData({
//       periodOfDate: "monthly",
//       startDate: "",
//       consumedData: "",
//       assessmentType: "AR6",
//       uncertaintyLevelConsumedData: "",
//       uncertaintyLevelEmissionFactor: "",
//       comments: "",
//       fuelSupplier: "",
//       document: null,
//     });
//     setFormError("");
//   };

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleFileChange = (e) => {
//     setFormData((prev) => ({ ...prev, document: e.target.files[0] }));
//   };

//   const handleSubmit = async () => {
//     console.log("Submit clicked");
//     console.log("Selected Node:", selectedNode);
//     console.log("Selected Scope:", selectedScope);

//     if (!formData.startDate || !formData.consumedData) {
//       setFormError("Please fill in all required fields.");
//       console.log("Form validation failed: Missing required fields.");
//       return;
//     }

//     if (!selectedScope) {
//       setFormError("Please select a scope before submitting.");
//       console.log("Form validation failed: Scope not selected.");
//       return;
//     }

//     setSubmitLoading(true);
//     try {
//       const userId = selectedNode.id;

//       // Map the selected scope to calculationData
//       const calculationData = {
//         scopeDetails: selectedScope.scopeType,
//         combustionType: selectedScope.category,
//         standards: selectedScope.emissionFactor,
//         activity: selectedScope.activity,
//         fuel: selectedScope.fuel,
//         unit: selectedScope.units,
//         source: selectedScope.source,
//         reference: selectedScope.reference,
//         userId,
//       };

//       console.log("Sending calculation data:", calculationData);

//       // Send calculation data to the backend
//       await axios.post("/api/calculation-data", calculationData);

//       // Prepare emission data to send
//       const formDataToSend = new FormData();
//       Object.entries(formData).forEach(([key, value]) => {
//         if (value) {
//           formDataToSend.append(key, value);
//         }
//       });
//       formDataToSend.append("userId", userId);

//       console.log("Sending emission data:", formDataToSend);

//       // Send emission data to the backend
//       const response = await axios.post("/api/calculate-emission", formDataToSend, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       console.log("Emission calculated:", response.data);
//       handleCloseDialog();
//     } catch (err) {
//       console.error("Error calculating emissions:", err);
//       setFormError(err.response?.data?.message || "An error occurred.");
//     } finally {
//       setSubmitLoading(false);
//     }
//   };


//   useEffect(() => {
//     console.log("Selected Scope Updated:", selectedScope);
//   }, [selectedScope]);
//   return (
//     <div style={{ padding: "20px" }}>
//       <Typography variant="h6" gutterBottom>
//         Sites and Emission Calculation
//       </Typography>

//       {isLoading && <CircularProgress />}
//       {error && <Typography color="error">{error}</Typography>}
//       {formError && <Typography color="error">{formError}</Typography>}

      
//       {!isLoading && !error && nodes.length > 0 && (
//         <Grid container spacing={2}>
//           {nodes.map((node) => (
//             <Grid item xs={12} md={6} lg={4} key={node.id}>
//               <Paper
//                 elevation={3}
//                 sx={{ padding: 2, cursor: "pointer" }}
//                 onClick={() => handleNodeClick(node)}
//               >
//                 <Typography variant="h6">{node.data.label}</Typography>
//                 {selectedNode?.id === node.id && (
//                   <Box sx={{ marginTop: 2 }}>
//                     {node.data.details.scopeDetails.map((scope, index) => (
//                       <Button
//                         key={index}
//                         variant="contained"
//                         color="primary"
//                         onClick={(e) => handleScopeClick(scope,e)} 
//                         sx={{ marginBottom: 1, marginRight: 1 }}
//                       >
//                         {`Scope ${index + 1}`}
//                       </Button>
//                     ))}
//                   </Box>
//                 )}
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>
//       )}

//       <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
//         <DialogTitle>Calculate Emission for {selectedNode?.data.label}</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Period of Date"
//             select
//             value={formData.periodOfDate}
//             onChange={(e) => handleInputChange("periodOfDate", e.target.value)}
//             fullWidth
//             margin="normal"
//           >
//             <MenuItem value="weekly">Weekly</MenuItem>
//             <MenuItem value="monthly">Monthly</MenuItem>
//             <MenuItem value="3-months">3 Months</MenuItem>
//             <MenuItem value="yearly">Yearly</MenuItem>
//           </TextField>
//           <TextField
//             label="Start Date"
//             type="date"
//             fullWidth
//             value={formData.startDate}
//             onChange={(e) => handleInputChange("startDate", e.target.value)}
//             InputLabelProps={{ shrink: true }}
//             margin="normal"
//           />
//           <TextField
//             label="Consumed Data"
//             type="number"
//             fullWidth
//             value={formData.consumedData}
//             onChange={(e) => handleInputChange("consumedData", e.target.value)}
//             margin="normal"
//           />
//           <TextField
//             label="Assessment Type"
//             select
//             value={formData.assessmentType}
//             onChange={(e) => handleInputChange("assessmentType", e.target.value)}
//             fullWidth
//             margin="normal"
//           >
//             <MenuItem value="AR6">AR6</MenuItem>
//             <MenuItem value="AR5">AR5</MenuItem>
//           </TextField>
//           <TextField
//             label="Uncertainty Level (Consumed Data) (%)"
//             type="number"
//             fullWidth
//             value={formData.uncertaintyLevelConsumedData}
//             onChange={(e) => handleInputChange("uncertaintyLevelConsumedData", e.target.value)}
//             margin="normal"
//           />
//           <TextField
//             label="Uncertainty Level (Emission Factor) (%)"
//             type="number"
//             fullWidth
//             value={formData.uncertaintyLevelEmissionFactor}
//             onChange={(e) => handleInputChange("uncertaintyLevelEmissionFactor", e.target.value)}
//             margin="normal"
//           />
//           <TextField
//             label="Comments"
//             multiline
//             rows={3}
//             fullWidth
//             value={formData.comments}
//             onChange={(e) => handleInputChange("comments", e.target.value)}
//             margin="normal"
//           />
//           <TextField
//             label="Fuel Supplier"
//             fullWidth
//             value={formData.fuelSupplier}
//             onChange={(e) => handleInputChange("fuelSupplier", e.target.value)}
//             margin="normal"
//           />
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginTop: 2 }}>
//             <Button variant="contained" component="label">
//               Upload Document
//               <input type="file" hidden onChange={handleFileChange} />
//             </Button>
//             {formData.document && (
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                 <span>{formData.document.name}</span>
//                 <Button
//                   onClick={() => handleInputChange("document", null)}
//                   color="error"
//                   size="small"
//                 >
//                   Remove
//                 </Button>
//               </Box>
//             )}
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} color="primary" variant="contained" disabled={submitLoading}>
//             {submitLoading ? <CircularProgress size={24} /> : "Submit"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default NodeListPage;


// import React, { useEffect, useState } from "react";
// import { Grid, CircularProgress, Typography } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchFlowchart } from "../../../redux/features/flowchart/flowchartSlice";
// import NodeCard from "./NodeCard";
// import EmissionDialog from "./EmissionDialog";

// const NodeListPage = () => {
//   const dispatch = useDispatch();
//   const userId = useSelector((state) => state.auth.user?.id);
//   const { nodes, isLoading, error } = useSelector((state) => state.flowchart);

//   const [selectedNode, setSelectedNode] = useState(null);
//   const [selectedScope, setSelectedScope] = useState(null);
//   const [openEmissionDialog, setOpenEmissionDialog] = useState(false);

//   useEffect(() => {
//     if (userId) {
//       dispatch(fetchFlowchart(userId));
//     }
//   }, [dispatch, userId]);

//   const handleScopeSelect = (node, scope) => {
//     setSelectedNode(node);
//     setSelectedScope(scope);
//     setOpenEmissionDialog(true);
//   };

//   const handleCloseEmissionDialog = () => setOpenEmissionDialog(false);

//   return (
//     <div style={{ padding: "20px" }}>
//       <Typography variant="h6" gutterBottom>
//         Sites and Emission Calculation
//       </Typography>

//       {isLoading && <CircularProgress />}
//       {error && <Typography color="error">{error}</Typography>}

//       {!isLoading && !error && nodes.length > 0 && (
//         <Grid container spacing={2}>
//           {nodes.map((node) => (
//             <Grid item xs={12} md={6} lg={4} key={node.id}>
//               <NodeCard
//                 node={node}
//                 onScopeSelect={(scope) => handleScopeSelect(node, scope)}
//               />
//             </Grid>
//           ))}
//         </Grid>
//       )}

//       {/* Emission Calculation Dialog */}
//       <EmissionDialog
//         open={openEmissionDialog}
//         onClose={handleCloseEmissionDialog}
//         node={selectedNode}
//         scope={selectedScope}
//       />
//     </div>
//   );
// };

// export default NodeListPage;


import React, { useEffect, useState } from "react";
import { Grid, CircularProgress, Typography } from "@mui/material";
import axios from "../../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlowchart } from "../../../redux/features/flowchart/flowchartSlice";
import NodeCard from "./NodeCard";
import EmissionDialog from "./EmissionDialog";
import EmissionDataTable from "./EmissionDataTable";

const NodeListPage = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?.id);
  const { nodes, isLoading, error } = useSelector((state) => state.flowchart);

  const [emissionData, setEmissionData] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedScope, setSelectedScope] = useState(null);
  const [openEmissionDialog, setOpenEmissionDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("submit");
  const [editingData, setEditingData] = useState(null);

  useEffect(() => {
    const fetchEmissionData = async () => {
      try {
        const response = await axios.get(`/api/calculate-emission/${userId}`);
        setEmissionData(response.data.data);
      } catch (err) {
        console.error("Error fetching emission data:", err);
      }
    };

    if (userId) {
      dispatch(fetchFlowchart(userId));
      fetchEmissionData();
    }
  }, [dispatch, userId]);

  // Map Site Name (label) from nodes to emissionData
  const mappedEmissionData = emissionData.map((item) => {
    const matchingNode = nodes.find((node) => node.id === item.siteId); // Match siteId with node id
    return {
      ...item,
      siteName: matchingNode?.data.label || "Unknown", // Add siteName from node's label
      scopeType:matchingNode?.data.details?.scopeDetails?.[0].scopeType
    };
  });

  const handleEdit = async (data) => {
    setEditingData(data);
    setDialogMode("edit");
    setOpenEmissionDialog(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/calculate-emission/${userId}`, {
        data: { startDate: id.startDate, endDate: id.endDate },
      });
      console.log(response.data.message);
      setEmissionData((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting emission data:", err);
    }
  };

  const handleCloseEmissionDialog = () => {
    setOpenEmissionDialog(false);
    setEditingData(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h6" gutterBottom>
        Sites and Emission Calculation
      </Typography>

      {isLoading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      {!isLoading && !error && nodes.length > 0 && (
        <Grid container spacing={2}>
          {nodes.map((node) => (
            <Grid item xs={12} md={6} lg={4} key={node.id}>
              <NodeCard
                node={node}
                onScopeSelect={(scope) => {
                  setSelectedNode(node);
                  setSelectedScope(scope);
                  setDialogMode("submit");
                  setOpenEmissionDialog(true);
                }}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <Typography variant="h6" style={{ marginTop: "20px" }}>
        Emission Data Table
      </Typography>
      <EmissionDataTable
        data={mappedEmissionData} // Pass mapped data with siteName
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <EmissionDialog
        open={openEmissionDialog}
        onClose={handleCloseEmissionDialog}
        node={selectedNode}
        scope={selectedScope}
        mode={dialogMode} // "submit" or "edit"
        editingData={editingData} // Pass data when in "edit" mode
      />
    </div>
  );
};

export default NodeListPage;
