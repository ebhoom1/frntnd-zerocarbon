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
import { fetchTotalEmissions } from "../../../redux/features/emissionCalculation/totalEmissionSlice";

const TotalEmissionDialog = ({ open, handleClose, userId }) => {
  const dispatch = useDispatch();
  const { emissions, loading, error } = useSelector((state) => state.totalEmission);

  useEffect(() => {
    if (open && userId) {
      dispatch(fetchTotalEmissions(userId));
    }
  }, [dispatch, userId, open]);

  const monthlyEmissions = emissions || {};

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Monthly CO2e Emissions</DialogTitle>
      <DialogContent>
        {loading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <CircularProgress />
          </div>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : Object.keys(monthlyEmissions).length ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Month</strong></TableCell>
                <TableCell align="right"><strong>Total CO2e (kg)</strong></TableCell>
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
          <Typography textAlign="center">No Emission Data Found</Typography>
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

export default TotalEmissionDialog;
