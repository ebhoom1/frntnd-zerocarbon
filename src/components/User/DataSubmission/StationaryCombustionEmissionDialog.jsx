// components/StationaryCombustionEmissionDialog.js
import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Typography
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchStationaryCombustionEmissions } from "../../../redux/features/emissionCalculation/stationaryCombustionEmissionSlice";

const StationaryCombustionEmissionDialog = ({ open, handleClose,userId }) => {
  const dispatch = useDispatch();
  const { emissionData, loading, error } = useSelector((state) => state.stationaryCombustionEmissions);

  useEffect(() => {
    if (open && userId) {
      dispatch(fetchStationaryCombustionEmissions(userId));
    }
  }, [open, userId, dispatch]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Stationary Combustion Emission Details</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : emissionData?.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Month</TableCell>
                <TableCell>Fuel Type</TableCell>
                <TableCell>Fuel Unit</TableCell>
                <TableCell>Annual Fuel Consumption</TableCell>
                <TableCell>CO2 Emission (kg)</TableCell>
                <TableCell>CH4 Emission (kg)</TableCell>
                <TableCell>N2O Emission (kg)</TableCell>
                <TableCell>SF6 Emission (kg)</TableCell>
                <TableCell>CO2e Emission (kg)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {emissionData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.month}</TableCell>
                  <TableCell>{item.fuelType}</TableCell>
                  <TableCell>{item.fuelUnit}</TableCell>
                  <TableCell>{item.annualFuelConsumption}</TableCell>
                  <TableCell>{item.emission?.totalCO2}</TableCell>
                  <TableCell>{item.emission?.totalCH4}</TableCell>
                  <TableCell>{item.emission?.totalN2O}</TableCell>
                  <TableCell>{item.emission?.totalSF6}</TableCell>
                  <TableCell>{item.emission?.totalCO2e}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography>No emission data found.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StationaryCombustionEmissionDialog;
