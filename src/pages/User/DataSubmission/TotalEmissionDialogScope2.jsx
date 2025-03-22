// components/TotalEmissionScope2Dialog.js
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
import { fetchTotalScope2Emission } from "../../../redux/features/emissionCalculation/totalEmissionScope2Slice";

const TotalEmissionScope2Dialog = ({ open, handleClose,userId }) => {
  const dispatch = useDispatch();
  const { totalEmissionData, loading, error } = useSelector((state) => state.totalScope2Emission);

  useEffect(() => {
    if (open && userId) {
      dispatch(fetchTotalScope2Emission(userId));
    }
  }, [open, userId, dispatch]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Total Scope 2 Emission Summary</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : totalEmissionData ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Emission Category</TableCell>
                <TableCell>Emission Value (kg CO₂e)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Purchased Electricity Emission</TableCell>
                <TableCell>{totalEmissionData.totalElectricityEmission}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>Purchased Steam/Heat/Cooling Emission</TableCell>
                <TableCell>{totalEmissionData.totalSteamEmission}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2} style={{ fontWeight: "bold" }}>
                  Total Scope 2 Emission
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  {totalEmissionData.totalScope2Emission}
                </TableCell>
              </TableRow>
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
