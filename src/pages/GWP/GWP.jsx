
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   IconButton,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import axios from "../../api/axios";
// import FilterByChemicalName from "./FilterByChemicalName";


// const GWPTable = () => {
//   const [gwpData, setGwpData] = useState([]);
//   const [allGwpData, setAllGwpData] = useState([]); // To store all data
//   const [uniqueAssessments, setUniqueAssessments] = useState([]);
//   const [chemicalName, setChemicalName] = useState("");
//   const [assessments, setAssessments] = useState([
//     { name: "Fifth Assessment Report (AR5)", value: "" },
//     { name: "Sixth Assessment Report (AR6)", value: "" },
//   ]);
//   const [dynamicAssessments, setDynamicAssessments] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [editData, setEditData] = useState(null);

//   // Fetch data from the server
//   const fetchGWP = () => {
//     axios
//       .get("/api/gwp/all")
//       .then((response) => {
//         setGwpData(response.data);
//         setAllGwpData(response.data); // Store all data initially

//         // Extract unique assessment names
//         const uniqueNames = [
//           ...new Set(
//             response.data.flatMap((entry) =>
//               entry.assessments.map((a) => a.name)
//             )
//           ),
//         ];
//         setUniqueAssessments(uniqueNames);
//       })
//       .catch((error) => {
//         console.error("Failed to fetch GWP data:", error);
//       });
//   };

//   useEffect(() => {
//     fetchGWP();
//   }, []);

//   const handleFilter = (filteredData) => {
//     setGwpData(filteredData ? [filteredData] : allGwpData); // Update table data
//   };


//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const validAssessments = assessments
//       .concat(dynamicAssessments)
//       .filter((assessment) => assessment.value.trim() !== "");

//     if (validAssessments.length === 0) {
//       alert("Please fill in all assessments with valid values.");
//       return;
//     }

//     const newData = { chemicalName, assessments: validAssessments };

//     axios
//       .post("/api/gwp/add", newData)
//       .then(() => {
//         fetchGWP();
//         setChemicalName("");
//         setAssessments([
//           { name: "Fifth Assessment Report (AR5)", value: "" },
//           { name: "Sixth Assessment Report (AR6)", value: "" },
//         ]);
//         setDynamicAssessments([]);
//       })
//       .catch((error) => {
//         console.error("Failed to add GWP data:", error);
//       });
//   };

//   const handleUpdate = (id) => {
//     const data = gwpData.find((item) => item._id === id);
//     setEditData({ ...data, dynamicAssessments: [] });
//     setOpenDialog(true);
//   };

//   const handleEditAssessmentChange = (index, value, isDynamic = false) => {
//     if (isDynamic) {
//       const updatedDynamic = [...editData.dynamicAssessments];
//       updatedDynamic[index].value = value;
//       setEditData({ ...editData, dynamicAssessments: updatedDynamic });
//     } else {
//       const updatedAssessments = [...editData.assessments];
//       updatedAssessments[index].value = value;
//       setEditData({ ...editData, assessments: updatedAssessments });
//     }
//   };

//   const addDynamicEditAssessment = () => {
//     const nextNumber =
//       editData.assessments.length + editData.dynamicAssessments.length + 5;
//     const nextOrdinal = toOrdinal(nextNumber);
//     const nextAssessment = `${nextOrdinal} Assessment Report (AR${nextNumber})`;

//     setEditData({
//       ...editData,
//       dynamicAssessments: [
//         ...editData.dynamicAssessments,
//         { name: nextAssessment, value: "" },
//       ],
//     });

//     if (!uniqueAssessments.includes(nextAssessment)) {
//       setUniqueAssessments([...uniqueAssessments, nextAssessment]);
//     }
//   };

//   const saveUpdatedData = () => {
//     const updatedAssessments = [
//       ...editData.assessments,
//       ...editData.dynamicAssessments.filter(
//         (a) => a.value !== "" && !isNaN(a.value)
//       ),
//     ];

//     const updatedData = { ...editData, assessments: updatedAssessments };
//     delete updatedData.dynamicAssessments;

//     axios
//       .put(`/api/gwp/update/${editData._id}`, updatedData)
//       .then(() => {
//         fetchGWP();
//         setOpenDialog(false);
//         setEditData(null);
//       })
//       .catch((error) => {
//         console.error("Failed to update GWP data:", error);
//       });
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this record?")) {
//       axios
//         .delete(`/api/gwp/delete/${id}`)
//         .then(() => fetchGWP())
//         .catch((error) => {
//           console.error("Failed to delete GWP data:", error);
//         });
//     }
//   };

//   const addAssessment = () => {
//     const nextNumber = assessments.length + dynamicAssessments.length + 5;
//     const nextOrdinal = toOrdinal(nextNumber);
//     const nextAssessment = `${nextOrdinal} Assessment Report (AR${nextNumber})`;

//     setDynamicAssessments([
//       ...dynamicAssessments,
//       { name: nextAssessment, value: "" },
//     ]);

//     if (!uniqueAssessments.includes(nextAssessment)) {
//       setUniqueAssessments([...uniqueAssessments, nextAssessment]);
//     }
//   };

//   const toOrdinal = (num) => {
//     if (num === 0) return `${num}`;
//     const suffixes = ["th", "st", "nd", "rd"];
//     const value = num % 100;
//     return `${num}${suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]}`;
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <Typography variant="h5" gutterBottom>
//         GWP Data Form
//       </Typography>

//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Chemical Name"
//           variant="outlined"
//           fullWidth
//           value={chemicalName}
//           onChange={(e) => setChemicalName(e.target.value)}
//           style={{ marginBottom: 20 }}
//         />

//         {assessments.concat(dynamicAssessments).map((assessment, index) => (
//           <TextField
//             key={index}
//             label={assessment.name}
//             variant="outlined"
//             fullWidth
//             type="text"
//             value={assessment.value}
//             onChange={(e) => {
//               if (index >= assessments.length) {
//                 const updatedDynamic = [...dynamicAssessments];
//                 updatedDynamic[index - assessments.length].value =
//                   e.target.value;
//                 setDynamicAssessments(updatedDynamic);
//               } else {
//                 const updatedAssessments = [...assessments];
//                 updatedAssessments[index].value = e.target.value;
//                 setAssessments(updatedAssessments);
//               }
//             }}
//             style={{ marginBottom: 20 }}
//           />
//         ))}

//         <Box display="flex" alignItems="center" style={{ marginBottom: 10 }}>
//           <IconButton onClick={addAssessment} color="primary">
//             <AddCircleIcon />
//           </IconButton>
//           <Typography variant="body1" style={{ marginLeft: 3 }}>
//             Add Assessment
//           </Typography>
//         </Box>

 
//         <Button variant="contained" color="primary" type="submit">
//           Add GWP Data
//         </Button>
//       </form>
// {/* Add the FilterByChemicalName component */}
// <FilterByChemicalName onFilter={handleFilter} />
//       <Typography variant="h5" gutterBottom style={{ marginTop: 40 }}>
//         GWP Data Table
//       </Typography>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Chemical Name</TableCell>
//               {uniqueAssessments.map((name, index) => (
//                 <TableCell key={index}>{name}</TableCell>
//               ))}
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {gwpData.map((data) => (
//               <TableRow key={data._id}>
//                 <TableCell>{data.chemicalName}</TableCell>
//                 {uniqueAssessments.map((name, index) => {
//                   const assessment = data.assessments.find(
//                     (a) => a.name === name
//                   );
//                   return (
//                     <TableCell key={index}>
//                       {assessment ? assessment.value : "-"}
//                     </TableCell>
//                   );
//                 })}
//                 <TableCell>
//                   <IconButton
//                     onClick={() => handleUpdate(data._id)}
//                     color="primary"
//                   >
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton
//                     onClick={() => handleDelete(data._id)}
//                     color="red"
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {editData && (
//         <Dialog
//           open={openDialog}
//           onClose={() => setOpenDialog(false)}
//           maxWidth="md"
//           fullWidth
//         >
//           <DialogTitle>Edit GWP Data</DialogTitle>
//           <DialogContent style={{ maxHeight: "400px", overflow: "auto" }}>
//             <TextField
//               label="Chemical Name"
//               fullWidth
//               value={editData.chemicalName}
//               onChange={(e) =>
//                 setEditData({ ...editData, chemicalName: e.target.value })
//               }
//               style={{ marginBottom: 20, marginTop: 10 }}
//             />
//             {editData.assessments.map((assessment, index) => (
//               <TextField
//                 key={index}
//                 label={assessment.name}
//                 fullWidth
//                 type="text"
//                 value={assessment.value}
//                 onChange={(e) =>
//                   handleEditAssessmentChange(index, e.target.value)
//                 }
//                 style={{ marginBottom: 20 }}
//               />
//             ))}
//             {editData.dynamicAssessments.map((assessment, index) => (
//               <TextField
//                 key={`dynamic-${index}`}
//                 label={assessment.name}
//                 fullWidth
//                 type="text"
//                 value={assessment.value}
//                 onChange={(e) =>
//                   handleEditAssessmentChange(index, e.target.value, true)
//                 }
//                 style={{ marginBottom: 20 }}
//               />
//             ))}
//             <Box display="flex" alignItems="center" style={{ marginBottom: 10 }}>
//               <IconButton onClick={addDynamicEditAssessment} color="primary">
//                 <AddCircleIcon />
//               </IconButton>
//               <Typography variant="body1" style={{ marginLeft: 3 }}>
//                 Add Assessment
//               </Typography>
//             </Box>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={saveUpdatedData}
//             >
//               Save
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </div>
//   );
// };

// export default GWPTable;


// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   IconButton,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import axios from "../../api/axios";
// import FilterByChemicalName from "./FilterByChemicalName";

// const GWPTable = () => {
//   const [gwpData, setGwpData] = useState([]);
//   const [allGwpData, setAllGwpData] = useState([]);
//   const [uniqueAssessments, setUniqueAssessments] = useState([]);
//   const [chemicalName, setChemicalName] = useState("");
//   const [assessments, setAssessments] = useState({}); // Use an object to represent the Map field
//   const [openDialog, setOpenDialog] = useState(false);
//   const [editData, setEditData] = useState(null);

//   // Fetch data from the server
//   const fetchGWP = () => {
//     axios
//       .get("/api/gwp/all")
//       .then((response) => {
//         setGwpData(response.data);
//         setAllGwpData(response.data);

//         // Extract unique assessment keys
//         const uniqueKeys = [
//           ...new Set(
//             response.data.flatMap((entry) => Object.keys(entry.assessments))
//           ),
//         ];
//         setUniqueAssessments(uniqueKeys);
//       })
//       .catch((error) => {
//         console.error("Failed to fetch GWP data:", error);
//       });
//   };

//   useEffect(() => {
//     fetchGWP();
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (Object.keys(assessments).length === 0) {
//       alert("Please fill in at least one assessment.");
//       return;
//     }

//     const newData = { chemicalName, assessments };

//     axios
//       .post("/api/gwp/add", newData)
//       .then(() => {
//         fetchGWP();
//         setChemicalName("");
//         setAssessments({});
//       })
//       .catch((error) => {
//         console.error("Failed to add GWP data:", error);
//       });
//   };

//   const handleUpdate = (id) => {
//     const data = gwpData.find((item) => item._id === id);
//     setEditData({ ...data });
//     setOpenDialog(true);
//   };

//   const saveUpdatedData = () => {
//     axios
//       .put(`/api/gwp/update/${editData._id}`, editData)
//       .then(() => {
//         fetchGWP();
//         setOpenDialog(false);
//         setEditData(null);
//       })
//       .catch((error) => {
//         console.error("Failed to update GWP data:", error);
//       });
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this record?")) {
//       axios
//         .delete(`/api/gwp/delete/${id}`)
//         .then(() => fetchGWP())
//         .catch((error) => {
//           console.error("Failed to delete GWP data:", error);
//         });
//     }
//   };

//   const addAssessment = () => {
//     // Determine the next AR number
//     const existingARs = Object.keys(assessments)
//       .filter((key) => key.startsWith("AR")) // Filter only AR keys
//       .map((key) => parseInt(key.replace("AR", ""), 10)); // Extract AR numbers
//     const nextAR = Math.max(...existingARs, 4) + 1; // Default to AR5 if no AR keys exist
  
//     // Add the next AR key
//     const nextKey = `AR${nextAR}`;
//     setAssessments({ ...assessments, [nextKey]: "" });
//   };
  
//   const handleFilter = (filteredData) => {
//     setGwpData(filteredData ? [filteredData] : allGwpData); // Update table data
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <Typography variant="h5" gutterBottom>
//         GWP Data Form
//       </Typography>

//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Chemical Name"
//           variant="outlined"
//           fullWidth
//           value={chemicalName}
//           onChange={(e) => setChemicalName(e.target.value)}
//           style={{ marginBottom: 20 }}
//         />

//         {Object.entries(assessments).map(([key, value], index) => (
//           <TextField
//             key={index}
//             label={key}
//             variant="outlined"
//             fullWidth
//             type="text"
//             value={value}
//             onChange={(e) =>
//               setAssessments({ ...assessments, [key]: e.target.value })
//             }
//             style={{ marginBottom: 20 }}
//           />
//         ))}

//         <Box display="flex" alignItems="center" style={{ marginBottom: 10 }}>
//           <IconButton onClick={addAssessment} color="primary">
//             <AddCircleIcon />
//           </IconButton>
//           <Typography variant="body1" style={{ marginLeft: 3 }}>
//             Add Assessment
//           </Typography>
//         </Box>

//         <Button variant="contained" color="primary" type="submit">
//           Add GWP Data
//         </Button>
//       </form>
//       <FilterByChemicalName onFilter={handleFilter} />
//       <Typography variant="h5" gutterBottom style={{ marginTop: 40 }}>
//         GWP Data Table
//       </Typography>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Chemical Name</TableCell>
//               {uniqueAssessments.map((key, index) => (
//                 <TableCell key={index}>{key}</TableCell>
//               ))}
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {gwpData.map((data) => (
//               <TableRow key={data._id}>
//                 <TableCell>{data.chemicalName}</TableCell>
//                 {uniqueAssessments.map((key, index) => (
//                   <TableCell key={index}>
//                     {data.assessments[key] || "-"}
//                   </TableCell>
//                 ))}
//                 <TableCell>
//                   <IconButton
//                     onClick={() => handleUpdate(data._id)}
//                     color="primary"
//                   >
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton
//                     onClick={() => handleDelete(data._id)}
//                     color="primary"
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {editData && (
//   <Dialog
//     open={openDialog}
//     onClose={() => setOpenDialog(false)}
//     maxWidth="md"
//     fullWidth
//   >
//     <DialogTitle>Edit GWP Data</DialogTitle>
//     <DialogContent>
//       <TextField
//         label="Chemical Name"
//         fullWidth
//         value={editData.chemicalName}
//         onChange={(e) =>
//           setEditData({ ...editData, chemicalName: e.target.value })
//         }
//         style={{ marginBottom: 20, marginTop: 10 }}
//       />
//       {Object.entries(editData.assessments).map(([key, value], index) => (
//         <TextField
//           key={index}
//           label={key}
//           fullWidth
//           value={value}
//           onChange={(e) =>
//             setEditData({
//               ...editData,
//               assessments: {
//                 ...editData.assessments,
//                 [key]: e.target.value,
//               },
//             })
//           }
//           style={{ marginBottom: 20 }}
//         />
//       ))}
//       <Box display="flex" alignItems="center" style={{ marginBottom: 10 }}>
//         <IconButton
//           onClick={() => {
//             // Determine the next AR number
//             const existingARs = Object.keys(editData.assessments)
//               .filter((key) => key.startsWith("AR")) // Filter only AR keys
//               .map((key) => parseInt(key.replace("AR", ""), 10)); // Extract AR numbers
//             const nextAR = Math.max(...existingARs, 4) + 1; // Default to AR5 if no AR keys exist

//             // Add the next AR key
//             const nextKey = `AR${nextAR}`;
//             setEditData({
//               ...editData,
//               assessments: { ...editData.assessments, [nextKey]: "" },
//             });
//           }}
//           color="primary"
//         >
//           <AddCircleIcon />
//         </IconButton>
//         <Typography variant="body1" style={{ marginLeft: 3 }}>
//           Add Assessment
//         </Typography>
//       </Box>
//     </DialogContent>
//     <DialogActions>
//       <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={saveUpdatedData}
//       >
//         Save
//       </Button>
//     </DialogActions>
//   </Dialog>
// )}

//     </div>
//   );
// };

// export default GWPTable;

//chemical formula added
import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "../../api/axios";
import FilterByChemicalName from "./FilterByChemicalName";

const GWPTable = () => {
  const [gwpData, setGwpData] = useState([]);
  const [allGwpData, setAllGwpData] = useState([]);
  const [uniqueAssessments, setUniqueAssessments] = useState([]);
  const [chemicalName, setChemicalName] = useState("");
  const [chemicalFormula, setChemicalFormula] = useState(""); // Added chemicalFormula state
  const [assessments, setAssessments] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState(null);

  // Fetch data from the server
  const fetchGWP = () => {
    axios
      .get("/api/gwp/all")
      .then((response) => {
        setGwpData(response.data);
        setAllGwpData(response.data);

        // Extract unique assessment keys
        const uniqueKeys = [
          ...new Set(
            response.data.flatMap((entry) => Object.keys(entry.assessments))
          ),
        ];
        setUniqueAssessments(uniqueKeys);
      })
      .catch((error) => {
        console.error("Failed to fetch GWP data:", error);
      });
  };

  useEffect(() => {
    fetchGWP();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!chemicalName.trim() || !chemicalFormula.trim()) {
      alert("Chemical Name and Chemical Formula are required.");
      return;
    }

    if (Object.keys(assessments).length === 0) {
      alert("Please fill in at least one assessment.");
      return;
    }

    const newData = { chemicalName, chemicalFormula, assessments };

    axios
      .post("/api/gwp/add", newData)
      .then(() => {
        fetchGWP();
        setChemicalName("");
        setChemicalFormula("");
        setAssessments({});
      })
      .catch((error) => {
        console.error("Failed to add GWP data:", error);
      });
  };

  const handleUpdate = (id) => {
    const data = gwpData.find((item) => item._id === id);
    setEditData({ ...data });
    setOpenDialog(true);
  };

  const saveUpdatedData = () => {
    axios
      .put(`/api/gwp/update/${editData._id}`, editData)
      .then(() => {
        fetchGWP();
        setOpenDialog(false);
        setEditData(null);
      })
      .catch((error) => {
        console.error("Failed to update GWP data:", error);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      axios
        .delete(`/api/gwp/delete/${id}`)
        .then(() => fetchGWP())
        .catch((error) => {
          console.error("Failed to delete GWP data:", error);
        });
    }
  };

  const addAssessment = () => {
    const existingARs = Object.keys(assessments)
      .filter((key) => key.startsWith("AR"))
      .map((key) => parseInt(key.replace("AR", ""), 10));
    const nextAR = Math.max(...existingARs, 4) + 1;

    const nextKey = `AR${nextAR}`;
    setAssessments({ ...assessments, [nextKey]: "" });
  };

  const handleFilter = (filteredData) => {
    setGwpData(filteredData ? [filteredData] : allGwpData);
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h5" gutterBottom>
        GWP Data Form
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Chemical Name"
          variant="outlined"
          fullWidth
          value={chemicalName}
          onChange={(e) => setChemicalName(e.target.value)}
          style={{ marginBottom: 20 }}
        />
        <TextField
          label="Chemical Formula"
          variant="outlined"
          fullWidth
          value={chemicalFormula}
          onChange={(e) => setChemicalFormula(e.target.value)}
          style={{ marginBottom: 20 }}
        />
        {Object.entries(assessments).map(([key, value], index) => (
          <TextField
            key={index}
            label={key}
            variant="outlined"
            fullWidth
            type="text"
            value={value}
            onChange={(e) =>
              setAssessments({ ...assessments, [key]: e.target.value })
            }
            style={{ marginBottom: 20 }}
          />
        ))}

        <Box display="flex" alignItems="center" style={{ marginBottom: 10 }}>
          <IconButton onClick={addAssessment} color="primary">
            <AddCircleIcon />
          </IconButton>
          <Typography variant="body1" style={{ marginLeft: 3 }}>
            Add Assessment
          </Typography>
        </Box>

        <Button variant="contained" color="primary" type="submit">
          Add GWP Data
        </Button>
      </form>
      <FilterByChemicalName onFilter={handleFilter} />
      <Typography variant="h5" gutterBottom style={{ marginTop: 40 }}>
        GWP Data Table
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Chemical Name</TableCell>
              <TableCell>Chemical Formula</TableCell>
              {uniqueAssessments.map((key, index) => (
                <TableCell key={index}>{key}</TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gwpData.map((data) => (
              <TableRow key={data._id}>
                <TableCell>{data.chemicalName}</TableCell>
                <TableCell>{data.chemicalFormula}</TableCell>
                {uniqueAssessments.map((key, index) => (
                  <TableCell key={index}>
                    {data.assessments[key] || "-"}
                  </TableCell>
                ))}
                <TableCell>
                  <IconButton
                    onClick={() => handleUpdate(data._id)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(data._id)}
                    color="primary"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {editData && (
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Edit GWP Data</DialogTitle>
          <DialogContent>
            <TextField
              label="Chemical Name"
              fullWidth
              value={editData.chemicalName}
              onChange={(e) =>
                setEditData({ ...editData, chemicalName: e.target.value })
              }
              style={{ marginBottom: 20, marginTop: 10 }}
            />
            <TextField
              label="Chemical Formula"
              fullWidth
              value={editData.chemicalFormula}
              onChange={(e) =>
                setEditData({ ...editData, chemicalFormula: e.target.value })
              }
              style={{ marginBottom: 20 }}
            />
            {Object.entries(editData.assessments).map(([key, value], index) => (
              <TextField
                key={index}
                label={key}
                fullWidth
                value={value}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    assessments: {
                      ...editData.assessments,
                      [key]: e.target.value,
                    },
                  })
                }
                style={{ marginBottom: 20 }}
              />
            ))}
            <Box display="flex" alignItems="center" style={{ marginBottom: 10 }}>
              <IconButton
                onClick={() => {
                  const existingARs = Object.keys(editData.assessments)
                    .filter((key) => key.startsWith("AR"))
                    .map((key) => parseInt(key.replace("AR", ""), 10));
                  const nextAR = Math.max(...existingARs, 4) + 1;

                  const nextKey = `AR${nextAR}`;
                  setEditData({
                    ...editData,
                    assessments: { ...editData.assessments, [nextKey]: "" },
                  });
                }}
                color="primary"
              >
                <AddCircleIcon />
              </IconButton>
              <Typography variant="body1" style={{ marginLeft: 3 }}>
                Add Assessment
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={saveUpdatedData}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default GWPTable;
