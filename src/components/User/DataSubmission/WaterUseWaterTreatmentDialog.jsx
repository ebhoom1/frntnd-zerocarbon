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
import { fetchWaterConsumption } from "../../../redux/features/emsData/waterConsumptionAdditionalData";

const WaterUseWaterTreatmentDialog = ({ open, handleClose, userName }) => {
  const dispatch = useDispatch();
  const { totalConsumption, carbonEmission, loading, error } = useSelector((state) => state.water);
  const emissionFactor = 0.708;

console.log("totalConsumption",totalConsumption);

  useEffect(() => {
    if (open && userName) {
      dispatch(fetchWaterConsumption(userName));
    }
  }, [open, userName, dispatch]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Water Use & Wastewater Treatment Details</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : totalConsumption !== null ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Total Consumption</TableCell>
                <TableCell>Emission Factor</TableCell>
                <TableCell>Carbon Emission</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{totalConsumption}</TableCell>
                <TableCell>{emissionFactor}</TableCell>
                <TableCell>{carbonEmission}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ) : (
          <Typography>No water data found for this user.</Typography>
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

export default WaterUseWaterTreatmentDialog;
