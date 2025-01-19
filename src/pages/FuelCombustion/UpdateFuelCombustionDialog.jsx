// import React, { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Button,
// } from "@mui/material";

// const UpdateFuelCombustionDialog = ({
//   open,
//   handleClose,
//   data,
//   handleUpdate,
// }) => {
//   const [formData, setFormData] = useState({});

//   useEffect(() => {
//     if (data) {
//       setFormData(data);
//     }
//   }, [data]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = () => {
//     const {
//       NCV,
//       CO2,
//       CH4,
//       N2O,
//       fuelDensityLiter,
//       fuelDensityM3,
//       CO2Formula,
//       CH4Formula,
//       N2OFormula,
//       category,
//       activity,
//       source,
//       reference,
//     } = formData;

//     handleUpdate({
//       id: formData._id,
//       NCV,
//       CO2,
//       CH4,
//       N2O,
//       fuelDensityLiter,
//       fuelDensityM3,
//       CO2Formula: CO2Formula || "CO2",
//       CH4Formula: CH4Formula || "CH4",
//       N2OFormula: N2OFormula || "N2O",
//       category,
//       activity,
//       source,
//       reference,
//     });

//     handleClose();
//   };

//   return (
//     <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
//       <DialogTitle>Update Fuel Combustion Data</DialogTitle>
//       <DialogContent
//         sx={{
//           display: "grid",
//           gridTemplateColumns: "1fr",
//           gap: 2,
//           mt: 2,
//         }}
//       >
//         <TextField
//           label="Category"
//           name="category"
//           value={formData.category || ""}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Activity"
//           name="activity"
//           value={formData.activity || ""}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Source"
//           name="source"
//           value={formData.source || ""}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Reference"
//           name="reference"
//           value={formData.reference || ""}
//           onChange={handleChange}
//         />
//         <TextField
//           label="NCV"
//           name="NCV"
//           value={formData.NCV || ""}
//           onChange={handleChange}
//           type="number"
//         />
//         <TextField
//           label="CO2"
//           name="CO2"
//           value={formData.CO2 || ""}
//           onChange={handleChange}
//           type="number"
//         />
//         <TextField
//           label="CH4"
//           name="CH4"
//           value={formData.CH4 || ""}
//           onChange={handleChange}
//           type="number"
//         />
//         <TextField
//           label="N2O"
//           name="N2O"
//           value={formData.N2O || ""}
//           onChange={handleChange}
//           type="number"
//         />
//         <TextField
//           label="Fuel Density (Kg/L)"
//           name="fuelDensityLiter"
//           value={formData.fuelDensityLiter || ""}
//           onChange={handleChange}
//           type="number"
//         />
//         <TextField
//           label="Fuel Density (Kg/m³)"
//           name="fuelDensityM3"
//           value={formData.fuelDensityM3 || ""}
//           onChange={handleChange}
//           type="number"
//         />
//         <TextField
//           label="CO2 Formula"
//           name="CO2Formula"
//           value={formData.CO2Formula || "CO2"}
//           onChange={handleChange}
//         />
//         <TextField
//           label="CH4 Formula"
//           name="CH4Formula"
//           value={formData.CH4Formula || "CH4"}
//           onChange={handleChange}
//         />
//         <TextField
//           label="N2O Formula"
//           name="N2OFormula"
//           value={formData.N2OFormula || "N2O"}
//           onChange={handleChange}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleClose}>Cancel</Button>
//         <Button onClick={handleSubmit} variant="contained">
//           Update
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default UpdateFuelCombustionDialog;


import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Box,
} from "@mui/material";

const UpdateFuelCombustionDialog = ({
  open,
  handleClose,
  data,
  handleUpdate,
}) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAssessmentChange = (index, e) => {
    const updatedAssessments = [...formData.assessments];
    updatedAssessments[index][e.target.name] = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      assessments: updatedAssessments,
    }));
  };

  const handleAddAssessment = () => {
    setFormData((prevState) => ({
      ...prevState,
      assessments: [
        ...prevState.assessments,
        {
          assessmentType: "",
          CO2_KgT: "",
          CH4_KgT: "",
          N2O_KgT: "",
          CO2e: "",
          CO2_KgL: "",
          CO2_Kgm3: "",
          CH4_KgL: "",
          CH4_Kgm3: "",
          N2O_KgL: "",
          N2O_Kgm3: "",
          CO2e_KgL: "",
          CO2e_Kgm3: "",
        },
      ],
    }));
  };

  const handleSubmit = () => {
    handleUpdate({
      ...formData,
      id: formData._id,
    });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Update Fuel Combustion Data</DialogTitle>
      <DialogContent
        sx={{
          display: "grid",
          gap: 2,
          mt: 2,
        }}
      >
        <TextField
          label="Category"
          name="category"
          value={formData.category || ""}
          onChange={handleChange}
        />
        <TextField
          label="Activity"
          name="activity"
          value={formData.activity || ""}
          onChange={handleChange}
        />
        <TextField
          label="Source"
          name="source"
          value={formData.source || ""}
          onChange={handleChange}
        />
        <TextField
          label="Reference"
          name="reference"
          value={formData.reference || ""}
          onChange={handleChange}
        />
        <TextField
          label="NCV"
          name="NCV"
          value={formData.NCV || ""}
          onChange={handleChange}
          type="number"
        />
        <TextField
          label="CO2"
          name="CO2"
          value={formData.CO2 || ""}
          onChange={handleChange}
          type="number"
        />
        <TextField
          label="CH4"
          name="CH4"
          value={formData.CH4 || ""}
          onChange={handleChange}
          type="number"
        />
        <TextField
          label="N2O"
          name="N2O"
          value={formData.N2O || ""}
          onChange={handleChange}
          type="number"
        />
        <TextField
          label="Fuel Density (Kg/L)"
          name="fuelDensityLiter"
          value={formData.fuelDensityLiter || ""}
          onChange={handleChange}
          type="number"
        />
        <TextField
          label="Fuel Density (Kg/m³)"
          name="fuelDensityM3"
          value={formData.fuelDensityM3 || ""}
          onChange={handleChange}
          type="number"
        />

        {/* Assessments Section */}
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Assessments
          </Typography>
          {formData.assessments?.map((assessment, index) => (
            <Box key={index} sx={{ mb: 4 }}>
              <Typography variant="subtitle1">
                Assessment {index + 1}
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 2,
                }}
              >
                <Select
                  value={assessment.assessmentType}
                  name="assessmentType"
                  onChange={(e) => handleAssessmentChange(index, e)}
                  displayEmpty
                  required
                >
                  <MenuItem value="" disabled>
                    Select Assessment Type
                  </MenuItem>
                  <MenuItem value="AR5">AR5</MenuItem>
                  <MenuItem value="AR6">AR6</MenuItem>
                </Select>
                <TextField
                  label="CO2_KgT"
                  name="CO2_KgT"
                  value={assessment.CO2_KgT}
                  onChange={(e) => handleAssessmentChange(index, e)}
                  type="number"
                />
                <TextField
                  label="CH4_KgT"
                  name="CH4_KgT"
                  value={assessment.CH4_KgT}
                  onChange={(e) => handleAssessmentChange(index, e)}
                  type="number"
                />
                <TextField
                  label="N2O_KgT"
                  name="N2O_KgT"
                  value={assessment.N2O_KgT}
                  onChange={(e) => handleAssessmentChange(index, e)}
                  type="number"
                />
                <TextField
                  label="CO2e"
                  name="CO2e"
                  value={assessment.CO2e}
                  onChange={(e) => handleAssessmentChange(index, e)}
                  type="number"
                />
                <TextField
                  label="CO2_KgL"
                  name="CO2_KgL"
                  value={assessment.CO2_KgL}
                  onChange={(e) => handleAssessmentChange(index, e)}
                  type="number"
                />
                <TextField
                  label="CO2_Kgm3"
                  name="CO2_Kgm3"
                  value={assessment.CO2_Kgm3}
                  onChange={(e) => handleAssessmentChange(index, e)}
                  type="number"
                />
                <TextField
                  label="CH4_KgL"
                  name="CH4_KgL"
                  value={assessment.CH4_KgL}
                  onChange={(e) => handleAssessmentChange(index, e)}
                  type="number"
                />
                <TextField
                  label="CH4_Kgm3"
                  name="CH4_Kgm3"
                  value={assessment.CH4_Kgm3}
                  onChange={(e) => handleAssessmentChange(index, e)}
                  type="number"
                />
                <TextField
                  label="N2O_KgL"
                  name="N2O_KgL"
                  value={assessment.N2O_KgL}
                  onChange={(e) => handleAssessmentChange(index, e)}
                  type="number"
                />
                <TextField
                  label="N2O_Kgm3"
                  name="N2O_Kgm3"
                  value={assessment.N2O_Kgm3}
                  onChange={(e) => handleAssessmentChange(index, e)}
                  type="number"
                />
                <TextField
                  label="CO2e_KgL"
                  name="CO2e_KgL"
                  value={assessment.CO2e_KgL}
                  onChange={(e) => handleAssessmentChange(index, e)}
                  type="number"
                />
                <TextField
                  label="CO2e_Kgm3"
                  name="CO2e_Kgm3"
                  value={assessment.CO2e_Kgm3}
                  onChange={(e) => handleAssessmentChange(index, e)}
                  type="number"
                />
              </Box>
            </Box>
          ))}
          <Button variant="outlined" onClick={handleAddAssessment}>
            Add Next Assessment Type
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateFuelCombustionDialog;
