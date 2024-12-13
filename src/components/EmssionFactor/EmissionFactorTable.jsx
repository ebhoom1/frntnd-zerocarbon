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
} from "@mui/material";
import axios from "../../api/axios";
import CategoryFilter from "./CategoryFilter";

const EmissionFactorTable = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
        <Table>
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
                                {fuel.source}
                              </TableCell>
                            </>
                          )}

                          {/* Render Unit Details */}
                          <TableCell>{unit.type}</TableCell>
                          <TableCell>{unit.kgCO2e}</TableCell>
                          <TableCell>{unit.kgCO2}</TableCell>
                          <TableCell>{unit.kgCH4}</TableCell>
                          <TableCell>{unit.kgN2O}</TableCell>
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
    </Box>
  );
};

export default EmissionFactorTable;
