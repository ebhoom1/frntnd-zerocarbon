// components/IndustrialProcessEmissionDialog.js
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
import { fetchIndustrialProcessesEmissions } from "../../../redux/features/emissionCalculation/industrialProcessesEmissionSlice";

const IndustrialProcessEmissionDialog = ({ open, handleClose,userId }) => {
  const dispatch = useDispatch();
  const { emissionData, loading, error } = useSelector((state) => state.industrialProcessesEmissions);

  useEffect(() => {
    if (open && userId) {
      dispatch(fetchIndustrialProcessesEmissions(userId));
    }
  }, [open, userId, dispatch]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Industrial Process Emission Details</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : emissionData?.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Industry Type</TableCell>
                <TableCell>Emission Source</TableCell>
                <TableCell>Production Quantity (kg)</TableCell>
                <TableCell>CO2 (kg)</TableCell>
                <TableCell>CH4 (kg)</TableCell>
                <TableCell>N2O (kg)</TableCell>
                <TableCell>CO2e (kg)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {emissionData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.industryType}</TableCell>
                  <TableCell>{item.emissionSource}</TableCell>
                  <TableCell>{item.productionQtyInKg}</TableCell>
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

export default IndustrialProcessEmissionDialog;
