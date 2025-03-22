// components/PurchasedElectricityDialog.js
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
import { fetchPurchasedElectricity } from "../../../redux/features/emissionCalculation/purchasedElectricitySlice";

const PurchasedElectricityDialog = ({ open, handleClose ,userId}) => {
  const dispatch = useDispatch();
  const { emissionData, loading, error } = useSelector((state) => state.purchasedElectricity);

  useEffect(() => {
    if (open && userId) {
      dispatch(fetchPurchasedElectricity(userId));
    }
  }, [open, userId, dispatch]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle>Purchased Electricity Emission Details</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : emissionData?.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Electricity Consumption (kWh)</TableCell>
                <TableCell>Emission Factor (kg CO₂e/kWh)</TableCell>
                <TableCell>Total Emission (kg CO₂e)</TableCell>
                <TableCell>Source</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {emissionData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.electricityConsumptionKWh}</TableCell>
                  <TableCell>{item.emissionFactor}</TableCell>
                  <TableCell>{item.emissionKgCO2e}</TableCell>
                  <TableCell>{item.source}</TableCell>
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

export default PurchasedElectricityDialog;
