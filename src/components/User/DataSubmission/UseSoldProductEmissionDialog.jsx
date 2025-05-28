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
import { fetchUseSoldProductEmissions } from "../../../redux/features/emissionCalculation/useSoldProductEmissionSlice";

const UseSoldProductEmissionDialog = ({ open, handleClose,userId }) => {
  const dispatch = useDispatch();
  const { emissionData, loading, error } = useSelector((state) => state.useSoldProductEmissions);

  useEffect(() => {
    if (open && userId) {
      dispatch(fetchUseSoldProductEmissions(userId));
    }
  }, [open, userId, dispatch]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle>Use of Sold Products Emission Details</DialogTitle>
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
                <TableCell>Product Name</TableCell>
                <TableCell>Units Sold</TableCell>
                <TableCell>Requires Energy</TableCell>
                <TableCell>Energy Use/Year (kWh)</TableCell>
                <TableCell>Lifetime (Years)</TableCell>
                <TableCell>CO₂ (kg)</TableCell>
                <TableCell>CH₄ (kg)</TableCell>
                <TableCell>N₂O (kg)</TableCell>
                <TableCell>CO₂e (kg)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {emissionData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.month}</TableCell>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.unitsSold}</TableCell>
                  <TableCell>{item.requiresEnergy ? "Yes" : "No"}</TableCell>
                  <TableCell>{item.energyUsePerYear}</TableCell>
                  <TableCell>{item.lifetimeYears}</TableCell>
                  <TableCell>{item.CO2}</TableCell>
                  <TableCell>{item.CH4}</TableCell>
                  <TableCell>{item.N2O}</TableCell>
                  <TableCell>{item.CO2e}</TableCell>
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

export default UseSoldProductEmissionDialog;
