// import React, { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import CustomAlert from "../../components/Alert/Sweetalert";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Container,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   MenuItem,
// } from "@mui/material";

// const emissionSources = ["Diesel Generator", "Diesel Fire Pump"];
// const ghgActivities = ["Diesel Generator", "Diesel Fuel Pump"];

// function StationaryCombustionDetailed() {
//   const [records, setRecords] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [selectedRecordId, setSelectedRecordId] = useState(null);
//   const [alert, setAlert] = useState(null);
//   const [formData, setFormData] = useState({
//     ghgScope: "Scope 1",
//     ghgCategory: "Stationary Combustion",
//     sourceOfEmission: "",
//     ghgActivity: "Diesel consumption",
//     unit: "L",
//     co2eFactor: "2.6615",
//   });

//   const fetchData = async () => {
//     try {
//       const res = await axios.get("/api/stationary-combustion/get");
//       setRecords(res.data.records);
//       console.log("response stationary:", res.data.records);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleOpenDialog = (record = null) => {
//     if (record) {
//       setEditMode(true);
//       setSelectedRecordId(record._id);
//       setFormData({
//         ghgScope: record.ghgScope || "Scope 1",
//         ghgCategory: record.ghgCategory || "Stationary Combustion",
//         sourceOfEmission: record.sourceOfEmission || "",
//         ghgActivity: record.ghgActivity || "Diesel consumption",
//         unit: record.unit || "L",
//         co2eFactor: record.co2eFactor || "2.6615",
//       });
//     } else {
//       setEditMode(false);
//       setSelectedRecordId(null);
//       setFormData({
//         ghgScope: "Scope 1",
//         ghgCategory: "Stationary Combustion",
//         sourceOfEmission: "",
//         ghgActivity: "Diesel consumption",
//         unit: "L",
//         co2eFactor: "2.6615",
//       });
//     }
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = async () => {
//     try {
//       if (editMode) {
//         await axios.put(
//           `/api/stationary-combustion/update/${selectedRecordId}`,
//           formData
//         );
//         setAlert({
//           type: "success",
//           title: "Updated",
//           text: "Record updated successfully!",
//         });
//       } else {
//         await axios.post("/api/stationary-combustion/add", formData);
//         setAlert({
//           type: "success",
//           title: "Added",
//           text: "New record added successfully!",
//         });
//       }
//       fetchData();
//       handleCloseDialog();
//     } catch (error) {
//       console.error("Error saving record:", error);
//       setAlert({
//         type: "error",
//         title: "Save Error",
//         text: "Failed to save the record.",
//       });
//     }
//   };

//   const handleDelete = async (id) => {
//     setAlert({
//       type: "warning",
//       title: "Are you sure?",
//       text: "This action cannot be undone.",
//       showCancel: true,
//       confirmButtonText: "Yes, delete it!",
//       onConfirm: async () => {
//         try {
//           await axios.delete(`/api/stationary-combustion/delete/${id}`);
//           setAlert({
//             type: "success",
//             title: "Deleted",
//             text: "Record deleted successfully!",
//           });
//           fetchData();
//         } catch (error) {
//           console.error("Error deleting record:", error);
//           setAlert({
//             type: "error",
//             title: "Delete Error",
//             text: "Failed to delete the record.",
//           });
//         }
//       },
//     });
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <>
//       <CustomAlert alert={alert} setAlert={setAlert} />

//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6">
//             Stationary Combustion Emission Factor
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       <Container sx={{ marginTop: 4 }}>
//         <Button variant="contained" onClick={() => handleOpenDialog(null)}>
//           Add New Record
//         </Button>

//         <TableContainer component={Paper} sx={{ marginTop: 2 }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Source of Emission</TableCell>
//                 <TableCell>GHG Activity</TableCell>
//                 <TableCell>Unit</TableCell>
//                 <TableCell>EF (kg CO2e/unit)</TableCell>
//                 <TableCell align="center">Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {records.length > 0 ? (
//                 records.map((record) => (
//                   <TableRow key={record._id}>
//                     <TableCell>{record.sourceOfEmission}</TableCell>
//                     <TableCell>{record.ghgActivity}</TableCell>
//                     <TableCell>{record.unit}</TableCell>
//                     <TableCell>{record.co2eFactor}</TableCell>
//                     <TableCell align="center">
//                       <Button
//                         variant="outlined"
//                         size="small"
//                         onClick={() => handleOpenDialog(record)}
//                       >
//                         Edit
//                       </Button>
//                       <Button
//                         variant="outlined"
//                         color="error"
//                         size="small"
//                         onClick={() => handleDelete(record._id)}
//                       >
//                         Delete
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={7} align="center">
//                     No records found
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Container>

//       <Dialog
//         open={openDialog}
//         onClose={handleCloseDialog}
//         fullWidth
//         maxWidth="sm"
//       >
//         <DialogTitle>{editMode ? "Edit Record" : "Add New Record"}</DialogTitle>
//         <DialogContent>
//           <TextField
//             select
//             label="Source of Emission"
//             name="sourceOfEmission"
//             fullWidth
//             margin="normal"
//             value={formData.sourceOfEmission}
//             onChange={handleChange}
//           >
//             {emissionSources.map((src) => (
//               <MenuItem key={src} value={src}>
//                 {src}
//               </MenuItem>
//             ))}
//           </TextField>
//           <TextField
//             select
//             label="GHG Activity"
//             name="ghgActivity"
//             fullWidth
//             margin="normal"
//             value={formData.ghgActivity}
//             onChange={handleChange}
//           >
//             {ghgActivities.map((activity) => (
//               <MenuItem key={activity} value={activity}>
//                 {activity}
//               </MenuItem>
//             ))}
//           </TextField>

//           <TextField
//             label="Unit"
//             name="unit"
//             fullWidth
//             margin="normal"
//             value={formData.unit}
//             disabled
//           />
//           <TextField
//             label="EF (kg CO2e/unit)"
//             name="co2eFactor"
//             fullWidth
//             margin="normal"
//             value={formData.co2eFactor}
//             onChange={handleChange}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Cancel</Button>
//           <Button variant="contained" onClick={handleSave}>
//             {editMode ? "Update" : "Save"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }

// export default StationaryCombustionDetailed;


import React, { useEffect, useMemo, useState } from "react";
import axios from "../../api/axios";
import CustomAlert from "../../components/Alert/Sweetalert";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Box,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";

const emissionSources = ["Diesel Generator", "Diesel Fire Pump"];
const ghgActivities = ["Diesel Generator", "Diesel Fuel Pump"];

function StationaryCombustionDetailed() {
  const [records, setRecords] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [alert, setAlert] = useState(null);

  // Region filter
  const [selectedRegion, setSelectedRegion] = useState("ALL");

  const [formData, setFormData] = useState({
    ghgScope: "Scope 1",
    ghgCategory: "Stationary Combustion",
    sourceOfEmission: "",
    ghgActivity: "Diesel consumption",
    unit: "L",
    co2eFactor: "2.6615",
    region: "", // NEW
  });

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/stationary-combustion/get");
      setRecords(res.data.records || []);
      console.log("response stationary:", res.data.records);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ---- Regions list (includes "Global"; ignores blanks) ----
  const regions = useMemo(() => {
    const map = new Map([["global", "Global"]]);
    (records || []).forEach((r) => {
      const raw = (r?.region || "").trim();
      if (!raw) return;
      const key = raw.toLowerCase();
      if (!map.has(key)) map.set(key, raw);
    });
    return Array.from(map.values()).sort((a, b) => a.localeCompare(b));
  }, [records]);

  // ---- Apply region filter (blanks stay blank; not treated as Global) ----
  const filteredRecords = useMemo(() => {
    if (selectedRegion === "ALL") return records;
    const sel = (selectedRegion || "").trim().toLowerCase();
    return (records || []).filter(
      (r) => ((r?.region || "").trim().toLowerCase() === sel)
    );
  }, [records, selectedRegion]);

  const handleOpenDialog = (record = null) => {
    if (record) {
      setEditMode(true);
      setSelectedRecordId(record._id);
      setFormData({
        ghgScope: record.ghgScope || "Scope 1",
        ghgCategory: record.ghgCategory || "Stationary Combustion",
        sourceOfEmission: record.sourceOfEmission || "",
        ghgActivity: record.ghgActivity || "Diesel consumption",
        unit: record.unit || "L",
        co2eFactor: record.co2eFactor || "2.6615",
        region: (record.region || "").trim(), // NEW
      });
    } else {
      setEditMode(false);
      setSelectedRecordId(null);
      setFormData({
        ghgScope: "Scope 1",
        ghgCategory: "Stationary Combustion",
        sourceOfEmission: "",
        ghgActivity: "Diesel consumption",
        unit: "L",
        co2eFactor: "2.6615",
        region: "", // NEW (keep blank by default)
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (editMode) {
        await axios.put(`/api/stationary-combustion/update/${selectedRecordId}`, formData);
        setAlert({ type: "success", title: "Updated", text: "Record updated successfully!" });
      } else {
        await axios.post("/api/stationary-combustion/add", formData);
        setAlert({ type: "success", title: "Added", text: "New record added successfully!" });
      }
      fetchData();
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving record:", error);
      setAlert({ type: "error", title: "Save Error", text: "Failed to save the record." });
    }
  };

  const handleDelete = async (id) => {
    setAlert({
      type: "warning",
      title: "Are you sure?",
      text: "This action cannot be undone.",
      showCancel: true,
      confirmButtonText: "Yes, delete it!",
      onConfirm: async () => {
        try {
          await axios.delete(`/api/stationary-combustion/delete/${id}`);
          setAlert({ type: "success", title: "Deleted", text: "Record deleted successfully!" });
          fetchData();
        } catch (error) {
          console.error("Error deleting record:", error);
          setAlert({ type: "error", title: "Delete Error", text: "Failed to delete the record." });
        }
      },
    });
  };

  return (
    <>
      <CustomAlert alert={alert} setAlert={setAlert} />

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Stationary Combustion Emission Factor</Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 4 }}>
        {/* Top bar: Add button + Region filter */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            mb: 2,
          }}
        >
          <Button variant="contained" onClick={() => handleOpenDialog(null)}>
            Add New Record
          </Button>

          <FormControl size="small" sx={{ minWidth: 220 }}>
            <InputLabel id="region-filter-label">Filter by Region</InputLabel>
            <Select
              labelId="region-filter-label"
              label="Filter by Region"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <MenuItem value="ALL">All Regions</MenuItem>
              {regions.map((r) => (
                <MenuItem key={r} value={r}>
                  {r}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Source of Emission</TableCell>
                <TableCell>GHG Activity</TableCell>
                <TableCell>Region</TableCell> {/* NEW */}
                <TableCell>Unit</TableCell>
                <TableCell>EF (kg CO2e/unit)</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <TableRow key={record._id}>
                    <TableCell>{record.sourceOfEmission}</TableCell>
                    <TableCell>{record.ghgActivity}</TableCell>
                    <TableCell>{(record.region || "").trim()}</TableCell> {/* NEW */}
                    <TableCell>{record.unit}</TableCell>
                    <TableCell>{record.co2eFactor}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleOpenDialog(record)}
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(record._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No records found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{editMode ? "Edit Record" : "Add New Record"}</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Source of Emission"
            name="sourceOfEmission"
            fullWidth
            margin="normal"
            value={formData.sourceOfEmission}
            onChange={handleChange}
          >
            {emissionSources.map((src) => (
              <MenuItem key={src} value={src}>
                {src}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="GHG Activity"
            name="ghgActivity"
            fullWidth
            margin="normal"
            value={formData.ghgActivity}
            onChange={handleChange}
          >
            {ghgActivities.map((activity) => (
              <MenuItem key={activity} value={activity}>
                {activity}
              </MenuItem>
            ))}
          </TextField>

          {/* NEW: Region field */}
          <TextField
            label="Region"
            name="region"
            fullWidth
            margin="normal"
            value={formData.region}
            onChange={handleChange}
            placeholder="e.g., Global, India, UK, Germany"
          />

          <TextField
            label="Unit"
            name="unit"
            fullWidth
            margin="normal"
            value={formData.unit}
            disabled
          />
          <TextField
            label="EF (kg CO2e/unit)"
            name="co2eFactor"
            fullWidth
            margin="normal"
            value={formData.co2eFactor}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {editMode ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default StationaryCombustionDetailed;
