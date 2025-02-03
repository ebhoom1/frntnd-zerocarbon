
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
  IconButton,
  Button,
  Link,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import axios from "../../api/axios";
import AddActivityDialog from "./ActivityAddDialog";
import EditCategoryDialog from "./EditCategoryDialog";
import CategoryFilter from "./CategoryFilter";

const EmissionFactorTable = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedCategoryForEdit, setSelectedCategoryForEdit] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data);
      console.log("categories:",categories);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenDialog = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCategoryId(null);
  };

  const handleActivityAdded = async () => {
    handleCloseDialog();
    const response = await axios.get("/api/categories");
    setCategories(response.data); // Refresh the table after adding an activity
  };

  const toggleRow = (key) => {
    setExpandedRows((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  //edit
  const handleOpenEditDialog = (category) => {
    setSelectedCategoryForEdit(category);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedCategoryForEdit(null);
  };

  const handleCategoryEdited = async () => {
    handleCloseEditDialog();
    const response = await axios.get("/api/categories");
    setCategories(response.data); // Refresh categories after editing
  };

  const handleDeleteCategory = async (fuelId) => {
    if (window.confirm("Are you sure you want to delete this Fuel?")) {
      try {
        await axios.delete(`/api/categories/${fuelId}`);
        alert("Fuel deleted successfully!");
        const response = await axios.get("/api/categories");
        setCategories(response.data); // Refresh categories after deletion
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Failed to delete category.");
      }
    }
  };

  const handleFilter = async (filters) => {
    try {
      const response = await axios.get("/api/categories/filter", {
        params: filters,
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error filtering categories:", error);
      alert("No matching data found or an error occurred.");
    }
  };

  const handleReset = () => {
    fetchCategories();
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography sx={{ mb: 4 }} variant="h4" gutterBottom>
        Emission Factors
      </Typography>
      <CategoryFilter onFilter={handleFilter} onReset={handleReset} />

      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table
        //  sx={{
        //   "& .MuiTableCell-root": {
        //     borderColor: "#C7C8CC", // Change this to your desired border color
        //   },
        // }}

        
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Category</strong>
              </TableCell>
              <TableCell>
                <strong>Activity</strong>
              </TableCell>
              <TableCell>
                <strong>Fuel</strong>
              </TableCell>
              {/* <TableCell><strong>Unit</strong></TableCell> */}
              <TableCell>
                <strong>Reference</strong>
              </TableCell>
              <TableCell>
                <strong>Source</strong>
              </TableCell>
              <TableCell>
                <strong>Unit Type</strong>
              </TableCell>
              <TableCell>
                <strong>kg CO2e</strong>
              </TableCell>
              <TableCell>
                <strong>kg CO2</strong>
              </TableCell>
              <TableCell>
                <strong>kg CH4</strong>
              </TableCell>
              <TableCell>
                <strong>kg N2O</strong>
              </TableCell>
              <TableCell>
                <strong>Updated At</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => {
              const categoryRowSpan = category.activities.reduce(
                (sum, act) =>
                  sum +
                  act.fuels.reduce(
                    (fuelSum, fuel) => fuelSum + fuel.units.length,
                    0
                  ),
                0
              );

              return (
                <React.Fragment key={category._id}>
                  {category.activities.map((activity, activityIndex) => {
                    const activityRowSpan = activity.fuels.reduce(
                      (fuelSum, fuel) => fuelSum + fuel.units.length,
                      0
                    );

                    return activity.fuels.map((fuel, fuelIndex) => {
                      return fuel.units.map((unit, unitIndex) => (
                        <TableRow
                          key={`${category._id}-${activityIndex}-${fuelIndex}-${unitIndex}`}
                        >
                          {/* Render Category Only for the First Row of the Entire Category */}
                          {activityIndex === 0 &&
                            fuelIndex === 0 &&
                            unitIndex === 0 && (
                              <TableCell rowSpan={categoryRowSpan}>
                                {category.name}
                              </TableCell>
                            )}

                          {/* Render Activity Only for the First Row of the Activity */}
                          {fuelIndex === 0 && unitIndex === 0 && (
                            <TableCell rowSpan={activityRowSpan}>
                              {activity.name}
                            </TableCell>
                          )}

                          {/* Render Fuel Only for the First Row of the Fuel */}
                          {unitIndex === 0 && (
                            <>
                              <TableCell rowSpan={fuel.units.length}>
                                {fuel.name}
                              </TableCell>
                              <TableCell rowSpan={fuel.units.length}>
                                {fuel.reference}
                              </TableCell>
                              <TableCell rowSpan={fuel.units.length}>
                              <Link
                                  href={fuel.source}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  underline="hover"
                                  color="primary"
                                >
                                  {fuel.source}
                                </Link>
                              </TableCell>
                            </>
                          )}

                          {/* Render Unit Details */}
                          <TableCell>{unit.type}</TableCell>
                          <TableCell>{unit.kgCO2e}</TableCell>
                          <TableCell>{unit.kgCO2}</TableCell>
                          <TableCell>{unit.kgCH4}</TableCell>
                          <TableCell>{unit.kgN2O}</TableCell>
                          <TableCell>{new Date(category.updatedAt).toLocaleString()}</TableCell>

                          {/* Actions Only Once Per Fuel */}
                          {unitIndex === 0 && (
                            <TableCell rowSpan={fuel.units.length}>
                              <Box sx={{ display: "flex", gap: 1 }}>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  onClick={() => handleOpenDialog(category._id)}
                                >
                                  Add Activity
                                </Button>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  onClick={() => handleOpenEditDialog(category)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  color="error"
                                  onClick={() =>
                                    handleDeleteCategory(fuel._id)
                                  }
                                >
                                  Delete Fuel
                                </Button>
                              </Box> 
                            </TableCell>
                          )}
                        </TableRow>
                      ));
                    });
                  })}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <AddActivityDialog
        open={openDialog}
        onClose={handleCloseDialog}
        categoryId={selectedCategoryId}
        onActivityAdded={handleActivityAdded}
      />
      <EditCategoryDialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        category={selectedCategoryForEdit}
        onCategoryEdited={handleCategoryEdited}
      />
    </Box>
  );
};

export default EmissionFactorTable;
