// components/MobileCombustionEmissionDialog.js
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
import { useSelector, useDispatch } from "react-redux";
import { fetchMobileCombustionEmissions } from "../../../redux/features/emissionCalculation/mobileCombustionEmissionSlice";

const MobileCombustionEmissionDialog = ({ open, handleClose ,userId}) => {
  const dispatch = useDispatch();
  const { emissions, loading, error } = useSelector((state) => state.mobileCombustionEmissions);

  useEffect(() => {
    if (open && userId) {
      dispatch(fetchMobileCombustionEmissions(userId));
    }
  }, [open, userId, dispatch]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Mobile Combustion Emission Details</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : emissions?.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Vehicle Type</TableCell>
                <TableCell>Vehicle Name</TableCell>
                <TableCell>Fuel Type</TableCell>
                <TableCell>Fuel Consumption</TableCell>
                <TableCell>Vehicle Distance</TableCell>
                <TableCell>NCV (MJ)</TableCell>
                <TableCell>CO₂ (kg)</TableCell>
                <TableCell>CH₄ (kg)</TableCell>
                <TableCell>N₂O (kg)</TableCell>
                <TableCell>CO₂e (kg)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {emissions.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.vehicletype}</TableCell>
                  <TableCell>{item.vehiclename}</TableCell>
                  <TableCell>{item.fueltype}</TableCell>
                  <TableCell>{item.fuelcombustion}</TableCell>
                  <TableCell>{item.vehicledistance}</TableCell>
                  <TableCell>{item.emission?.totalEnergyMJ}</TableCell>
                  <TableCell>{item.emission?.CO2}</TableCell>
                  <TableCell>{item.emission?.CH4}</TableCell>
                  <TableCell>{item.emission?.N2O}</TableCell>
                  <TableCell>{item.emission?.CO2e}</TableCell>
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

export default MobileCombustionEmissionDialog;
