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
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalScope2Emission } from "../../../redux/features/emissionCalculation/totalEmissionScope2Slice";

const TotalEmissionScope2Dialog = ({ open, handleClose, userId }) => {
  const dispatch = useDispatch();
  const { totalEmissionData, loading, error } = useSelector(
    (state) => state.totalScope2Emission
  );

  useEffect(() => {
    if (open && userId) {
      dispatch(fetchTotalScope2Emission(userId));
    }
  }, [open, userId, dispatch]);

  const monthlyEmissions = totalEmissionData || {};

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Monthly Scope 2 Emissions (kg CO₂e)</DialogTitle>
      <DialogContent>
        {loading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <CircularProgress />
          </div>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : Object.keys(monthlyEmissions).length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Month</strong></TableCell>
                <TableCell align="right"><strong>Total CO₂e (kg)</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(monthlyEmissions).map(([month, value]) => (
                <TableRow key={month}>
                  <TableCell>{month}</TableCell>
                  <TableCell align="right">{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography>No emission data available.</Typography>
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

export default TotalEmissionScope2Dialog;
