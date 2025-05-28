import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalScope3Emissions } from "../../../redux/features/emissionCalculation/totalEmissionScope3Slice";

const TotalScope3EmissionDialog = ({ open, handleClose, userId }) => {
  const dispatch = useDispatch();
  const { emissions, loading, error } = useSelector(
    (state) => state.totalEmissionScope3
  );

  useEffect(() => {
    if (open && userId) {
      dispatch(fetchTotalScope3Emissions(userId));
    }
  }, [dispatch, userId, open]);

  const monthlyData = emissions|| {};

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Monthly Scope 3 CO₂e Emissions</DialogTitle>
      <DialogContent>
        {loading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <CircularProgress />
          </div>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : Object.keys(monthlyData).length ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Month</strong></TableCell>
                <TableCell align="right"><strong>Total CO₂e (kg)</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(monthlyData).map(([month, value]) => (
                <TableRow key={month}>
                  <TableCell>{month}</TableCell>
                  <TableCell align="right">{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography textAlign="center">No Scope 3 Emission Data Found</Typography>
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

export default TotalScope3EmissionDialog;
