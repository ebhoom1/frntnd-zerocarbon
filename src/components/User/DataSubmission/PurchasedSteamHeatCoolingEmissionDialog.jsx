// components/PurchasedSteamHeatCoolingEmissionDialog.js
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
import { fetchPurchasedSteamHeatCoolingEmission } from "../../../redux/features/emissionCalculation/PurchasedSteamHeatCoolingEmissionSlice";

const PurchasedSteamHeatCoolingEmissionDialog = ({ open, handleClose,userId }) => {
  const dispatch = useDispatch();
  const { emissionData, loading, error } = useSelector((state) => state.purchasedSteamHeatCoolingEmission);

  useEffect(() => {
    if (open && userId) {
      dispatch(fetchPurchasedSteamHeatCoolingEmission(userId));
    }
  }, [open, userId, dispatch]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle>Purchased Steam/Heat/Cooling Emission Details</DialogTitle>
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
                <TableCell>Consumption</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Emission Factor (kg CO₂e/unit)</TableCell>
                <TableCell>Transmission Losses</TableCell>
                <TableCell>Loss Percent (%)</TableCell>
                <TableCell>Total Emission (kg CO₂e)</TableCell>
                <TableCell>Calculated At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {emissionData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.month}</TableCell>
                  <TableCell>{item.consumption}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>{item.emissionFactor}</TableCell>
                  <TableCell>{item.considerLosses}</TableCell>
                  <TableCell>{item.lossPercent}</TableCell>
                  <TableCell>{item.totalEmission}</TableCell>
                  <TableCell>{item.calculatedAt}</TableCell>
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

export default PurchasedSteamHeatCoolingEmissionDialog;
